const BASE_URL = 'https://swapi.dev/api';
let currentCategory = '';

// Load the selected category
function loadCategory(category) {
  currentCategory = category;
  document.getElementById('category-title').innerText = `Category: ${category.toUpperCase()}`;
  document.getElementById('card-container').innerHTML = '<p>Loading...</p>';
  document.getElementById('random-button').style.display = 'block';
  fetchRandomItem();
}

// Fetch a random item from the selected category
async function fetchRandomItem() {
  if (!currentCategory) return;
  try {
    const response = await fetch(`${BASE_URL}/${currentCategory}/`);
    const data = await response.json();
    const randomItem = data.results[Math.floor(Math.random() * data.results.length)];
    displayCard(randomItem);
  } catch (error) {
    document.getElementById('card-container').innerHTML = '<p>Error loading data.</p>';
    console.error('Error fetching data:', error);
  }
}

// Display the data in a card
function displayCard(data) {
  const cardContainer = document.getElementById('card-container');
  cardContainer.innerHTML = `
    <div class="card">
      <h3>${data.name || data.title}</h3>
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
