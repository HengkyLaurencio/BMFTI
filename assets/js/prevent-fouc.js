(function () {
    try {
        const saved = localStorage.getItem('theme');
        if (saved === 'light') {
            document.documentElement.classList.add('js');
            document.addEventListener('DOMContentLoaded', function () {
                document.body.classList.add('light');
            });
        }
    } catch (e) { }
})();