import json
import os

def combine_model_json_files():
    """
    Combines all individual model JSON files from the 'models' directory
    into a single 'models.json' file.
    """
    models_dir = 'ollama'
    output_filename = 'ollama/models.json'
    all_models_data = []

    # Check if the 'models' directory exists
    if not os.path.isdir(models_dir):
        print(f"Error: The directory '{models_dir}' was not found.")
        print("Please run the scraping script first to create the directory and JSON files.")
        return

    # Get all file names from the directory
    try:
        filenames = os.listdir(models_dir)
    except OSError as e:
        print(f"Error reading directory {models_dir}: {e}")
        return

    # Filter for .json files and read them
    json_files = [f for f in filenames if f.endswith('.json')]

    if not json_files:
        print(f"No .json files found in the '{models_dir}' directory.")
        return

    print(f"Found {len(json_files)} JSON files. Combining...")

    for filename in json_files:
        file_path = os.path.join(models_dir, filename)
        try:
            with open(file_path, 'r', encoding='utf-8') as f:
                data = json.load(f)
                if isinstance(data, dict):
                    all_models_data.append(data)
        except json.JSONDecodeError:
            print(f"Warning: Could not decode JSON from {filename}. Skipping.")
        except IOError as e:
            print(f"Warning: Could not read file {filename}. Skipping. Error: {e}")

    # Sort the final list alphabetically by model 'id'
    all_models_data.sort(key=lambda x: x.get('id', ''))

    # Write the combined data to the output file
    try:
        with open(output_filename, 'w', encoding='utf-8') as f:
            json.dump(all_models_data, f, indent=2, ensure_ascii=False)
        print(f"\nSuccessfully combined all data into '{output_filename}'")
    except IOError as e:
        print(f"Error writing to output file {output_filename}: {e}")


if __name__ == '__main__':
    combine_model_json_files()
