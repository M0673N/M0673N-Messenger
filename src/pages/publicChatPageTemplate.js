import {html} from "/node_modules/lit-html/lit-html.js";
import {footer, navBar} from "./common.js";
import {refreshHandler, sendMessageHandler} from "./sendRefreshDeleteLogic/sendRefreshDeleteLogic.js";

export const publicChatTemplate = (data) => html`
    ${navBar()}
    <main id="site-content">
        <section id="create-page" class="create">
            <form id="create-form">
                <fieldset>
                    <legend>Public chat room</legend>
                    <p class="field">
                        <label for="description">Chat</label>
                        <span class="input">
                            <textarea name="chatBox" id="chatBox" disabled rows="10">${data}</textarea>
                        </span>
                    </p>
                    <input class="button submit" type="submit" value="Refresh message box" id="refresh"
                           @click="${refreshHandler}">
                    <p class="field">
                        <label for="image">Fake username (mandatory field)</label>
                        <span class="input">
                            <input type="text" name="username" id="image">
                        </span>
                    </p>
                    <p class="field">
                        <label for="description">Message (mandatory field)</label>
                        <span class="input">
                            <textarea name="message" id="message"></textarea>
                        </span>
                    </p>
                    <input class="button submit" type="submit" id="send" value="Send message"
                           @click="${sendMessageHandler}">
                </fieldset>
            </form>
        </section>
    </main>
    ${footer()}`