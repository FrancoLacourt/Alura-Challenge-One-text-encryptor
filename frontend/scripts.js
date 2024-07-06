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

        if (/[A-Z]/.test(userText)) {
            alert("Text must not contain upper case.");
            return;
        }
        if (/[\u00C0-\u017F]/.test(userText)) {
            alert("Text must not contain accents.");
            return;
        }


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

        if (/[A-Z]/.test(userText)) {
            alert("Text must not contain upper case.");
            return;
        }
        if (/[\u00C0-\u017F]/.test(userText)) {
            alert("Text must not contain accents.");
            return;
        }


        userText = userText.toLowerCase();
        userText = userText.normalize('NFD').replace(/[\u0300-\u036f]/g, '').replace(/ñ/g, 'ñ');

        // Construir la expresión regular para buscar las palabras del diccionario de descifrado
        let regex = new RegExp(Object.keys(decryptReplacements).join('|'), 'g');

        let result = userText.replace(regex, match => decryptReplacements[match]);

        updateResultField(result);

    } else {
        alert("Text can't be null or empty!");
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
        showPopup("Text copied to clipboard!");
    }, function(err) {
        showPopup("Failed to copy text: " + err);
    });
}

function showPopup(message) {
    let popup = document.getElementById("popup");
    popup.textContent = message;
    popup.hidden = false;
    popup.classList.add("show");

    setTimeout(function() {
        popup.classList.remove("show");
        popup.hidden = true;
    }, 1000); // El mensaje desaparecerá después de 3 segundos
}
