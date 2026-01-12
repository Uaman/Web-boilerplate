import { CustomEvents } from '../events.js';

const addNUsers = async (usersAmount = 10) => {
    await fetch(`api/teachers/random`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ amount: usersAmount })
    });
};

document.addEventListener(CustomEvents['components:loaded'], async () => {
    const button = document.querySelector('.load-some-random-teachers');
    button.addEventListener('click', async () => {
        await addNUsers(10, 'src/data/users-validated.json');
        document.dispatchEvent(new CustomEvent(CustomEvents['teacher:added']));
    });
});
