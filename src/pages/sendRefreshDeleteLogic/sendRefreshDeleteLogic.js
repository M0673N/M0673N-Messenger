import CRUDService from "../../services/CRUDService.js";
import {processDataForMessageBox, roomDoesNotExist, showError} from "../../helpers.js";

export function mandatoryFieldsChecker(...fields) {
    for (const field of fields) {
        if (!field.trim()) {
            alert('Fill mandatory fields');
            return true;
        }
    }
}

export function buttonBehaviour(button, type) {
    button.value = 'Loading...';
    button.disabled = true;
    button.style.background = 'gray';
    if (type === 'delete') {
        return;
    }
    setTimeout(() => {
        button.disabled = false;
        button.style.background = '';
    }, 5000);
}

export async function sendMessageHandler(event, context, type) {
    event.preventDefault();

    try {
        if (type === 'private') {
            let data = await CRUDService.getAllComments('private', context.params.id);
            if (roomDoesNotExist(data, context, 'The room has been deleted')) {
                return;
            }
        }

        let formData = new FormData(document.querySelector('form'));
        let username = formData.get('username');
        let message = formData.get('message');
        let sendBtn = document.querySelector('#send');
        let messageBox = document.querySelector('#message');

        if (mandatoryFieldsChecker(username, message)) {
            return;
        }

        buttonBehaviour(sendBtn);
        messageBox.value = '';
        if (type === 'private') {
            await CRUDService.createPrivateComment({username, message}, context.params.id);
        } else {
            await CRUDService.createPublicComment({username, message});
        }

        sendBtn.value = 'Send message';

        refreshHandler({
            preventDefault: () => {
            }
        }, context, 'private');
    } catch (error) {
        showError(context, 'No connection to database');
    }
}

export async function refreshHandler(event, context, type) {
    event.preventDefault();

    try {
        let data;

        if (type === 'private') {
            data = await CRUDService.getAllComments('private', context.params.id);
            if (roomDoesNotExist(data, context, 'The room has been deleted')) {
                return;
            }
        }

        let refreshBtn = document.querySelector('#refresh');
        let chatBox = document.querySelector('#chatBox');

        buttonBehaviour(refreshBtn);
        if (type === 'private') {
            chatBox.value = processDataForMessageBox(data, 'private');
        } else {
            let data = await CRUDService.getAllComments('public');
            chatBox.value = processDataForMessageBox(data, 'public');
        }

        refreshBtn.value = 'Refresh message box';
    } catch (error) {
        showError(context, 'No connection to database');
    }
}

export async function deleteHandler(event, context) {
    event.preventDefault();

    try {
        let data = await CRUDService.getAllComments('private', context.params.id);
        if (roomDoesNotExist(data, context, 'The room has been deleted')) {
            return;
        }

        let deleteBtn = document.querySelector('#delete');

        let decision = confirm('Are you sure you want to delete this room?');
        if (decision) {
            buttonBehaviour(deleteBtn, 'delete');
            await CRUDService.deleteRoom(context.params.id);
            context.page.redirect('/home');
        }
    } catch (error) {
        showError(context, 'No connection to database');
    }
}