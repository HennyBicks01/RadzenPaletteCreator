function updateCssVariable(property, color) {
    document.documentElement.style.setProperty(property, color);
}

function changeTheme(newThemePath) {
    var link = document.getElementById('theme-css');
    if (link) {
        link.href = newThemePath;
    }
}

