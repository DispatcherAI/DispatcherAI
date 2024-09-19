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
import openai
import os
from openai import OpenAI

# Initialize the client
client = OpenAI(api_key=os.getenv("OPENAI_API_KEY"))

custom_model = load_model('server/prediction/trained_model.h5')

with open('server/prediction/tokenizer.json', 'r') as f:
    tokenizer_json = json.load(f) # load tokenizer file
    custom_tokenizer = tf.keras.preprocessing.text.tokenizer_from_json(tokenizer_json) # load a tokenizer

openai.api_key = os.getenv("OPENAI_API_KEY")

def custom_model_predict(input_text):
    sequence = custom_tokenizer.texts_to_sequences([input_text])
    padded_sequence = pad_sequences(sequence, maxlen = 100)
    prediction = custom_model.predict(padded_sequence)
   
    return prediction

def generate_prompt_911(messages):
    return messages

def gpt4_predict(input_text):
    messages = [{"role": "system", "content": "You are a 911 operator. Your job is to handle emergency calls professionally and efficiently. Keep the response short and concise."},
                {"role": "user", "content": input_text}]
    
    try:
        print(f"Starting GPT-4 Prediction for input: {input_text[:20]}...")
        response = client.chat.completions.create(
            model="gpt-4",
            messages=messages,
            max_tokens=100
        )
        print("GPT-4 Prediction completed")
        return response.choices[0].message.content
    except Exception as e:
        print(f"An error occurred: {e}")
        return None

class TimeoutException(Exception):
    pass

def timeout_handler(signum, frame):
    raise TimeoutException("Function call timed out")


# create a function to benchmark the performance of the custom model
def benchmark_model(input_texts, num_runs = 10):
    # initialize dictionary to store the time results for each model 
    results = {
        'Custom Model': [],
        'GPT-4 Model': []
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
            result = gpt4_predict(text)
            if result is not None:
                end_time = time.time()
                mistral_times.append(end_time - start_time)
        if mistral_times:
            results['GPT-4 Model'].append(np.mean(mistral_times))
        else:
            results['GPT-4 Model'].append(None)
        
        print(f"Completed input {i+1}/{len(input_texts)}")
    
    return results

# plot the results
def plot_results(results):
    custom_latencies = results['Custom Model']
    mistral_latencies = results['GPT-4 Model']

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
        print(f"GPT-4 Model: {np.mean(results['Mistral Model']):.4f} seconds")
        print("Latency comparison plot saved as 'latency_comparison.png'")
    except Exception as e:
        print(f"An error occurred: {e}")
