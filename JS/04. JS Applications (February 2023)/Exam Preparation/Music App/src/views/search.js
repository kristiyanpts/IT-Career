import { searchAlbum } from "../api/music.js";
import { html } from "../lib.js";
import { getUserData } from "../utils.js";

let searchTemplate = (albums, onSearch, user) => html`<section id="searchPage">
  <h1>Search by Name</h1>

  <div class="search">
    <input
      id="search-input"
      type="text"
      name="search"
      placeholder="Enter desired albums's name"
    />
    <button @click=${onSearch} class="button-list">Search</button>
  </div>

  <h2>Results:</h2>

  <!--Show after click Search button-->
  <div class="search-result">
    ${albums.length > 0
      ? albums.map((e) => albumTemplate(e, user))
      : html`<p class="no-result">No result.</p>`}
  </div>
</section>`;

let albumTemplate = (album, user) => html`<div class="card-box">
  <img src=${album.imgUrl} />
  <div>
    <div class="text-center">
      <p class="name">Name: ${album.name}</p>
      <p class="artist">Artist: ${album.artist}</p>
      <p class="genre">Genre: ${album.genre}</p>
      <p class="price">Price: $${album.price}</p>
      <p class="date">Release Date: ${album.releaseDate}</p>
    </div>
    ${user
      ? html`<div class="btn-group">
          <a href="/details/${album._id}" id="details">Details</a>
        </div>`
      : null}
  </div>
</div>`;

export function showSearch(ctx) {
  let user = getUserData();
  function renderSearch(albums) {
    ctx.render(searchTemplate(albums, onSearch, user));
  }
  renderSearch([]);

  async function onSearch() {
    let name = document.getElementById("search-input").value;
    let results = await searchAlbum(name);
    renderSearch(results);
  }
}
