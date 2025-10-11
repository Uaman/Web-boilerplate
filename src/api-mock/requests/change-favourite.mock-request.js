export const changeFavourite = async (id, value) => {
    const resp = await fetch('/api/change-favourite', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ id, value }),
    });
    if (!resp.ok) throw new Error(await resp.text());

    return resp.json();
};
