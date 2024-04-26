function updateCssVariable(property, color) {
    document.documentElement.style.setProperty(property, color);
}

function changeTheme(newThemePath) {
    console.log("Changing theme to:", newThemePath);  // Add for debugging
    var link = document.getElementById('theme-css');
    if (link) {
        link.href = newThemePath;
    }
}


function downloadFile(filename, content) {
    const blob = new Blob([content], { type: 'text/css;charset=utf-8;' });
    const link = document.createElement('a');
    link.href = URL.createObjectURL(blob);
    link.download = filename;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
}

async function fetchAndModifyCSS(filePath, colorVariants, themeName) {
    try {
        const response = await fetch(filePath);
        let css = await response.text();

        // Handle both base shades and theme color variants
        Object.entries(colorVariants).forEach(([key, value]) => {
            if (typeof value === 'string') {
                // Direct updates for base shades since keys already include '--rz-'
                css = updateCSSVariable(css, key, value);
            } else {
                // Handle variants for theme colors
                Object.entries(value).forEach(([variant, color]) => {
                    const cssKey = key.startsWith("--") ? key : `--rz-${key}${variant === 'base' ? '' : '-' + variant}`;
                    css = updateCSSVariable(css, cssKey, color);
                });
            }
        });

        downloadModifiedCSS(`${themeName.replace(/\s+/g, '-').toLowerCase()}-theme.css`, css);
    } catch (error) {
        console.error('Error fetching or modifying CSS:', error);
    }
}

function updateCSSVariable(css, key, value) {
    const regex = new RegExp(`${key}\\s*:\\s*[^;]*;`, 'gi');
    return css.replace(regex, `${key}: ${value};`);
}




function downloadModifiedCSS(filename, content) {
    const blob = new Blob([content], { type: 'text/css' });
    const url = URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.href = url;
    link.download = filename;
    link.click();
    URL.revokeObjectURL(url);
}

function saveToLocalStorage(key, value) {
    localStorage.setItem(key, value);
}

function getFromLocalStorage(key) {
    return localStorage.getItem(key);
}