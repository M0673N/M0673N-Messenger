import request from "./requests.js";
import endpoints from "./endpoints.js";

async function getAllComments(target, roomId) {
    let targetUrl = target === 'public' ? endpoints.publicUrl : `${endpoints.privateUrl}/${roomId}/messages.json`;
    return await request.get(targetUrl);
}

async function createPublicComment(data) {
    return await request.post(endpoints.publicUrl, data);
}

async function createRoom(data) {
    return await request.post(`${endpoints.privateUrl}.json`, {messages: {messageId: {username: '', message: ''}}});
}

async function createPrivateComment(data, roomId) {
    return await request.post(`${endpoints.privateUrl}/${roomId}/messages.json`, data);
}

async function deleteRoom(roomId) {
    return await request.del(`${endpoints.privateUrl}/${roomId}.json`);
}

export default {
    getAllComments,
    createPublicComment,
    createRoom,
    createPrivateComment,
    deleteRoom
}