import json
import os
from googletrans import Translator, LANGUAGES

# Define the languages you want to translate to with their shorthand
languages = {
    'en': 'English',  # English
    'zh-cn': 'Mandarin',  # Chinese (Simplified)
    'es': 'Spanish',  # Spanish
    'hi': 'Hindi',  # Hindi
    'ar': 'Arabic',  # Arabic
    'pt': 'Portuguese',  # Portuguese
    'bn': 'Bengali',  # Bengali
    'ru': 'Russian',  # Russian
    'ja': 'Japanese',  # Japanese
    'de': 'German',  # German
}

# Initialize the Google Translator
translator = Translator()

def translate_dict(data, dest_lang):
    if isinstance(data, dict):
        return {key: translate_dict(value, dest_lang) for key, value in data.items()}
    elif isinstance(data, list):
        return [translate_dict(item, dest_lang) for item in data]
    elif isinstance(data, str):
        try:
            translated = translator.translate(data, dest=dest_lang).text
            return translated
        except Exception as e:
            print(f"Translation error: {e}")
            return data
    else:
        return data

def translate_json_file(input_file):
    try:
        with open(input_file, 'r', encoding='utf-8') as f:
            original_data = json.load(f)
    except FileNotFoundError:
        print(f"Error: The file {input_file} was not found.")
        return
    except json.JSONDecodeError:
        print(f"Error: The file {input_file} is not a valid JSON file.")
        return

    for lang_code, lang_name in languages.items():
        if lang_code == 'en':
            output_data = original_data
        else:
            print(f"Translating to {lang_name}...")
            output_data = translate_dict(original_data, lang_code)

        output_filename = f"{lang_code}.json"

        try:
            with open(output_filename, 'w', encoding='utf-8') as outfile:
                json.dump(output_data, outfile, ensure_ascii=False, indent=4)
            print(f"Translated JSON saved as {output_filename}")
        except IOError as e:
            print(f"Error saving file {output_filename}: {e}")

# Specify your input JSON file
input_json_file = 'en.json'

# Run the translation
translate_json_file(input_json_file)