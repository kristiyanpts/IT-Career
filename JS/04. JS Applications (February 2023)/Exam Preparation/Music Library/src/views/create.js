import { createAlbum } from "../api/music.js";
import { html } from "../lib.js";
import { createSubmitHandler } from "../utils.js";

let createTemplate = (onCreate) => html`<section id="create">
  <div class="form">
    <h2>Add Album</h2>
    <form @submit=${onCreate} class="create-form">
      <input
        type="text"
        name="singer"
        id="album-singer"
        placeholder="Singer/Band"
      />
      <input type="text" name="album" id="album-album" placeholder="Album" />
      <input
        type="text"
        name="imageUrl"
        id="album-img"
        placeholder="Image url"
      />
      <input
        type="text"
        name="release"
        id="album-release"
        placeholder="Release date"
      />
      <input type="text" name="label" id="album-label" placeholder="Label" />
      <input type="text" name="sales" id="album-sales" placeholder="Sales" />

      <button type="submit">post</button>
    </form>
  </div>
</section>`;

export async function showCreate(ctx) {
  ctx.render(createTemplate(createSubmitHandler(onCreate)));

  async function onCreate({ singer, album, imageUrl, release, label, sales }) {
    if (
      singer == "" ||
      album == "" ||
      imageUrl == "" ||
      release == "" ||
      label == "" ||
      sales == ""
    )
      return alert("All fields are required.");

    await createAlbum({
      singer,
      album,
      imageUrl,
      release,
      label,
      sales,
    });
    ctx.page.redirect("/dashboard");
  }
}
