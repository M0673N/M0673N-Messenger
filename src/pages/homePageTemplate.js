import {html} from "/node_modules/lit-html/lit-html.js";
import {footer, navBar} from "./common.js";
import CRUDService from "../services/CRUDService.js";

async function createHandler(event, context) {
    event.preventDefault();
    let roomKey = await CRUDService.createRoom();
    context.page.redirect(`/private${roomKey.name}`);
}

export const homePageTemplate = (context) => html`
    ${navBar()}
    <main id="site-content">
        <section id="dashboard-page" class="dashboard">
            <h1>Anonymous Messenger</h1>
            <ul class="other-books-list">
                <a class="otherBooks" href="/public">
                    <h3>Join the public chat room</h3>
                    <p>Everyone can see the messages in this room.</p>
                </a>

                <a class="otherBooks" href="" @click="${event => createHandler(event, context)}">
                    <h3>Create a private chat room</h3>
                    <p>Create a private room and share the room code.</p>
                </a>
            </ul>
        </section>
    </main>
    ${footer()}`