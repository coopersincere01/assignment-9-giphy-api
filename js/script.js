const gifContainer = document.querySelector("#gif-container");
const fetchGifBtn = document.querySelector("#fetch-gif-btn");
const searchInput = document.querySelector("#search-input");

let images = [];

async function getGifs() {
  const searchTerm = searchInput.value.trim() || "cats";
  const endpoint = `https://api.giphy.com/v1/gifs/search?api_key=1YMWdeTudAaaUcwnP4u3KyWd5lmtQKOI&q=${encodeURIComponent(searchTerm)}&limit=12`;

  const response = await fetch(endpoint);
  const data = await response.json();

  images = data.data.map((gif) => gif.images.original.url);
}

function renderGifs() {
  gifContainer.innerHTML = "";

  for (const image of images) {
    gifContainer.innerHTML += `
      <div class="col-md-3 col-sm-6 mb-3">
        <img src="${image}" class="img-fluid rounded w-100" alt="GIF">
      </div>
    `;
  }
}

async function loadGifs() {
  await getGifs();
  renderGifs();
}

fetchGifBtn.addEventListener("click", loadGifs);

searchInput.addEventListener("keydown", function (event) {
  if (event.key === "Enter") {
    loadGifs();
  }
});