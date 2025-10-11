export const addTeacher = async (userData) => {
    const resp = await fetch("/api/add-teacher", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(userData),
    })
    if (!resp.ok) throw new Error(await resp.text());

    return resp.json();
};
