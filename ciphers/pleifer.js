let alfabet = "абвгдежзиклмнопрстуфхцчшщыьэюя";

function encryption() {
    let result = "";
    let key = document.querySelector('#cipherKey').value;

    let doubleLetter = [...new Set(key)];
    if (doubleLetter.length != key.length) {
        alert("Введите ключ с неповоряющимися буквами");
        return;
    } 

    let stroka = key;
    for(let i = 0; i < alfabet.length; i++) {
        if (!stroka.includes(alfabet[i])) {
            stroka+= alfabet[i]
        }
    }

    let matrix = [];
    for (let i = 0; i < 5; i++) {
        matrix[i] = [];
        for (let j = 0; j < 6; j++) {
            matrix[i][j] = stroka[i * 6 + j]
        }
    }

    let originalText = document.querySelector('#originalText').value;
    originalText = textFormatting(originalText);
    
    // for (let i = 0; i < originalText.length; i+=2) {
    //     if (originalText[i] == originalText[i + 1]) {

    //     }
    // }
    
    if (originalText.length % 2 != 0) {
        originalText += "ф"
    }


    for (let g = 0; g < originalText.length - 1; g += 2) {
        let firstLetter;
        let secondLetter;
        for (let i = 0; i < matrix.length; i++) {
            for (let j = 0; j < matrix[i].length; j++) {
                if (matrix[i][j] == originalText[g]) {
                    firstLetter = [i, j]
                }
                if (matrix[i][j] == originalText[g + 1]) {
                    secondLetter = [i, j]
                }
            }
        }

        if (firstLetter[0] == secondLetter[0]) {
            firstLetter[1] = (firstLetter[1] + 1) % 6;
            secondLetter[1] = (secondLetter[1] + 1) % 6;
            result += matrix[firstLetter[0]][firstLetter[1]];
            result += matrix[secondLetter[0]][secondLetter[1]];
        } else if (firstLetter[1] == secondLetter[1]) {
            firstLetter[0] = (firstLetter[0] + 1) % 5;
            secondLetter[0] = (secondLetter[0] + 1) % 5;
            result += matrix[firstLetter[0]][firstLetter[1]];
            result += matrix[secondLetter[0]][secondLetter[1]];
        } else {
            let letterOne = firstLetter[1];

            firstLetter[1] = secondLetter[1];
            secondLetter[1] = letterOne;
            result += matrix[firstLetter[0]][firstLetter[1]];
            result += matrix[secondLetter[0]][secondLetter[1]];
        }
    }

    document.querySelector('#answerText').value = result;

}




function decode() {
    let result = "";
    let key = document.querySelector('#cipherKey').value;

    let stroka = key;
    for(let i = 0; i < alfabet.length; i++) {
        if (!stroka.includes(alfabet[i])) {
            stroka+= alfabet[i]
        }
    }

    let matrix = [];
    for (let i = 0; i < 5; i++) {
        matrix[i] = [];
        for (let j = 0; j < 6; j++) {
            matrix[i][j] = stroka[i * 6 + j]
        }
    }

    let encryptedText = document.querySelector('#encryptedText').value;
    encryptedText = textFormatting(encryptedText);
    if (encryptedText.length % 2 != 0) {
        encryptedText += "ф"
    }

    for (let g = 0; g < encryptedText.length - 1; g += 2) {
        let firstLetter;
        let secondLetter;
        for (let i = 0; i < matrix.length; i++) {
            for (let j = 0; j < matrix[i].length; j++) {
                if (matrix[i][j] == encryptedText[g]) {
                    firstLetter = [i, j]
                }
                if (matrix[i][j] == encryptedText[g + 1]) {
                    secondLetter = [i, j]
                }
            }
        }

        if (firstLetter[0] == secondLetter[0]) {
            firstLetter[1] = (firstLetter[1] + 5) % 6;
            secondLetter[1] = (secondLetter[1] + 5) % 6;
            result += matrix[firstLetter[0]][firstLetter[1]];
            result += matrix[secondLetter[0]][secondLetter[1]];
        } else if (firstLetter[1] == secondLetter[1]) {
            firstLetter[0] = (firstLetter[0] + 4) % 5;
            secondLetter[0] = (secondLetter[0] + 4) % 5;
            result += matrix[firstLetter[0]][firstLetter[1]];
            result += matrix[secondLetter[0]][secondLetter[1]];
        } else {
            let letterOne = firstLetter[1];

            firstLetter[1] = secondLetter[1];
            secondLetter[1] = letterOne;
            result += matrix[firstLetter[0]][firstLetter[1]];
            result += matrix[secondLetter[0]][secondLetter[1]];
        }
    }

    document.querySelector('#answerText').value = result
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