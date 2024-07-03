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

    userText = userText.toLowerCase();
    userText = userText.normalize('NFD').replace(/[\u0300-\u036f]/g, '').replace(/ñ/g, 'ñ');

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
        userText = userText.toLowerCase();
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
    let textResultField = document.getElementById("text__result");

    encryptedText.textContent = result;
    encryptedText.removeAttribute("hidden");

    copyButton.removeAttribute("disabled");
    copyButton.removeAttribute("hidden");

    notFoundMessage.hidden = true;
    image.hidden = true;
    actionText.hidden = true;

    /*
    width: 300px;
            height: 150px;
            border: 1px solid black;
            overflow: hidden; /* Prueba también con overflow: auto; 
            word-wrap: break-word;
            word-break: break-all;
    */

    textResultField.style.justifyContent = "space-between";
    encryptedText.style.overflow = "auto";
    encryptedText.style.padding = "2rem";
    encryptedText.style.width = "100%";
    encryptedText.style.wordBreak = "break-all";
    encryptedText.style.maxHeight = "40vh";
    copyButton.style.height = "4.1875rem";
    copyButton.style.marginBottom = "1.5rem";
}

function copyToClipboard() {
    let encryptedText = document.getElementById("encryptedText");
    let textToCopy = encryptedText.textContent;

    navigator.clipboard.writeText(textToCopy).then(function() {
        alert("Text copied to clipboard!");
    }, function(err) {
        alert("Failed to copy text: ", err);
    });
}
