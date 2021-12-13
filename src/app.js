import page from "/node_modules/page/page.mjs";
import rendering from "./rendering.js";

rendering.home();

page('/', '/home');
page('/home', rendering.home);
page('/public', rendering.publicChat);
page('/private:id', rendering.privateChat);

page.start();