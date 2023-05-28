
import SlimSelect from 'slim-select'
import { fetchBreeds, fetchCatByBreed } from './cat-api.js';

// Отримуємо посилання на HTML-елементи
const breedSelect = document.querySelector('.breed-select');
const loader = document.querySelector('.loader');
const error = document.querySelector('.error');
const catInfo = document.querySelector('.cat-info');

// Показуємо loader
function showLoader() {
  loader.style.display = 'block';
}

// Ховаємо loader
function hideLoader() {
  loader.style.display = 'none';
}

// Показуємо повідомлення про помилку
function showError() {
  error.classList.add('show');
}

// Ховаємо повідомлення про помилку
function hideError() {
  error.classList.remove('show');
}

// Показуємо/ховаємо елементи при запиті
function toggleLoadingElements(loading) {
  breedSelect.disabled = loading;
  catInfo.style.display = loading ? 'none' : 'block';
  loader.style.display = loading ? 'block' : 'none';
}

// Заповнюємо select.breed-select опціями
function populateBreedsSelect(breeds) {
  breeds.forEach(breed => {
    const option = document.createElement('option');
    option.value = breed.id;
    option.textContent = breed.name;
    breedSelect.appendChild(option);
  });

  // Ініціалізуємо SlimSelect для стилізації селекта
  new SlimSelect({
    select: breedSelect,
    showSearch: false,
    placeholder: 'Select Breed'
  });
}

// Заповнюємо div.cat-info інформацією про кота
function showCatInfo(catInfoData) {
  catInfo.innerHTML = `
    <img src="${catInfoData.image}" alt="Cat Image" />
    <p><strong>Name:</strong> ${catInfoData.name}</p>
    <p><strong>Description:</strong> ${catInfoData.description}</p>
    <p><strong>Temperament:</strong> ${catInfoData.temperament}</p>
  `;
}

// Очищуємо div.cat-info
function clearCatInfo() {
  catInfo.innerHTML = '';
}

// Обробник події вибору опції в селекті
function onBreedSelectChange() {
  const selectedBreedId = breedSelect.value;

  if (selectedBreedId) {
    toggleLoadingElements(true);
    clearCatInfo();
    hideError();

    fetchCatByBreed(selectedBreedId)
      .then(catInfoData => {
        showCatInfo(catInfoData);
        toggleLoadingElements(false);
      })
      .catch(() => {
        showError();
        toggleLoadingElements(false);
      });
  } else {
    clearCatInfo();
  }
}

// Встановлюємо обробник події для селекту
breedSelect.addEventListener('change', onBreedSelectChange);

// Запускаємо отримання списку порід при завантаженні сторінки
toggleLoadingElements(true);

fetchBreeds()
  .then(breeds => {
    populateBreedsSelect(breeds);
    toggleLoadingElements(false);
  })
  .catch(() => {
    showError();
    toggleLoadingElements(false);
  });

// Приховуємо елемент p.error при завантаженні сторінки
hideError();
