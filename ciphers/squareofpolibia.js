let alfabet = "абвгдежзийклмнопрстуфхцчшщъыьэюя";
let n = 6;
let square = []
for (let i = 0; i < n; i++) {
    square[i] = [];
    for (let j = 0; j < n; j++) {
        if ((i * n + j) >= alfabet.length) {
            square[i][j] = '';
        }
        else {
            square[i][j] = alfabet[i * n + j];
        }
    }
}

function encryption() {
    let result = "";
    let originalText = document.querySelector('#originalText').value;
    let chbox = document.querySelector('#formatCheckbox');
    if (chbox.checked) {
		originalText = textFormatting(originalText);
	}
    
    for (let g = 0; g < originalText.length; g++) {
        for (let i = 0; i < n; i++) {
            for (let j = 0; j < n; j++) {
                if (originalText[g] == square[i][j]) {
                    result += String(i + 1) + String(j + 1) + " ";
                }
            }
        }
    }
    
    document.querySelector('#answerText').value = result;
}

function decode() {
    let result = "";
    let encryptedText = document.querySelector('#encryptedText').value;
    encryptedText = encryptedText.split(' ');
    if (encryptedText[encryptedText.length - 1] == '') {
        encryptedText.pop();
    }
    for (let g = 0; g < encryptedText.length; g++) {
        let i = Number(encryptedText[g][0]);
        let j = Number(encryptedText[g][1]);
        result += square[i - 1][j - 1];
    }

    let chbox = document.querySelector('#formatCheckbox');
    if (chbox.checked) {
		result = textOfFormatting(result);
	}
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