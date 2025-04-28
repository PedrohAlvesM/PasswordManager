export function ShowNotificationError(title, errors) {
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

export async function ShowNotificationConfirm(title) {
    return new Promise((resolve)=>{
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
        
        content.classList.add("flex-row-container");
        const btnConfirm = document.createElement("button");
        const btnCancel = document.createElement("button");
    
        btnConfirm.textContent = "Confirm";
        btnConfirm.classList.add("btn-confirm", "button");
        btnConfirm.addEventListener("click", ()=>{
            resolve(true);
            notification.remove();
        });
    
        btnCancel.textContent = "Cancel";
        btnCancel.classList.add("btn-cancel", "button");
        btnCancel.addEventListener("click", ()=>{
            resolve(false);
            notification.remove();
        });
    
        content.appendChild(btnConfirm);
        content.appendChild(btnCancel);
        
        header.appendChild(warningImg);
        header.appendChild(headerText);
        header.appendChild(closeImg);
        notification.appendChild(header);
        notification.appendChild(content);
        
        document.body.appendChild(notification);
    });
}

export function ShowNotificationText(title) {
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
    
    header.appendChild(warningImg);
    header.appendChild(headerText);
    header.appendChild(closeImg);
    notification.appendChild(header);
    
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