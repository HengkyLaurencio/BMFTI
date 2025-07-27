const btnTheme = document.getElementById('theme-toggle');
btnTheme.addEventListener('click', () => {
    document.body.classList.toggle('light');
    const isLight = document.body.classList.contains('light');
    try {
        localStorage.setItem('theme', isLight ? 'light' : 'dark');
    } catch (e) { }
    // (Opsional) ubah ikon
    btnTheme.textContent = isLight ? '🌞' : '🌓';
});

// Set ikon sesuai state awal
(function syncIcon() {
    const isLight = document.body.classList.contains('light');
    btnTheme.textContent = isLight ? '🌞' : '🌓';
})();