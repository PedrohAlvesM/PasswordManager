import { ShowNotification } from "./notification.js";

let passwordDataChanged = false;
let data = sessionStorage.getItem('passwords');
const passwords = JSON.parse(data);
const CSRF_TOKEN = document.querySelector('meta[name="csrf-token"]').getAttribute('content');

const search = document.getElementById('search');
search.addEventListener('input', () => {
    const passwordIndex = SearchInPasswords(search.value);
    if (passwordIndex !== -1) {
        WritePasswordData(passwordIndex);
    }
});

const btnDone = document.getElementById("btn-done");
btnDone.addEventListener("click", async () => {
    const data = getAllData();
    const errors = isValidForm(data);
    if (Object.keys(errors).length > 0) {
        const title = passwordDataChanged ? 'Error changing password data' : 'Error creating password';
        ShowNotification(errors, title);
        return false;
    }
    if (passwordDataChanged) {
        const toUpdate = SearchInPasswords(search.value);
        if (toUpdate === -1) {
            alert(`${passwords[i].application_name} can't be updated.`);
            return false;
        }

        if (await UpdatePassword(passwords[toUpdate].id_password)) {
            alert(`${passwords[toUpdate].application_name} password updated.`);
            return true;
        }
        alert(`${passwords[toUpdate].application_name} can't be updated.`);
        return false;
    }
    if (await CreatePassword()) {
        alert("Password created successfully.");
        return true;
    }
    alert("Password can't be created.");
    return false;
});

const btnCopy = document.getElementsByClassName("btn-copy");
const passwordData = document.getElementsByClassName("password-data");
for (let i = 0; i < btnCopy.length; i++) {
    btnCopy[i].addEventListener("click", () => {
        const content = passwordData[i].innerText;
        navigator.clipboard.writeText(content);
        alert("Text copied: " + content);
    })
}

const btnDelete = document.getElementById("btn-delete");
btnDelete.addEventListener('click', async () => {
    const toDelete = SearchInPasswords(search.value);
    if (toDelete === -1) {
        alert(`${passwords[i].application_name} can't be deleted.`);
        return false;
    }

    if (await DeletePassword(passwords[toDelete].id_password)) {
        alert(`${passwords[toDelete].application_name} password deleted.`);
        return true;
    }
    alert(`${passwords[toDelete].application_name} can't be deleted.`);
    return false;
});

const btnChange = document.getElementById("btn-change");
btnChange.addEventListener("click", () => {
    if (passwordDataChanged) {
        passwordDataChanged = false;
        for (let i = 0; i < passwordData.length; i++) {
            passwordData[i].disabled = true;
            passwordData[i].style.border = '1px solid lightgray';
            
        }
        
        btnChange.style.backgroundColor = "#f4f4f4";
    }
    else {
        passwordDataChanged = true;
        for (let i = 0; i < passwordData.length; i++) {
            passwordData[i].disabled = false;
            passwordData[i].style.border = '1px solid orange';
        }

        btnChange.style.backgroundColor = "#d8d8d8";
    }
});

function isValidForm(data) {
    const validationRules = {
        application_name: [
            { rule: value => value.trim() !== "", message: "Application name is required." },
            { rule: value => value.length < 255, message: "Application name too long." }
        ],
        password: [
            { rule: value => value.trim() !== "", message: "Password is required." },
            { rule: value => value.length >= 8, message: "Password must be at least 8 characters long." }
        ],
        username: [
            {
                rule: value => value.length < 255, message: "Username too long."
            }
        ],
        email: [
            { rule: value => value === "" || /\S+@\S+\.\S+/.test(value), message: "Email invalid." }
        ],
        recovery_email: [
            { rule: value => value === "" || /\S+@\S+\.\S+/.test(value), message: "Recovery Email invalid." }
        ],
        phone: [
            { rule: value => value === "" || /^\+?\d{1,4}?\s?\(?\d{1,4}\)?\s?\d{4,5}[- ]?\d{4}$/.test(value), message: "Phone invalid." }
        ],
        recovery_phone: [
            { rule: value => value === "" || /^\+?\d{1,4}?\s?\(?\d{1,4}\)?\s?\d{4,5}[- ]?\d{4}$/.test(value), message: "Recovery Phone invalid." }
        ],
        birth_date: [
            { rule: (value) => !isNaN(new Date(value).getTime()), message: "Date invalid." }
        ],
        description: [
            { rule: value => value.length < 65535, message: "Description too long." }
        ],
        additional_info: [
            { rule: value => value.length < 65535, message: "Additional Info too long." }
        ],
    };

    const errors = {};
    for (const field in validationRules) {
        const fieldRules = validationRules[field];
        const fieldValue = data[field];

        fieldRules.forEach(({ rule, message }) => {
          const isValid = rule(fieldValue); 
          if (!isValid) {
            if (!errors[field]) errors[field] = [];
            errors[field].push(message);
          }
        });
    }
    return errors;
}

function getAllData() {
    const data = {};
    const fields = document.getElementsByClassName("password-data");
    for (const f of fields) {
        data[f.name] = f.value;
    }
    return data;
}

function SearchInPasswords(string) {
    for (let i = 0; i < passwords.length; i++) {
        if (passwords[i].application_name.toLowerCase() === string.toLowerCase()) return i;
    }
    return -1;
}

function WritePasswordData(index) {
    document.querySelectorAll('.password-data').forEach(element => {
        const name = element.name;
        if (passwords[index][name] !== undefined) {
            element.value = passwords[index][name];
        }
    });
}

async function CreatePassword() {
    const newPassword = getAllData();

    if (newPassword.application_name.length === 0 || newPassword.password.length === 0) {
        return false;
    }

    const response = await fetch('/password', {
        method: 'POST',
        body: JSON.stringify(newPassword),
        headers: {
            'Content-Type': 'application/json',
            'X-CSRF-TOKEN': CSRF_TOKEN,
            'Accept': 'application/json',
        }
    });

    const msg = await response.json();
    if (!response.ok || !msg.success) {
        return false;
    }
    return true;
}

async function UpdatePassword(id_password) {
    const toUpdate = {};
    const fields = document.getElementsByClassName("password-data");
    for (const f of fields) {
        toUpdate[f.name] = f.value;
    }

    if (toUpdate.application_name.length === 0 || toUpdate.password.length === 0) {
        return false;
    }

    const response = await fetch(`password/id/${id_password}`, {
        method: 'PUT',
        body: JSON.stringify(toUpdate),
        headers: {
            'Content-Type': 'application/json',
            'X-CSRF-TOKEN': CSRF_TOKEN,
            'Accept': 'application/json',
        }
    });

    const msg = await response.json();
    if (!response.ok || !msg.success) {
        return false;
    }
    return true;

}

async function DeletePassword(id_password) {
    const response = await fetch(`password/id/${id_password}`, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
            'X-CSRF-TOKEN': CSRF_TOKEN,
            'Accept': 'application/json',
        }
    });

    const msg = await response.json();
    if (!response.ok || !msg.success) {
        return false;
    }

    //remove app from options
    const parent = document.getElementById("applications");
    const deletedpassword = parent.querySelector(`option[value='${passwords[id_password].application_name}']`);
    parent.removeChild(deletedpassword);

    return true;
}
