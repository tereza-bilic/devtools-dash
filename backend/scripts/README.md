# DevTools Dash Level Creator

A command-line utility to help create new levels for the DevTools Dash application.

## Prerequisites

Ensure you have all required dependencies installed:

```bash
pip install -r ../requirements.txt
```

This utility relies on:
- typer - For command-line interface
- rich - For enhanced terminal output

## Features

- Creates all necessary files for a new level (HTML, JS, CSS)
- Updates the level model automatically
- Follows consistent naming conventions and file structures

## Usage

```bash
# Navigate to the scripts directory
cd backend/scripts

# Run the level creator script
python create_level.py
```

## Level Structure

For a typical level, the script creates:

1. An HTML template file (`level_key.html`)
2. A main JavaScript file (`level_key_obfuscated.js`)
3. Optional additional JS/CSS files with automatic level key prefixing (e.g., `level_key_utility.js`)

All files are served using dynamic routes, with:
- Main JavaScript files accessible via `url_path_for('get_level_js', level_key='key')`
- Additional JavaScript files accessible via `url_path_for('get_level_js', level_key='key')?different_filename=filename&should_obfuscate=False`
- CSS files accessible via `url_path_for('get_level_css', level_key='key', filename='filename')`

Note: 
- `different_filename` and `should_obfuscate` are query parameters, not route parameters.
- By default, JavaScript files are obfuscated.
- All additional JS and CSS files are automatically prefixed with the level key (e.g., entering "iframe.js" will create "c3_iframe.js" for level with key "c3").

## Example Workflow

1. Run `python create_level.py`
2. Choose the category (Elements, Console, Network, Sources, Performance)
3. Set the difficulty level (1-3)
4. Accept the suggested level key or enter a custom one
5. Set the order in category
6. Add additional JS/CSS files as needed

## After Creating a Level

Once your level is created, you'll need to:

1. Customize the HTML template with your level description
2. Implement the level's logic in the JavaScript file(s)
3. Style your level using CSS as needed
4. You may need to implement additional helper functions if your level requires special initialization

### JavaScript Obfuscation

By default, all JavaScript files are obfuscated by the server. To disable obfuscation for additional scripts:
- Use `should_obfuscate=False` as a query parameter when referencing the script
- Example: `<script defer src="{{ url_path_for('get_level_js', level_key='level_key') }}?different_filename=script_name&should_obfuscate=False"></script>`

## Advanced Level Customization

For more complex levels, you might want to:
- Create helper utilities in the app/utils/level directory
- Add initialization functions in level session factories
- Create specialized utilities for specific level types

## Level Testing

After creating your level, you can test it by:

1. Starting the backend server
2. Navigating to your level in the application
3. Using browser DevTools to solve the challenge
