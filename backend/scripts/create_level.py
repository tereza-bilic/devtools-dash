#!/usr/bin/env python3
"""
DevTools Dash Level Creator

A CLI utility for creating new levels in the DevTools Dash application.
This tool helps streamline the process of creating new levels, including:
- Creating HTML, JS, and CSS files with appropriate templates
- Updating the level model with the new level
- Ensuring consistent level structure and organization
"""

import os
import re
import shutil
from enum import Enum
from pathlib import Path
from typing import Optional, List, Dict, Any, TypeVar, Union

import typer
from rich.console import Console
from rich.panel import Panel
from rich.markdown import Markdown
from rich.syntax import Syntax

# Initialize typer app and rich console
app = typer.Typer()
console = Console()

# Custom prompt function with choices support
T = TypeVar("T")
def prompt(
    message: str,
    type: Any = str,
    choices: Optional[List[str]] = None,
    default: Optional[T] = None
) -> Union[T, str]:
    """Custom prompt function with choices support."""
    if choices:
        console.print(f"{message}: {'/'.join(choices)}")
        value = typer.prompt(message, default=default)
        while value not in choices:
            console.print(f"Please select one of: {', '.join(choices)}")
            value = typer.prompt(message, default=default)
        return value
    else:
        return typer.prompt(message, type=type, default=default)

# Define confirm function
confirm = typer.confirm

# Constants
PROJECT_ROOT = Path(__file__).resolve().parent.parent
TEMPLATES_DIR = PROJECT_ROOT / "app" / "templates"
LEVEL_MODEL_PATH = PROJECT_ROOT / "app" / "models" / "level.py"


class CategoryEnum(str, Enum):
    """Categories for levels."""
    ELEMENTS = "Elements"
    CONSOLE = "Console"
    NETWORK = "Network"
    SOURCES = "Sources"
    PERFORMANCE = "Performance"


def get_existing_level_keys() -> List[str]:
    """Get all existing level keys from the level model."""
    level_keys = []
    with open(LEVEL_MODEL_PATH, "r") as f:
        content = f.read()
        # Find the LevelKey definition
        level_key_match = re.search(r'LevelKey\s*=\s*Literal\[(.*?)\]', content, re.DOTALL)
        if level_key_match:
            keys_str = level_key_match.group(1)
            # Extract all keys
            keys = re.findall(r'"([^"]+)"', keys_str)
            level_keys = keys
    return level_keys


def get_next_level_key(category: str) -> str:
    """Generate the next available level key for the given category."""
    category_prefix = category[0].lower()
    existing_keys = get_existing_level_keys()

    # Filter keys for this category and extract numbers
    category_keys = [key for key in existing_keys if key.startswith(category_prefix)]
    numbers = [int(key[1:]) for key in category_keys]

    if numbers:
        next_number = max(numbers) + 1
    else:
        next_number = 1

    return f"{category_prefix}{next_number}"


