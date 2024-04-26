function changeTheme(newThemePath) {
    var link = document.getElementById('theme-css');
    if (link) {
        link.href = newThemePath;
    }
}