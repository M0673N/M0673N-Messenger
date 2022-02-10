import {html} from "/node_modules/lit-html/lit-html.js";
import {footer, navBar} from "./common.js";
import {deleteHandler, refreshHandler, sendMessageHandler} from "./sendRefreshDeleteLogic/sendRefreshDeleteLogic.js";

export const privateChatTemplate = (context, data) => html`
    ${navBar()}
    <main id="site-content">
        <section id="create-page" class="create">
            <form id="create-form">
                <fieldset>
                    <legend>Private chat room</legend>
                    <p class="field">
                        <label for="url">Room Url - give this to your friend</label>
                        <span class="input">
                            <input type="text" name="url" id="image" .value="${location.href}" readonly>
                        </span>
                    </p>
                    <input class="button submit" type="submit" value="Delete room" id="delete"
                           @click="${event => deleteHandler(event, context)}">
                    <p class="field">
                        <label for="chatBox">Chat</label>
                        <span class="input">
                            <textarea name="chatBox" id="chatBox" disabled rows="10">${data}</textarea>
                        </span>
                    </p>
                    <input class="button submit" type="submit" value="Refresh message box" id="refresh"
                           @click="${event => refreshHandler(event, context, 'private')}">
                    <p class="field">
                        <label for="username">Fake username (mandatory field)</label>
                        <span class="input">
                            <input type="text" name="username" id="username">
                        </span>
                    </p>
                    <p class="field">
                        <label for="message">Message (mandatory field)</label>
                        <span class="input">
                            <textarea name="message" id="message"></textarea>
                        </span>
                    </p>
                    <input class="button submit" type="submit" id="send" value="Send message"
                           @click="${event => sendMessageHandler(event, context, 'private')}">
                </fieldset>
            </form>
        </section>
    </main>
    ${footer()}`