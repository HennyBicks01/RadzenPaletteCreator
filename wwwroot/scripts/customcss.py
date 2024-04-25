import re
import os

def extract_css_variables(css_file, variable_names):
    """Extract specific CSS variables and their values based on a predefined list."""
    color_values = {}
    with open(css_file, 'r') as file:
        css_content = file.read()

    for var_name in variable_names:
        pattern = re.escape(var_name) + r'\s*:\s*([^;]+);'
        match = re.search(pattern, css_content)
        if match:
            value = match.group(1).strip()
            color_values[var_name] = value  # Map the variable to its color value

    return color_values

def replace_colors_in_css(input_file, output_file, color_values):
    """Replace hardcoded color values in CSS with their respective CSS variable names."""
    with open(input_file, 'r') as file:
        lines = file.readlines()

    updated_lines = []
    for line in lines:
        for var_name, color in color_values.items():
            if color in line and var_name not in line:
                line = re.sub(re.escape(color) + r'(?![\w-])', f'var({var_name})', line)
        updated_lines.append(line)

    with open(output_file, 'w') as file:
        file.writelines(updated_lines)

def process_directory(input_dir, output_dir, variable_names):
    # Ensure output directory exists
    if not os.path.exists(output_dir):
        os.makedirs(output_dir)

    # Process each CSS file in the input directory
    for filename in os.listdir(input_dir):
        if filename.endswith(".css"):
            input_file = os.path.join(input_dir, filename)
            output_file = os.path.join(output_dir, filename)
            print(f"Processing {input_file}...")

            # Extract color mappings from each file, assuming they contain the CSS variable definitions
            color_values = extract_css_variables(input_file, variable_names)
            replace_colors_in_css(input_file, output_file, color_values)
            print(f"Updated file saved as {output_file}")

def main():
    variable_names = [
        "--rz-white", "--rz-black", "--rz-base-50", "--rz-base-100", "--rz-base-200",
        "--rz-base-300", "--rz-base-400", "--rz-base-500", "--rz-base-600", "--rz-base-700",
        "--rz-base-800", "--rz-base-900", "--rz-primary", "--rz-primary-light", "--rz-primary-lighter",
        "--rz-primary-dark", "--rz-primary-darker", "--rz-secondary", "--rz-secondary-light",
        "--rz-secondary-lighter", "--rz-secondary-dark", "--rz-secondary-darker", "--rz-info",
        "--rz-info-light", "--rz-info-lighter", "--rz-info-dark", "--rz-info-darker", "--rz-success",
        "--rz-success-light", "--rz-success-lighter", "--rz-success-dark", "--rz-success-darker",
        "--rz-warning", "--rz-warning-light", "--rz-warning-lighter", "--rz-warning-dark",
        "--rz-warning-darker", "--rz-danger", "--rz-danger-light", "--rz-danger-lighter",
        "--rz-danger-dark", "--rz-danger-darker"
    ]

    css_directory = 'css'
    output_directory = 'updatedcss'
    process_directory(css_directory, output_directory, variable_names)

if __name__ == "__main__":
    main()
