import CRUDService from "./services/CRUDService.js";
import {render} from "/node_modules/lit-html/lit-html.js";
import {homePageTemplate} from "./pages/homePageTemplate.js";
import {publicChatTemplate} from "./pages/publicChatPageTemplate.js";
import {privateChatTemplate} from "./pages/privateChatPageTemplate.js";
import {roomDoesNotExist, processDataForMessageBox, showError} from "./helpers.js";

let targetEl = document.querySelector('#container');

function home(context) {
    render(homePageTemplate(context), targetEl);
}

async function privateChat(context) {
    try {
        let data = await CRUDService.getAllComments('private', context.params.id);
        if (roomDoesNotExist(data, context, 'The room does not exist')) {
            return;
        }
        data = processDataForMessageBox(data, 'private');
        render(privateChatTemplate(context, data), targetEl);
    } catch (error) {
        showError(context, 'No connection to database');
    }
}

async function publicChat(context) {
    try {
        render(publicChatTemplate(), targetEl);
        let data = await CRUDService.getAllComments('public');
        data = processDataForMessageBox(data, 'public');
        render(publicChatTemplate(data), targetEl);
    } catch (error) {
        showError(context, 'No connection to database');
    }
}

export default {home, privateChat, publicChat}