let userText;

let encryptReplacements = {
    "e":"enter",
    "i":"imes",
    "a":"ai",
    "o":"ober",
    "u":"ufat"
};

function encryptText () {

    userText = document.getElementById("userText").value;

    if (userText.trim() !== "") {

    userText.toLowerCase();
    userText.normalize('NFD').replace(/[\u0300-\u036f]/g, '').replace(/ñ/g, 'ñ');

    let result = "";

    for (let i = 0; i < userText.length; i++) {

        let character = userText[i];
        result += encryptReplacements[character] || character;
    }

    updateResultField(result);

    } else {
        alert("Text can't be null or empty!");
    }
}

let decryptReplacements = {
    "enter":"e",
    "imes":"i",
    "ai":"a",
    "ober":"o",
    "ufat":"u"
};

function decryptText() {
    userText = document.getElementById("userText").value;

    if (userText.trim() !== "") {
        userText.toLowerCase();
        userText = userText.normalize('NFD').replace(/[\u0300-\u036f]/g, '').replace(/ñ/g, 'ñ');

        // Construir la expresión regular para buscar las palabras del diccionario de descifrado
        let regex = new RegExp(Object.keys(decryptReplacements).join('|'), 'g');

        let result = userText.replace(regex, match => decryptReplacements[match]);

        updateResultField(result);

    } else {
        alert("El texto no puede estar vacío!");
    }
}

function updateResultField(result) {
    let copyButton = document.getElementById("copy");
    let encryptedText = document.getElementById("encryptedText");
    let notFoundMessage = document.getElementById("notFound");
    let image = document.getElementById("image");
    let actionText = document.getElementById("action");

    encryptedText.textContent = result;
    encryptedText.removeAttribute("hidden");

    copyButton.removeAttribute("disabled");
    copyButton.removeAttribute("hidden");

    notFoundMessage.hidden = true;
    image.hidden = true;
    actionText.hidden = true;
}
