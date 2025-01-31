export function ShowNotification(errors, title) {
    const text = GetErrorsText(errors);

    const notification = document.createElement('div');
    notification.className = 'notification shadow';

    const header = document.createElement('div');
    header.className = 'header';

    const warningImg = document.createElement('img');
    warningImg.className = 'warning';
    warningImg.src = 'assets/warning.svg';
    warningImg.alt = 'warning';

    const headerText = document.createTextNode(title);

    const closeImg = document.createElement('img');
    closeImg.addEventListener("click", ()=>{notification.remove()});
    closeImg.className = 'close';
    closeImg.src = 'assets/close.svg';
    closeImg.alt = 'close';

    const content = document.createElement('div');
    content.className = 'content';

    content.textContent = text;

    header.appendChild(warningImg);
    header.appendChild(headerText);
    header.appendChild(closeImg);
    notification.appendChild(header);
    notification.appendChild(content);

    document.body.appendChild(notification);
}

function GetErrorsText(errors) {
    let text = "";
    for (const field in errors) {
        const errorMessages = errors[field];
        errorMessages.forEach(message => {
          text += message+"\n";
        });
    }  

    return text;
}