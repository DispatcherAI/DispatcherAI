# extracts the caller name, location, and time from the call script
import json
import os


def extract_features_from_json(processed_text): # extracts data from json titled processed_text
    data = json.loads(processed_text)
    # Check if 'messages' key exists and use the first message
    if 'messages' in data:
        first_message = data['messages'][0] if data['messages'] else {} # if the message is not empty, return the first message
        return {
            "location": first_message.get('location', 'Unknown'),
            "emergency_type": first_message.get('emergency_type', 'Unknown'),
            "name": first_message.get('name', 'Unknown'),
            "role": first_message.get('role', 'Unknown')
        }
    else:
        # If 'messages' key doesn't exist, try to get data directly
        return {
            "location": data.get('location', 'Unknown'),
            "emergency_type": data.get('emergency_type', 'Unknown'),
            "name": data.get('name', 'Unknown'),
            "role": data.get('role', 'Unknown')
        }

processed_folder = os.path.join('server', 'data', 'processed') # sets the path to the processed folder
features_list = [] # empty list to store features
processed_texts = []  

for filename in os.listdir(processed_folder):
    if filename.endswith('.json'):
        file_path = os.path.join(processed_folder, filename)
        try:
            with open(file_path, 'r') as file:
                processed_text = file.read()
                print(processed_text[:500])
                features = extract_features_from_json(processed_text)
                features["filename"] = filename
                features_list.append(features)
                print(f"Processed file: {filename}")
        except json.JSONDecodeError as e: # if the file is not a valid json file
            print(f"JSON Decode Error in file {filename}: {e}")
        except Exception as e:
            print(f"Error processing file {filename}: {e}")
            # Print the content of the file for debugging
            with open(file_path, 'r') as file:
                print(f"File content: {file.read()[:200]}...")  # Print first 200 characters


print("Features list:", json.dumps(features_list, indent=2)) 
print(f"Total processed items: {len(features_list)}")

if __name__ == "__main__":
    pass