def update_level_model(level_key: str, title: str, category: CategoryEnum, order: int, difficulty: int) -> bool:
    """Update the level.py file with the new level."""
    with open(LEVEL_MODEL_PATH, "r") as f:
        content = f.read()

    # Get the proper case for the category enum
    # Map our enum values to the actual enum values in level.py
    category_map = {
        "ELEMENTS": "Elements",
        "CONSOLE": "Console",
        "NETWORK": "Network",
        "SOURCES": "Sources",
        "PERFORMANCE": "Performance"
    }
    proper_case_category = category_map.get(category.name, category.name)

    # Update LevelKey type
    literal_pattern = r'(LevelKey\s*=\s*Literal\[)([^\]]*?)(\])'
    if re.search(literal_pattern, content):
        content = re.sub(
            literal_pattern,
            lambda m: f'{m.group(1)}{m.group(2)}, "{level_key}"{m.group(3)}',
            content
        )
    else:
        console.print("[bold red]Could not find LevelKey type definition in level.py[/]")
        return False

    # Find the existing levels in the same category
    category_pattern = re.compile(fr'Level\(key="([^"]+)", category=CategoryEnum\.{proper_case_category}')
    category_levels = category_pattern.findall(content)

    # Update levels list
    levels_list_pattern = r'(levels\s*:\s*list\[Level\]\s*=\s*\[)([^\]]*?)(\])'
    new_level = f'Level(key="{level_key}", title="{title}", category=CategoryEnum.{proper_case_category}, order_in_category={order}, difficulty={difficulty})'

    if category_levels:
        # Find the last level in this category
        last_level = category_levels[-1]
        # Insert after the last level in this category
        last_level_pattern = fr'(Level\(key="{last_level}".*?,\s*category=CategoryEnum\.{proper_case_category}.*?\),)'
        last_level_match = re.search(last_level_pattern, content, re.DOTALL)
        if last_level_match:
            replacement = f'{last_level_match.group(1)}\n    {new_level},'
            content = content.replace(last_level_match.group(1), replacement)
        else:
            # Fallback if pattern matching fails: append to the end
            if re.search(levels_list_pattern, content):
                content = re.sub(
                    levels_list_pattern,
                    lambda m: f'{m.group(1)}{m.group(2)}\n    {new_level},{m.group(3)}',
                    content
                )
    else:
        # If no levels in this category, append to the end but ensure proper formatting
        if re.search(levels_list_pattern, content):
            # Add new level and ensure there's proper spacing before closing bracket
            content = re.sub(
                levels_list_pattern,
                lambda m: f'{m.group(1)}{m.group(2)}\n    {new_level},\n{m.group(3)}',
                content
            )

    # Write the updated content back to the file
    with open(LEVEL_MODEL_PATH, "w") as f:
        f.write(content)

    return True


def create_html_template(level_dir: Path, level_key: str, title: str, hint: str, js_files: List[str], css_files: List[str]) -> None:
    """Create the HTML template for the level."""
    template = f"""{{# filepath: {level_dir}/{level_key}.html #}}
{{% extends "level.html" %}}
{{% set key = level_session.level_key %}}
{{% set title = level_session.level.title %}}
{{% set secret = level_session.finish_secret %}}

{{% block head %}}
"""

    # Add JS references - Always use dynamic routes
    for js_file in js_files:
        js_name = js_file.replace(".js", "")
        if js_file == f"{level_key}_obfuscated.js":
            template += f'  <script defer src="{{{{ url_path_for(\'get_level_js\', level_key=\'{level_key}\') }}}}"></script>\n'
        else:
            # Use query parameters for different_filename and should_obfuscate
            template += f'  <script defer src="{{{{ url_path_for(\'get_level_js\', level_key=\'{level_key}\') }}}}?different_filename={js_name}&should_obfuscate=False"></script>\n'

    # Add CSS references - Always use dynamic routes
    for css_file in css_files:
        css_name = css_file.replace(".css", "")
        template += f'  <link rel="stylesheet" href="{{{{ url_path_for(\'get_level_css\', level_key=\'{level_key}\', filename=\'{css_name}\') }}}}">\n'

    template += f"""{{% endblock %}}

{{% block hint %}}
  {{# Add a hint for this level here - it will be shown when hovering over the '?' icon #}}
  {hint}
{{% endblock %}}

{{% block description %}}
  {{# Add your level description here - explain what the user needs to do #}}
{{% endblock %}}

{{% block content %}}
  {{# Your level content goes here #}}
  <div class="level-container">
    <p>Complete this level to find the secret...</p>
  </div>
{{% endblock %}}
"""

    html_path = level_dir / f"{level_key}.html"
    with open(html_path, "w") as f:
        f.write(template)


def create_js_file(level_dir: Path, level_key: str, filename: str, obfuscated: bool) -> None:
    """Create a JavaScript file for the level."""
    # All JS files should go in the templates directory using the dynamic routing system
    js_path = level_dir / filename

    template = f"""// JavaScript for level {level_key}
// Filename: {filename}

document.addEventListener('DOMContentLoaded', () => {{
  console.log('Level {level_key} loaded');

  // Your level code here

}});
"""

    with open(js_path, "w") as f:
        f.write(template)


def create_css_file(level_dir: Path, level_key: str, filename: str) -> None:
    """Create a CSS file for the level."""
    # CSS files should go in the templates directory, not in static
    css_path = level_dir / filename

    template = f"""/* CSS for level {level_key} */
/* Filename: {filename} */

"""

    with open(css_path, "w") as f:
        f.write(template)


