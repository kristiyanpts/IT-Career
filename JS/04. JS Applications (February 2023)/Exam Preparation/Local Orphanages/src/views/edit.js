import { getPostById, updatePostById } from "../api/posts.js";
import { html } from "../lib.js";
import { createSubmitHandler } from "../utils.js";

let editTemplate = (post, onEdit) => html` <section id="edit-page" class="auth">
  <form @submit=${onEdit} id="edit">
    <h1 class="title">Edit Post</h1>

    <article class="input-group">
      <label for="title">Post Title</label>
      <input type="title" name="title" id="title" .value=${post.title} />
    </article>

    <article class="input-group">
      <label for="description">Description of the needs </label>
      <input
        type="text"
        name="description"
        id="description"
        .value=${post.description}
      />
    </article>

    <article class="input-group">
      <label for="imageUrl"> Needed materials image </label>
      <input
        type="text"
        name="imageUrl"
        id="imageUrl"
        .value=${post.imageUrl}
      />
    </article>

    <article class="input-group">
      <label for="address">Address of the orphanage</label>
      <input type="text" name="address" id="address" .value=${post.address} />
    </article>

    <article class="input-group">
      <label for="phone">Phone number of orphanage employee</label>
      <input type="text" name="phone" id="phone" .value=${post.phone} />
    </article>

    <input type="submit" class="btn submit" value="Edit Post" />
  </form>
</section>`;

export async function showEdit(ctx) {
  let postId = ctx.params.id;
  let post = await getPostById(postId);
  ctx.render(editTemplate(post, createSubmitHandler(onEdit)));

  async function onEdit({ title, description, imageUrl, address, phone }) {
    if (
      title == "" ||
      address == "" ||
      phone == "" ||
      description == "" ||
      imageUrl == ""
    )
      return alert("All fields are required.");

    await updatePostById(postId, {
      title,
      description,
      imageUrl,
      address,
      phone,
    });
    ctx.page.redirect("/details/" + postId);
  }
}
