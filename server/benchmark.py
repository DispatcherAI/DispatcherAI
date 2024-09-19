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
import ollama
import os

custom_model = load_model('server/prediction/trained_model.h5')

with open('server/prediction/tokenizer.json', 'r') as f:
    tokenizer_json = json.load(f) # load tokenizer file
    custom_tokenizer = tf.keras.preprocessing.text.tokenizer_from_json(tokenizer_json) # load a tokenizer

MISTRAL_MODEL_PATH = "mistral" # use ollama to load the mistral model
# HUGGINGFACE_TOKEN = os.getenv("HF_TOKEN")
# login(token = HUGGINGFACE_TOKEN)

print(f"Using model: {MISTRAL_MODEL_PATH}")
# DEVICE = torch.device("cuda" if torch.cuda.is_available() else "cpu")

#use ollama to load the mistral model

# set up the mistral model
def setup_mistral_model():
  
    return None, None  



def prepare_custom_input(text, max_length = 50):
    sequence = custom_tokenizer.texts_to_sequences([text])
    return pad_sequences(sequence, maxlen = max_length, padding = 'post', truncating = 'post')

def custom_model_predict(input_text): # create function to predict with the custom model
    input_seq = prepare_custom_input(input_text)
    return custom_model.predict(input_seq)

class TimeoutException(Exception):
    pass

def timeout_handler(signum, frame):
    raise TimeoutException("Function call timed out")

# prepare input for mistral model
def generate_prompt_911(messages): # create function to generate a prompt for the mistral model
    prompt = "You are a 911 operator. Your job is to handle emergency calls professionally and efficiently. keep the response short and concise.\n\n"
    for message in messages:
        role = "Operator" if message['role'] == 'assistant' else 'Caller' 
        prompt += f"{role}: {message['content']}\n" # add the role and content to the prompt
    prompt += "Operator:" # set the end of the prompt
    return prompt

def mistral_predict(input_text):
    prompt = generate_prompt_911([{"role": "user", "content": input_text}])
    
    try:
        print(f"Starting Mistral prediction for input: {input_text[:20]}...")
        response = ollama.generate(model='mistral', prompt=prompt)
        print("Mistral prediction completed successfully")
        return response['response']
    except Exception as e:
        print(f"Mistral prediction failed: {str(e)}")
        return None

# create a function to benchmark the performance of the custom model
def benchmark_model(input_texts, num_runs = 10):
    # initialize dictionary to store the time results for each model 
    results = {
        'Custom Model': [],
        'Mistral Model': []
    }

    for i, text in enumerate(input_texts): # for each input text
        print(f"Processing input {i+1}/{len(input_texts)}: '{text[:20]}...'") # print the input text value
        
        # Benchmark custom model
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
            result = mistral_predict(text)
            if result is not None:
                end_time = time.time()
                mistral_times.append(end_time - start_time)
        if mistral_times:
            results['Mistral Model'].append(np.mean(mistral_times))
        else:
            results['Mistral Model'].append(None)
        
        print(f"Completed input {i+1}/{len(input_texts)}")
    
    return results

# plot the results
def plot_results(results):
    custom_latencies = results['Custom Model']
    mistral_latencies = results['Mistral Model']

    plt.figure(figsize = (10, 6))
    plt.boxplot([custom_latencies, mistral_latencies], tick_labels = ['Custom Model', 'Mistral Model'])
    plt.ylabel('Latency (seconds)')
    plt.title('Model Latency Comparison')
    plt.savefig('server/benchmark/latency_comparison.png')
    print("Plot saved as 'latency_comparison.png'")
    plt.close()

if __name__ == "__main__":
    try:
        print("Starting benchmark...")
        test_inputs = [
            "Hello, the house is burning! help!",
            "What's the weather like today?",
        ]

        print("Model loaded, starting benchmark...")
        results = benchmark_model(test_inputs, num_runs = 10)
       

        print("Benchmark completed, results:", results)
        print("Starting to plot results...")
        plot_results(results)
        print("Plotting completed")

        print("Average Latencies:")
        print(f"Custom Model: {np.mean(results['Custom Model']):.4f} seconds")
        print(f"Mistral Model: {np.mean(results['Mistral Model']):.4f} seconds")
        print("Latency comparison plot saved as 'latency_comparison.png'")
    except Exception as e:
        print(f"An error occurred: {e}")
