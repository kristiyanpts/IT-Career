import { page, render } from "./lib.js";
import { getUserData } from "./utils.js";
// import { showCatalogue } from "./views/catalogue.js";
// import { showHome } from "./views/home.js";
// import { showCreate } from "./views/create.js";
// import { showDetails } from "./views/details.js";
// import { showEdit } from "./views/edit.js";
// import { showLogin } from "./views/login.js";
// import { showNav } from "./views/nav.js";
// import { showRegister } from "./views/register.js";
let main = document.querySelector("main");

page(decorateContenxt);
// page("/index.html", "/");
// page("/", showHome);
// page("/login", showLogin);
// page("/register", showRegister);
// page("/catalog", showCatalogue);
// page("/create", showCreate);
// page("/details/:id", showDetails);
// page("/edit/:id", showEdit);

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
