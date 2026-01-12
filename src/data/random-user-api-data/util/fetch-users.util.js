export const fetchRandomUsers = async (usersAmount = 30) => {
    if (usersAmount < 1) {
        throw new Error("Users amount cannot be less than 1");
    }
    const API_URL = "https://randomuser.me/api?results=" + usersAmount;

    try {
        const response = await fetch(API_URL);
        if (!response.ok) {
            console.error(`HTTP error, status: ${response.status}`);
        }

        return (await response.json()).results;
    } catch (error) {
        console.error("Error on fetching random users:", error);
    }
};

