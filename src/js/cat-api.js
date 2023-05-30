
const apiKey = 'live_vYSva83dHL8GYNk8EPgGthjAdesgckJfiD6lnAlRCYww2yWap9JNTGgEM9fXfx3J';

// Функція для виконання HTTP-запиту і повернення промісу з масивом порід
export function fetchBreeds() {
  const url = 'https://api.thecatapi.com/v1/breeds';

  return fetch(url, {
    headers: {
      'x-api-key': apiKey,
    },
  })
    .then(response => {
      if (!response.ok) {
        throw new Error(response.status);
      }
      return response.json();
    })
}

// Функція для виконання HTTP-запиту і повернення промісу з даними про кота
export function fetchCatByBreed(breedId) {
  const url = `https://api.thecatapi.com/v1/images/search?breed_ids=${breedId}`;

  return fetch(url, {
    headers: {
      'x-api-key': apiKey,
    },
  })
  .then(response => {
    if (!response.ok) {
      throw new Error(response.status);
    }
    return response.json();
  })
}




