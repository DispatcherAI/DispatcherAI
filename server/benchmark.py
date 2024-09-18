#* benchmark performance of the custom LSTM model with the old Mistral model
import time
import numpy as np
import matplotlib.pyplot as plt
from sklearn.metrics import mean_squared_error, r2_score
from tensorflow.keras.preprocessing.sequence import pad_sequences
from tensorflow.keras.models import load_model
import torch
import json
import tensorflow as tf
from transformers import AutoModelForCausalLM # import the mistral model
from transformers import AutoTokenizer
import os
from huggingface_hub import login

custom_model = load_model('server/prediction/trained_model.h5')

with open('server/prediction/tokenizer.json', 'r') as f:
    tokenizer_json = json.load(f) # load tokenizer file
    custom_tokenizer = tf.keras.preprocessing.text.tokenizer_from_json(tokenizer_json) # load a tokenizer

MISTRAL_MODEL_PATH = "mistralai/Mistral-7B-v0.1"
HUGGINGFACE_TOKEN = os.getenv("HF_TOKEN")
login(token = HUGGINGFACE_TOKEN)

print(f"Using model: {MISTRAL_MODEL_PATH}")
DEVICE = torch.device("cuda" if torch.cuda.is_available() else "cpu") # set the device to the gpu if available

# set up the mistral model
def setup_mistral_model():
    model = AutoModelForCausalLM.from_pretrained(MISTRAL_MODEL_PATH, token = HUGGINGFACE_TOKEN)
    tokenizer = AutoTokenizer.from_pretrained(MISTRAL_MODEL_PATH, token = HUGGINGFACE_TOKEN)
    model = model.to(DEVICE)
    return model, tokenizer

mistral_model, mistral_tokenizer = setup_mistral_model()
# prepare input for custom model
def prepare_custom_input(text, max_length = 50):
    sequence = custom_tokenizer.texts_to_sequences([text])
    return pad_sequences(sequence, maxlen = max_length, padding = 'post', truncating = 'post')

def custom_model_predict(input_text): # create function to predict with the custom model
    input_seq = prepare_custom_input(input_text)
    return custom_model.predict(input_seq)

# prepare input for mistral model
def generate_prompt_911(messages): # create function to generate a prompt for the mistral model
    prompt = "You are a 911 operator. Your job is to handle emergency calls professionally and efficiently.\n\n"
    for message in messages:
        role = "Operator" if message['role'] == 'assistant' else 'Caller' 
        prompt += f"{role}: {message['content']}\n" # add the role and content to the prompt
    prompt += "Operator:" # set the end of the prompt
    return prompt

def mistral_predict(input_text):
    messages = [{"role": "user", "content": input_text}] # set the messages to the input text 
    prompt = generate_prompt_911(messages)
    inputs = mistral_tokenizer(prompt, return_tensors = "pt") # tokenize the input
    with torch.no_grad():
        outputs = mistral_model.generate(**inputs, max_new_tokens = 50) # generate the output by unpacking the input dict
    return mistral_tokenizer.decode(outputs[0], skip_special_tokens = True) # decode the output and return it

# create a function to benchmark the performance of the custom model
def benchmark_model(input_texts, num_runs = 10):
    # initialize dictionary to store the time results for each model 
    results = {
        'Custom Model': [],
        'Mistral Model': []
    }

    for text in input_texts:
        # benchmark the custom model
        custom_times = []
        for _ in range(num_runs): # for each run
            start_time = time.time()
            custom_model_predict(text)
            end_time = time.time()
            custom_times.append(end_time - start_time)
        results['Custom Model'].append(np.mean(custom_times)) # append the mean times to the results dictionary for the custom model

        # benchmark the mistral model
        mistral_times = []
        for _ in range(num_runs):
            start_time = time.time()
            mistral_predict(text)
            end_time = time.time()
            mistral_times.append(end_time - start_time)
        results['Mistral Model'].append(np.mean(mistral_times))
    
    return results

# plot the results
def plot_results(results):
    custom_latencies = results['Custom Model']
    mistral_latencies = results['Mistral Model']

    plt.figure(figsize = (10, 6))
    plt.boxplot([custom_latencies, mistral_latencies], labels = ['Custom Model', 'Mistral Model'])
    plt.ylabel('Latency (seconds)')
    plt.title('Model Latency Comparison')
    plt.show()

if __name__ == "__main__":
    test_inputs = [
        "Hello, how are you?",
        "What's the weather like today?",
        "Can you explain machine learning?",
        "Tell me a joke.",
        "What's the capital of France?"
    ]

    results = benchmark_model(test_inputs, num_runs = 1)
    print(results)
    plot_results(results)

    print("Average Latencies:")
    print(f"Custom Model: {np.mean(results['Custom Model']):.4f} seconds")
    print(f"Mistral Model: {np.mean(results['Mistral Model']):.4f} seconds")
    print("Latency comparison plot saved as 'latency_comparison.png'")
