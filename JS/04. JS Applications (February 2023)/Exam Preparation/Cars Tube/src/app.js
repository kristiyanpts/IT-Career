import { page, render } from "./lib.js";
import { getUserData } from "./utils.js";
import { showHome } from "./views/home.js";
import { showListings } from "./views/listings.js";
import { showCreate } from "./views/create.js";
import { showDetails } from "./views/details.js";
import { showEdit } from "./views/edit.js";
import { showLogin } from "./views/login.js";
import { showNav } from "./views/nav.js";
import { showRegister } from "./views/register.js";
import { showMyListings } from "./views/mylistings.js";
import { showSearch } from "./views/search.js";
let main = document.getElementById("site-content");

page(decorateContenxt);
page("index.html", "/");
page("/", showHome);
page("/login", showLogin);
page("/register", showRegister);
page("/listings", showListings);
page("/create", showCreate);
page("/details/:id", showDetails);
page("/edit/:id", showEdit);
page("/mylistings", showMyListings);
page("/search", showSearch);

showNav();
page.start();

function decorateContenxt(ctx, next) {
  ctx.render = renderMain;
  ctx.updateNav = showNav;
  ctx.userData = getUserData();
  next();
}

function renderMain(content) {
  render(content, main);
}
