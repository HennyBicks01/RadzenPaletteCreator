function updateCssVariable(property, color) {
    document.documentElement.style.setProperty(property, color);
}

function changeTheme(newThemePath) {
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

async function fetchAndModifyCSS(filePath, themeColors, themeName) {
    try {
        const response = await fetch(filePath);
        let css = await response.text();

        for (const [key, value] of Object.entries(themeColors)) {
            const cssKey = `--rz-${key}`;
            const regex = new RegExp(`${cssKey}: [^;]*;`, 'g');
            css = css.replace(regex, `${cssKey}: ${value.BaseColor};`);
        }

        downloadModifiedCSS(`${themeName.replace(/\s+/g, '-').toLowerCase()}-theme.css`, css);
    } catch (error) {
        console.error('Error fetching or modifying CSS:', error);
    }
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

