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

## Styling Your Levels

The application provides a minimalist, subtle styling system that you can leverage in your levels:

### Available CSS Classes

#### Layout Components
- `.level-content` - Main container for your level content
- `.subtle-card` - A subtle card container with minimal border and padding
- `.code-block` - Styling for code snippets

#### Typography
- `.text-center` - Center-align text content

#### Spacing Utilities
- `.mt-1`, `.mt-2`, `.mt-3`, `.mt-4` - Margin top utilities (0.5rem, 1rem, 1.5rem, 2rem)
- `.mb-1`, `.mb-2`, `.mb-3`, `.mb-4` - Margin bottom utilities
- `.p-1`, `.p-2`, `.p-3`, `.p-4` - Padding utilities

#### Flexbox Utilities
- `.flex` - Display flex container
- `.flex-column` - Flex direction column
- `.justify-center` - Justify content center
- `.justify-between` - Justify content space-between
- `.align-center` - Align items center
- `.gap-1`, `.gap-2`, `.gap-3` - Gap utilities (0.5rem, 1rem, 1.5rem)

#### Interactive Elements
- `.button` - Default button style
- `.button.button-secondary` - Secondary button style
- `.button.button-accent` - Accent colored button

#### Notification Messages
- `.error-message` - Error notification style
- `.info-message` - Information notification style
- `.success-message` - Success notification style

### CSS Variables

The following CSS variables are available for consistent styling:

```css
--primary-color: #5a6987;
--primary-light: #8a97b3;
--primary-dark: #3b4b6b;
--accent-color: #e0a458;
--text-color: #333;
--bg-color: #f9f9f9;
--card-bg: #ffffff;
--success-color: #5cb85c;
--error-color: #d35454;
--border-radius: 4px;
--box-shadow: 0 2px 4px rgba(0, 0, 0, 0.05);
```

### Example Usage

```html
<div class="level-content">
  <h2 class="text-center mb-3">My Challenge</h2>
  
  <div class="info-message mb-3">
    This level requires inspecting network requests.
  </div>
  
  <div class="subtle-card mb-3">
    <p class="mb-2">Here's a challenge description with some <strong>important</strong> details.</p>
    <div class="flex justify-between align-center">
      <span>Progress: 0/3 steps</span>
      <button class="button button-accent" id="hint-button">Show Hint</button>
    </div>
  </div>
  
  <div class="code-block mb-3">
    <pre>function findSecret() {
  return fetch('/api/secret')
    .then(response => response.json())
    .then(data => console.log(data));
}</pre>
  </div>
  
  <div class="flex gap-2 justify-center">
    <button class="button">Try Request</button>
    <button class="button button-secondary">Reset</button>
  </div>
  
  <div id="success-message" class="success-message mt-3" style="display: none;">
    Great job! You found the secret!
  </div>
</div>
```

### Template Examples

For more comprehensive examples and templates you can use as starting points, see the [`level_template_examples.html`](level_template_examples.html) file, which contains:

- Basic level template
- Interactive multi-step challenge
- Network request challenge
- Console-based challenge

These templates can be copied and modified for your own levels.
