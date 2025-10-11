document.addEventListener('DOMContentLoaded', async () => {
    const includes = document.querySelectorAll('[data-include]');
    for (const el of includes) {
        const file = el.getAttribute('data-include');
        const response = await fetch(file);
        if (response.ok) {
            el.innerHTML = await response.text();
        } else {
            el.innerHTML = `<p style="color:red;">couldn't load${file}</p>`;
        }
    }
    document.dispatchEvent(new Event('components:loaded'));
});
