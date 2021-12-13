export function processDataForMessageBox(data, type) {
    let arr;
    if (type === 'private') {
        arr = Object.values(data).slice(0, -1);
    } else {
        arr = Object.values(data).slice(1);
    }

    let result = [];
    for (const el of arr) {
        result.push(`${el.username}: ${el.message}`)
    }
    return result.join('\n');
}

export function roomDoesNotExist(data, context, message) {
    if (data === null) {
        alert(message);
        context.page.redirect('/home');
        return true;
    }
}

export function showError(context, message) {
    alert(message);
    context.page.redirect('/home');
}