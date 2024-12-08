const BASE_URL = 'https://swapi.dev/api';
let currentCategory = '';
let items = [];
let currentIndex = 0; 

const backgroundImages = JSON.parse(
  document.getElementById('background-images').textContent
);

function loadCategory(category) {
  currentCategory = category;
  currentIndex = 0; // Reinicia o índice
  document.getElementById('category-title').innerText = `Category: ${category.toUpperCase()}`;
  document.getElementById('card-container').innerHTML = '<p>Loading...</p>';
  document.getElementById('random-button').style.display = 'block';
  fetchCategoryItems();
}

async function fetchCategoryItems() {
  if (!currentCategory) return;
  try {
    const response = await fetch(`${BASE_URL}/${currentCategory}/`);
    const data = await response.json();
    items = data.results; // Armazena todos os itens da categoria
    displayNextItem(); // Exibe o primeiro item
  } catch (error) {
    document.getElementById('card-container').innerHTML = '<p>Error loading data.</p>';
    console.error('Error fetching data:', error);
  }
}

function displayNextItem() {
  if (!items.length) return;

  const item = items[currentIndex]; // Obtém o item atual da sequência
  displayCard(item);
  updateBackground(item.name || item.title);

  
  currentIndex = (currentIndex + 1) % items.length;
}

function displayCard(data) {
  const cardContainer = document.getElementById('card-container');
  const itemName = data.name || data.title;
  const defaultImage = "images/default.jpg";
  const imageUrl = backgroundImages[currentCategory]?.[itemName] || defaultImage;

  cardContainer.innerHTML = `
    <div class="card">
      <img src="${imageUrl}" alt="${itemName}" style="width: 100%; border-radius: 8px 8px 0 0;">
      <h3>${itemName}</h3>
      <ul>
        ${Object.entries(data)
          .map(([key, value]) => {
            if (typeof value === 'string' || typeof value === 'number') {
              return `<li><strong>${key}:</strong> ${value}</li>`;
            }
            return '';
          })
          .join('')}
      </ul>
    </div>
  `;
}

function updateBackground(itemName) {
  const defaultImage = "images/default.jpg";
  const imageUrl = backgroundImages[currentCategory]?.[itemName] || defaultImage;
  document.body.style.backgroundImage = `url('${imageUrl}')`;
}


document.getElementById('random-button').addEventListener('click', displayNextItem);
