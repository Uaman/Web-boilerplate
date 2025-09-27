document.addEventListener('DOMContentLoaded', async () => {
    const includeEls: HTMLElement[] = Array.from(
        document.querySelectorAll<HTMLElement>('[data-include]')
    );

    await Promise.all(
        includeEls.map(async (el: HTMLElement) => {
            const url: string | null = el.getAttribute('data-include');
            if (!url) return;

            try {
                const res: Response = await fetch(url);
                el.outerHTML = await res.text();
            } catch (e) {
                console.error('Failed to load component:', url, e);
            }
        })
    );

    document.dispatchEvent(new CustomEvent('componentsLoaded'));
});