@app.command()
def create_level():
    """Interactive command to create a new level for DevTools Dash."""
    console.print(Panel.fit(
        "[bold cyan]DevTools Dash Level Creator[/]\n"
        "Create a new level with all necessary files",
        title="Welcome"
    ))

    # Select category
    categories = [c.value for c in CategoryEnum]
    category_name = prompt("Select category", choices=categories)
    category = CategoryEnum(category_name)

    # Get difficulty
    difficulty_str = prompt("Difficulty (1-3)")
    try:
        difficulty = int(difficulty_str)
        if difficulty < 1 or difficulty > 3:
            console.print("[bold yellow]Difficulty must be between 1 and 3, setting to 1[/]")
            difficulty = 1
    except ValueError:
        console.print("[bold yellow]Invalid difficulty input, setting to 1[/]")
        difficulty = 1

    # Get level key
    suggested_key = get_next_level_key(category_name)
    use_suggested = confirm(f"Use suggested level key: '{suggested_key}'?", default=True)

    if use_suggested:
        level_key = suggested_key
    else:
        level_key = prompt("Enter custom level key")

    # Get order in category
    order_str = prompt("Order position in category")
    try:
        order = int(order_str)
    except ValueError:
        console.print("[bold yellow]Invalid order input, setting to 1[/]")
        order = 1

    # Get level title
    title = prompt("Enter a short, fun title for the level")

    # Get level hint (optional)
    hint = prompt("Enter a hint for the level (optional, press Enter to skip)", default="")

    # Create level directory
    level_dir = TEMPLATES_DIR / f"level_{level_key}"
    if level_dir.exists():
        overwrite = confirm(f"Level directory '{level_dir}' already exists. Overwrite?", default=False)
        if not overwrite:
            console.print("[bold red]Aborted.[/]")
            return
        shutil.rmtree(level_dir)

    os.makedirs(level_dir, exist_ok=True)

    # Standard level creation flow
    # JavaScript files
    js_files = []

    # Always add the main obfuscated JS file
    main_js_file = f"{level_key}_obfuscated.js"
    js_files.append(main_js_file)
    create_js_file(level_dir, level_key, main_js_file, True)

    # Ask for additional JS files
    while confirm("Add another JavaScript file?", default=False):
        js_name = prompt("JavaScript filename (without level key prefix and with .js extension)")
        if not js_name.endswith('.js'):
            js_name += '.js'

        # Automatically add the level key as a prefix if it's not already there
        if not js_name.startswith(f"{level_key}_"):
            js_name = f"{level_key}_{js_name}"

        js_obfuscate = confirm("Should this JavaScript file be obfuscated?", default=False)
        js_files.append(js_name)
        create_js_file(level_dir, level_key, js_name, js_obfuscate)

    # CSS files
    css_files = []
    need_css = confirm("Add CSS file(s)?", default=True)

    if need_css:
        # Main CSS file
        main_css = f"{level_key}.css"
        css_files.append(main_css)
        create_css_file(level_dir, level_key, main_css)

        # Additional CSS files
        while confirm("Add another CSS file?", default=False):
            css_name = prompt("CSS filename (without level key prefix and with .css extension)")
            if not css_name.endswith('.css'):
                css_name += '.css'

            # Automatically add the level key as a prefix if it's not already there
            if not css_name.startswith(f"{level_key}_"):
                css_name = f"{level_key}_{css_name}"

            css_files.append(css_name)
            create_css_file(level_dir, level_key, css_name)

    # Create HTML template
    create_html_template(level_dir, level_key, title, hint, js_files, css_files)

    # Update level model
    if update_level_model(level_key, title, category, order, difficulty):
        console.print(f"[bold green]✓ Level '{level_key}' created successfully![/]")
        console.print(f"[cyan]Level directory:[/] {level_dir}")
        console.print(f"[cyan]JavaScript files:[/] {', '.join(js_files)}")
        console.print(f"[cyan]CSS files:[/] {', '.join(css_files)}")
        console.print("\n[bold]Next steps:[/]")
        console.print("1. Edit the HTML template to customize the level description")
        console.print("2. Implement your level's logic in the JavaScript file(s)")
        console.print("3. Style your level using the CSS file(s)")
    else:
        console.print("[bold red]Failed to update level model.[/]")


if __name__ == "__main__":
    app()
