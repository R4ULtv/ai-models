import requests
from bs4 import BeautifulSoup
import json
import re
import os

def parse_context_size(text):
    """
    Converts a context string like '8K' or '4096' into an integer.
    Returns 0 if parsing fails.
    """
    if not isinstance(text, str):
        return 0

    text = text.lower().strip()
    try:
        if 'k' in text:
            num = float(text.replace('k', ''))
            return int(num * 1024) # Use 1024 for KB/K
        else:
            return int(text)
    except (ValueError, TypeError):
        return 0

def parse_param_count(text):
    """
    Converts a parameter string like '7b', '1.5b', or '500m' into a float representing billions.
    Returns 0 if parsing fails.
    """
    if not isinstance(text, str):
        return 0

    text = text.lower().strip()
    try:
        if 'b' in text:
            num = float(text.replace('b', ''))
            return num  # Already in billions
        elif 'm' in text:
            num = float(text.replace('m', ''))
            return num / 1000.0  # Convert millions to billions
        else:
            # If it's just a number, assume it's in billions
            return float(text)
    except (ValueError, TypeError):
        return 0

def scrape_and_save_ollama_models():
    """
    Scrapes Ollama, finds the max context size for each model from its variants,
    extracts parameter counts in billions, and saves each model's data into a separate JSON file.
    """
    base_url = "https://ollama.com"
    search_url = f"{base_url}/search"
    output_dir = 'ollama'

    try:
        os.makedirs(output_dir, exist_ok=True)
        print(f"Output will be saved to the '{output_dir}' directory.")
    except OSError as e:
        print(f"Error creating directory {output_dir}: {e}")
        return

    capability_keywords = {
        "vision": "vision", "multimodal": "vision",
        "tool use": "tools", "function calling": "tools",
        "reasoning": "reasoning", "logic": "reasoning",
        "embedding": "embedding", "embeddings": "embedding",
    }
    modality_keywords = {
        "image": "image", "audio": "audio",
        "video": "video", "pdf": "pdf",
    }

    print("Fetching the main model list...")
    try:
        response = requests.get(search_url)
        response.raise_for_status()
        soup = BeautifulSoup(response.content, 'html.parser')

        model_links = soup.find_all('a', href=re.compile(r'^/library/'))
        if not model_links:
            print("Could not find any model links.")
            return

        model_ids = sorted(list(set(link['href'].split('/')[-1] for link in model_links)))
        print(f"Found {len(model_ids)} unique models. Starting scrape...")

        for model_id in model_ids:
            model_url = f"{base_url}/library/{model_id}"
            print(f"Scraping: {model_url}")

            try:
                model_response = requests.get(model_url)
                model_response.raise_for_status()
                model_soup = BeautifulSoup(model_response.content, 'html.parser')

                def get_text(soup_obj, selector, default=""):
                    element = soup_obj.select_one(selector)
                    return element.get_text(strip=True).lower() if element else default

                description = get_text(model_soup, 'div.prose')
                model_name = get_text(model_soup, 'h1', model_id)

                # --- NEW: Extract parameter counts in billions ---
                param_counts = []
                # Find spans with x-test-size attribute and the specific blue background class
                param_spans = model_soup.find_all('span', {
                    'x-test-size': '',
                    'class': re.compile(r'.*bg-\[#ddf4ff\].*text-blue-600.*')
                })

                for span in param_spans:
                    param_text = span.get_text(strip=True)
                    param_value = parse_param_count(param_text)
                    if param_value > 0:
                        param_counts.append(param_value)

                # Remove duplicates and sort
                param_counts = sorted(list(set(param_counts)))

                # --- Find max context size from variants table ---
                max_context = 0
                # Find all grid rows for the desktop view, which contains the context data
                variant_rows = model_soup.select("div.hidden.group.px-4.py-3.sm\\:grid.sm\\:grid-cols-12.text-\\[13px\\]")

                for row in variant_rows:
                    # Within each row, the data points are in <p> tags with a specific class
                    # The order is: Size, Context, Input type
                    data_points = row.select("p.text-neutral-500")
                    if len(data_points) >= 2:
                        # The context is the second <p> tag
                        context_text = data_points[1].get_text(strip=True)
                        current_context = parse_context_size(context_text)

                        if current_context > max_context:
                            max_context = current_context

                # --- Determine capabilities and modalities ---
                found_capabilities = set()
                for keyword, schema_val in capability_keywords.items():
                    if keyword in description:
                        found_capabilities.add(schema_val)

                input_modalities = {"text"}
                if "vision" in found_capabilities:
                    input_modalities.add("image")
                for keyword, schema_val in modality_keywords.items():
                    if keyword in description:
                         input_modalities.add(schema_val)

                # --- Construct the final model data ---
                model_data = {
                    "id": model_id,
                    "name": model_name,
                    "provider": "ollama",
                    "provider_id": "ollama",
                    "capabilities": sorted(list(found_capabilities)),
                    "attachment": "vision" in found_capabilities,
                    "temperature": False,
                    "modalities": {
                        "input": sorted(list(input_modalities)),
                        "output": ["text"],
                    },
                    "limit": {
                        "context": max_context, # Use the max context found
                        "output": 0, # Placeholder, not available on site
                    },
                    "size": param_counts  # Parameter counts in billions
                }

                output_filename = os.path.join(output_dir, f"{model_id}.json")
                with open(output_filename, 'w', encoding='utf-8') as f:
                    json.dump(model_data, f, indent=2, ensure_ascii=False)

                print(f" -> Successfully saved with context {max_context} and params {param_counts}B: {output_filename}")

            except requests.exceptions.RequestException as e:
                print(f"Could not fetch or parse model page {model_url}: {e}")

    except requests.exceptions.RequestException as e:
        print(f"Fatal error: Could not fetch the main search page {search_url}: {e}")
        return

    print("\n--- Scraping Complete ---")
    print(f"All model data has been saved to the '{output_dir}' directory.")

if __name__ == '__main__':
    scrape_and_save_ollama_models()
