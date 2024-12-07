const BASE_URL = 'https://swapi.dev/api';
let currentCategory = '';

// Obter mapeamento de imagens do HTML
const backgroundImages = JSON.parse(
  document.getElementById('background-images').textContent
);

// Carregar categoria selecionada
function loadCategory(category) {
  currentCategory = category;
  document.getElementById('category-title').innerText = `Category: ${category.toUpperCase()}`;
  document.getElementById('card-container').innerHTML = '<p>Loading...</p>';
  document.getElementById('random-button').style.display = 'block';
  fetchRandomItem();
}

// Buscar um item aleatório da categoria selecionada
async function fetchRandomItem() {
  if (!currentCategory) return;
  try {
    const response = await fetch(`${BASE_URL}/${currentCategory}/`);
    const data = await response.json();
    const randomItem = data.results[Math.floor(Math.random() * data.results.length)];
    displayCard(randomItem);
    updateBackground(randomItem.name || randomItem.title);
  } catch (error) {
    document.getElementById('card-container').innerHTML = '<p>Error loading data.</p>';
    console.error('Error fetching data:', error);
  }
}

// Exibir os dados no card
// Exibir os dados no card, incluindo imagem
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


// Atualizar a imagem de fundo com base no item
// Atualizar a imagem de fundo com base no item
function updateBackground(itemName) {
  const defaultImage = "images/default.jpg";
  const imageUrl = backgroundImages[currentCategory]?.[itemName] || defaultImage;
  document.body.style.backgroundImage = `url('${imageUrl}')`;
}

