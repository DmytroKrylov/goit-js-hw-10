
const apiKey = 'live_vYSva83dHL8GYNk8EPgGthjAdesgckJfiD6lnAlRCYww2yWap9JNTGgEM9fXfx3J';

// Функція для виконання HTTP-запиту і повернення промісу з масивом порід
export function fetchBreeds() {
  const url = 'https://api.thecatapi.com/v1/breeds';

  return fetch(url, {
    headers: {
      'x-api-key': apiKey,
    },
  })
    .then(response => response.json())
    .then(data => data.map(breed => ({ id: breed.id, name: breed.name })))
    .catch(error => {
      console.error('Error fetching cat breeds:', error);
      throw error;
    });
}

// Функція для виконання HTTP-запиту і повернення промісу з даними про кота
export function fetchCatByBreed(breedId) {
  const url = `https://api.thecatapi.com/v1/images/search?breed_ids=${breedId}`;

  return fetch(url, {
    headers: {
      'x-api-key': apiKey,
    },
  })
    .then(response => response.json())
    .then(data => {
      const catData = data[0];
      const breed = catData.breeds[0];
      const catInfo = {
        name: breed.name,
        description: breed.description,
        temperament: breed.temperament,
        image: catData.url,
      };
      return catInfo;
    })
    .catch(error => {
      console.error('Error fetching cat by breed:', error);
      throw error;
    });
}




