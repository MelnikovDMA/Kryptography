let alfabet = "абвгдежзийклмнопрстуфхцчшщъыьэюя";
let square = []
for (let i = 0; i < alfabet.length; i++) {
    square[i] = [];
    for (let j = 0; j < alfabet.length; j++) {
            square[i][j] = alfabet[(i + j) % 32];
    }
}

function encryption() {
    let result = "";
    let key = document.querySelector('#cipherKey').value;
    let originalText = document.querySelector('#originalText').value;
    originalText = textFormatting(originalText);
    for (let i = 0; i < originalText.length; i++) {
        for (let j = 0; j < alfabet.length; j++) {
            if (originalText[i] == alfabet[j]) {
                for (let g = 0; g < alfabet.length; g++) {
                    if (alfabet[g] == key[i % key.length]) {
                        result += square[j][g];
                    }
                }
            }
        }
    }
    
    document.querySelector('#answerText').value = result;
}

function decode() {
    let result = "";
    let key = document.querySelector('#cipherKey').value;
    let encryptedText = document.querySelector('#encryptedText').value;
    for (let i = 0; i < encryptedText.length; i++) {
        for (let j = 0; j < alfabet.length; j++) {
            if (alfabet[j] == key[i % key.length]) {
                for (let g = 0; g < alfabet.length; g++) {
                    if (encryptedText[i] == square[j][g]) {
                        result += alfabet[g];
                    }
                }
            }
        }
    }

    result = textOfFormatting(result);
    document.querySelector('#answerText').value = result;  
}

function textFormatting(origText) {
    let formResult = "";
    origText = origText.toLowerCase();
    for (let i = 0; i < origText.length; i++) {
    if (origText[i] == " " && origText[i + 1] != "-") {
            formResult += "прб";
        }
        else if (origText[i] == '.') {
            formResult += "тчк";
            i++;
        }
        else if (origText[i] == ',') {
            formResult += "зпт";
            i++;
        }
        else if (origText[i] == '!') {
            formResult += "всз";
            i++;
        }
        else if (origText[i] == '?') {
            formResult += "впз";
            i++;
        }
        else if (origText[i] == ':') {
            formResult += "двт";
            i++;
        }
        else if (origText[i] == ';') {
            formResult += "тсз";
            i++;
        }
        else if (origText[i] == '-') {
            formResult += "дфс";
        }
        else if (origText[i] == ' ' && origText[i + 1] == "-") {
            formResult += "трэ";
            i += 2;
        }
        else {
            formResult += origText[i];
        }
    }

    return formResult;
}

function textOfFormatting(formText) {
    formResult = "";
    for (let i = 0; i < formText.length; i++) {
        if (formText[i] == "п" && formText[i + 1] == "р" && formText[i + 2] == 'б') {
            formResult += " ";
            i += 2;
        }
        else if (formText[i] == "т" && formText[i + 1] == "ч" && formText[i + 2] == 'к') {
            formResult += ". ";
            i += 2;
        }
        else if (formText[i] == "з" && formText[i + 1] == "п" && formText[i + 2] == 'т') {
            formResult += ", ";
            i += 2;
        }
        else if (formText[i] == "в" && formText[i + 1] == "с" && formText[i + 2] == 'з') {
            formResult += "! ";
            i += 2;            
        }
        else if (formText[i] == "в" && formText[i + 1] == "п" && formText[i + 2] == 'з') {
            formResult += "? ";
            i += 2;            
        }
        else if (formText[i] == "д" && formText[i + 1] == "в" && formText[i + 2] == 'т') {
            formResult += ": ";
            i += 2;            
        }
        else if (formText[i] == "т" && formText[i + 1] == "с" && formText[i + 2] == 'з') {
            formResult += "; ";
            i += 2;            
        }
        else if (formText[i] == "д" && formText[i + 1] == "ф" && formText[i + 2] == 'с') {
            formResult += "-";
            i += 2;
        }
        else if (formText[i] == "т" && formText[i + 1] == "р" && formText[i + 2] == 'э') {
            formResult += " - ";
            i += 2;
        }
        else {
            formResult += formText[i];
        }
    }
    
    let finalResult = "";
    for (let i = 0; i < formResult.length; i++) {
        if ((formResult[i - 2] == '.' || formResult[i - 2] == '!' || formResult[i - 2] == '?') || (i == 0)) {
            finalResult += formResult[i].toUpperCase();
        }
        else {
            finalResult += formResult[i];
        }
    }
    
    return finalResult;
}

window.onload = function () {
    document.querySelector('#encryptionBtn').onclick = encryption;
    document.querySelector('#decodeBtn').onclick = decode;
}