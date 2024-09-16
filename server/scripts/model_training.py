import pandas as pd
import os
import json

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

def extract_conversation_pairs(messages):
    pairs = []
    for i in range(len(messages) - 1):
        if messages[i]['role'] == 'user' and messages[i+1]['role'] == 'assistant':
            pairs.append((messages[i]['content'], messages[i+1]['content']))
    if not pairs:
        print(f"No conversation pairs found in file")
    return pairs

def extract_messages(data):
    user_messages = []
    assistant_messages = []

    for conversation in data:
        messages = conversation.get('messages', [])
        for message in messages:
            role = message.get('role')
            content = message.get('content', 'No content')

            if role == 'user':
                user_messages.append(content)
            elif role == 'assistant':
                assistant_messages.append(content)

    print(f"Extracted {len(user_messages)} user messages and {len(assistant_messages)} assistant messages")
    return user_messages, assistant_messages

def create_conversation_df(data):
    user_messages, assistant_messages = extract_messages(data)
    # if arrays are not the same length, truncate the longer one
    if len(user_messages) > len(assistant_messages):
        user_messages = user_messages[:len(assistant_messages)]
    elif len(assistant_messages) > len(user_messages):
        assistant_messages = assistant_messages[:len(user_messages)]
    
    # Create DataFrame with separate columns for user and assistant messages
    df = pd.DataFrame({
        'user_message': user_messages,
        'assistant_message': assistant_messages
    })

    # Fill NaN values and replace empty strings with "unknown"
    df = df.fillna("unknown")
    df = df.replace("", "unknown")

    return df

# print the dataframe
if __name__ == "__main__":
    data = load_json_files('server/data/processed')
    print(f"Sample data from first file: {data[0] if data else 'No data'}")
    df = create_conversation_df(data)
    print(f"DataFrame shape: {df.shape}")
    print(df.head())