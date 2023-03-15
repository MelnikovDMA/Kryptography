let alfabet = "абвгдежзийклмнопрстуфхцчшщъыьэюя";

function encryption() {
    let result = "";
    let originalText = document.querySelector('#originalText').value;
    originalText = textFormatting(originalText);
    while (originalText.length % 3 != 0) {
        originalText += "ф";
    }
    let numsOfOrigText = [];
    for (let i = 0; i < originalText.length; i++) {
        numsOfOrigText[i] = alfabet.indexOf(originalText[i]) + 1; 
    }
    
    let matrixObj = document.querySelectorAll('.key-matrix');
    let matrixKey = [];
    for (let i = 0; i < 3; i++) {
        matrixKey[i] = [];
        for (let j = 0; j < 3; j++) {
            matrixKey[i][j] = matrixObj[i * 3 + j].value;
        }
    }

    let determinant = matrixKey[0][0] * matrixKey[1][1] * matrixKey[2][2] + matrixKey[1][0] * matrixKey[2][1] * matrixKey[0][2] + matrixKey[2][0] * matrixKey[0][1] * matrixKey[1][2] - matrixKey[0][2] * matrixKey[1][1] * matrixKey[2][0] - matrixKey[1][2] * matrixKey[2][1] * matrixKey[0][0] - matrixKey[2][2] * matrixKey[0][1] * matrixKey[1][0];
    if (determinant == 0) {
        alert("Матрица не обратима, введите другую матрицу");
        return;
    }

    for (let i = 0; i < numsOfOrigText.length; i++) {
        result = result + (numsOfOrigText[i] * matrixKey[0][0] + numsOfOrigText[i + 1] * matrixKey[0][1] + numsOfOrigText[i + 2] * matrixKey[0][2]) + " ";
        result = result + (numsOfOrigText[i] * matrixKey[1][0] + numsOfOrigText[i + 1] * matrixKey[1][1] + numsOfOrigText[i + 2] * matrixKey[1][2]) + " ";
        result = result + (numsOfOrigText[i] * matrixKey[2][0] + numsOfOrigText[i + 1] * matrixKey[2][1] + numsOfOrigText[i + 2] * matrixKey[2][2]) + " ";
        i += 2;
    }
    
    
    document.querySelector('#answerText').value = result;
}

function decode() {
    let result = "";
    let encryptedText = document.querySelector('#encryptedText').value;
    encryptedText = encryptedText.trim().split(" ");
    let matrixObj = document.querySelectorAll('.key-matrix');
    let matrixKey = [];
    for (let i = 0; i < 3; i++) {
        matrixKey[i] = [];
        for (let j = 0; j < 3; j++) {
            matrixKey[i][j] = matrixObj[i * 3 + j].value;
        }
    }

    let determinant = matrixKey[0][0] * matrixKey[1][1] * matrixKey[2][2] + matrixKey[1][0] * matrixKey[2][1] * matrixKey[0][2] + matrixKey[2][0] * matrixKey[0][1] * matrixKey[1][2] - matrixKey[0][2] * matrixKey[1][1] * matrixKey[2][0] - matrixKey[1][2] * matrixKey[2][1] * matrixKey[0][0] - matrixKey[2][2] * matrixKey[0][1] * matrixKey[1][0];
    if (determinant == 0) {
        alert("Матрица не обратима, введите другую матрицу");
        return;
    }

    matrixTransp = []
    for (let i = 0; i < 3; i++) {
        matrixTransp[i] = []
        for(let j = 0; j < 3; j++) {
            matrixTransp[i][j] = matrixKey[j][i];
        }
    }

    let matrixObr = []
    for (let i = 0; i < 3; i++) {
        matrixObr[i] = [];
    }
    matrixObr[0][0] = (matrixTransp[1][1] * matrixTransp[2][2] - matrixTransp[1][2] * matrixTransp[2][1]) * Math.pow(-1, 2);
    matrixObr[0][1] = (matrixTransp[1][0] * matrixTransp[2][2] - matrixTransp[1][2] * matrixTransp[2][0]) * Math.pow(-1, 3);
    matrixObr[0][2] = (matrixTransp[1][0] * matrixTransp[2][1] - matrixTransp[1][1] * matrixTransp[2][0]) * Math.pow(-1, 4);
    matrixObr[1][0] = (matrixTransp[0][1] * matrixTransp[2][2] - matrixTransp[0][2] * matrixTransp[2][1]) * Math.pow(-1, 3);
    matrixObr[1][1] = (matrixTransp[0][0] * matrixTransp[2][2] - matrixTransp[0][2] * matrixTransp[2][0]) * Math.pow(-1, 4);
    matrixObr[1][2] = (matrixTransp[0][0] * matrixTransp[2][1] - matrixTransp[0][1] * matrixTransp[2][0]) * Math.pow(-1, 5);
    matrixObr[2][0] = (matrixTransp[0][1] * matrixTransp[1][2] - matrixTransp[0][2] * matrixTransp[1][1]) * Math.pow(-1, 4);
    matrixObr[2][1] = (matrixTransp[0][0] * matrixTransp[1][2] - matrixTransp[0][2] * matrixTransp[1][0]) * Math.pow(-1, 5);
    matrixObr[2][2] = (matrixTransp[0][0] * matrixTransp[1][1] - matrixTransp[0][1] * matrixTransp[1][0]) * Math.pow(-1, 6);
    
    decodeNumbers = []
    for (let i = 0; i < encryptedText.length; i++) {
        decodeNumbers[i] = (encryptedText[i] * matrixObr[0][0] + encryptedText[i + 1] * matrixObr[0][1] + encryptedText[i + 2] * matrixObr[0][2]) / determinant;
        decodeNumbers[i + 1] = (encryptedText[i] * matrixObr[1][0] + encryptedText[i + 1] * matrixObr[1][1] + encryptedText[i + 2] * matrixObr[1][2]) / determinant;
        decodeNumbers[i + 2] = (encryptedText[i] * matrixObr[2][0] + encryptedText[i + 1] * matrixObr[2][1] + encryptedText[i + 2] * matrixObr[2][2]) / determinant;
        i += 2;
    }
    
    for (let i = 0; i < decodeNumbers.length; i++) {
        result += alfabet[decodeNumbers[i] - 1]
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