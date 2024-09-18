import pandas as pd # pandas is a library for data manipulation
import os
import json
import numpy as np # numpy is a library for numerical computing
# tensorflow is a library for deep learning
from tensorflow.keras.models import Sequential # keras is a high-level neural network API
from tensorflow.keras.layers import Embedding, LSTM, Dense
from tensorflow.keras.preprocessing.sequence import pad_sequences
from tensorflow.keras.preprocessing.text import Tokenizer
from tensorflow.keras.utils import to_categorical
from sklearn.model_selection import train_test_split
import gc
# translate json to jsonl 
import json

def load_json_files(directory):
    data = []
    skipped_files = 0

    for filename in os.listdir(directory):
        if filename.endswith('.json'):
            with open(os.path.join(directory, filename), 'r') as file:
                try:
                    json_data = json.load(file)
                    data.append(json_data)
                except json.JSONDecodeError as e: # if the file is not a valid json file, skip it
                    print(f"Error decoding JSON in file {filename}: {e}")
                    skipped_files += 1
    print(f"Skipped {skipped_files} files. Processed {len(data)} files.")
    return data


def create_conversation_df(data):
    conversations = []
    for conversation in data:
        messages = conversation.get('messages', []) # get messages blocks from the json
        for i in range(len(messages) - 1):
            if messages[i]['role'] == 'user' and messages[i+1]['role'] == 'assistant':
                conversations.append({
                    'user_message': messages[i]['content'],
                    'assistant_message': messages[i+1]['content']
                })
    df = pd.DataFrame(conversations)
    return df

# convert text messages into numbers (tokenization)
def prepare_data(df, max_sequence_length = 50, max_num_words = 5000): # reduce the number of words for faster processing
    tokenizer = Tokenizer(num_words = max_num_words, oov_token="<OOV>") # create a tokenizer that converts text into sequences of integers
    tokenizer.fit_on_texts(df['user_message'] + ' ' + df['assistant_message']) # fit the tokenizer on the text data
    
    X = tokenizer.texts_to_sequences(df['user_message'] )
    y = tokenizer.texts_to_sequences(df['assistant_message'])

    X = pad_sequences(X, maxlen = max_sequence_length, padding='post', truncating='post') # pad and truncate the sequences to the same length
    y = pad_sequences(y, maxlen = max_sequence_length, padding='post', truncating='post')

    # Convert y to one-hot encoded format
    vocab_size = min(len(tokenizer.word_index) + 1, max_num_words)
    y = [to_categorical(seq, num_classes=vocab_size) for seq in y] # convert sequences to one-hot encoded format (binary matrix)
    y = np.array(y) # convert the list to a numpy array
    
    return X, y, tokenizer

def create_model(vocab_size, max_sequence_length):
    model = Sequential([
        Embedding(vocab_size, 64, input_length=max_sequence_length),
        LSTM(128, return_sequences=True), # user message
        LSTM(128, return_sequences=True),  # assistant message
        Dense(vocab_size, activation='softmax')
    ])
    model.compile(loss='categorical_crossentropy', optimizer='adam')
    return model

def train_model(X, y, tokenizer, batch_size = 32, epochs = 5):
    X_train, X_val, y_train, y_val = train_test_split(X, y, test_size = 0.2, random_state = 42)

    vocab_size = min(len(tokenizer.word_index) + 1, 5000)  # set the vocab size and sequence size to the same as in prepare_data
    max_sequence_length = X.shape[1] # initialize the max sequence length
    
    model = create_model(vocab_size, max_sequence_length)
    
    model.fit(X_train, y_train, validation_data = (X_val, y_val), 
              batch_size = batch_size, epochs = epochs, verbose = 1)
    
    return model

# print the dataframe
if __name__ == "__main__":
    # load dataframe
    data = load_json_files('server/data/processed')
    df = create_conversation_df(data)
    X, y, tokenizer = prepare_data(df)
    # clear memory
    del data, df
    gc.collect()

    # train the model
    model = train_model(X, y, tokenizer)
    model.save('server/prediction/trained_model.h5') # save the model in the prediction folder
    with open('server/prediction/tokenizer.json', 'w') as f:
        json.dump(tokenizer.to_json(), f)

    print("Model and tokenizer saved.")
