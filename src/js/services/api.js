const API = "https://randomuser.me/api/";

// Експортуємо асинхронну функцію яка отримує параметри запиту
// results – скільки користувачів завантажити
// page – номер сторінки
// seed – унікальний ключ для стабільної вибірки (щоб дані повторювались при однакових параметрах)
// Значення за замовчуванням: 50 користувачів, сторінка 1, seed "teachinder"
export async function fetchRandomUsers({ results = 50, page = 1, seed = "teachinder" } = {}) {
  
  // Формуємо повний URL для запиту, використовуючи передані параметри
  // encodeURIComponent(seed) – щоб seed коректно закодувався в адресі
  const url = `${API}?results=${results}&page=${page}&seed=${encodeURIComponent(seed)}`;

  // Виконуємо HTTP-запит методом гет
  const res = await fetch(url, { method: "GET" });

  // Якщо відповідь неуспішна, кидаємо помилку з кодом статусу
  if (!res.ok) {
    throw new Error(`RandomUser HTTP ${res.status}`);
  }

  // Парсимо відповідь як json
  const data = await res.json();

  // Перевіряємо, чи results це масив. Якщо так, повертаємо його.
  // Якщо з якоїсь причини results немає або воно не масив то повертаємо порожній масив
  return Array.isArray(data?.results) ? data.results : [];
}
