let alfabet = "абвгдежзийклмнопрстуфхцчшщъыьэюя";

function encryption() {
    let result = "";
    let originalText = document.querySelector('#originalText').value;
    let chbox = document.querySelector('#formatCheckbox');
    if (chbox.checked) {
		originalText = textFormatting(originalText);
	}
    let key = document.querySelector('#cipherKey').value;

    let matrix = new Array(Math.ceil(originalText.length / key.length));
    for (let i = 0; i < matrix.length; i++) {
        matrix[i] = new Array(key.length);
    }

    for (let i = 0; i < matrix.length; i++) {
        for (let j = 0; j < matrix[i].length; j++) {
            matrix[i][j] = originalText[i * matrix[i].length + j];
        }
    }

    let keyArr = [];
    for (let i = 0; i < key.length; i++) {
        keyArr.push(alfabet.indexOf(key[i]));
    }

    let resKeyArr = new Array(key.length);

    for (let i = 0; i < keyArr.length; i++) {
        resKeyArr[keyArr.indexOf(Math.min(...keyArr))] = i;
        keyArr[keyArr.indexOf(Math.min(...keyArr))] = Infinity;
    }

    for (let i = 0; i < resKeyArr.length; i++) {
        let jNum = resKeyArr.indexOf(Math.min(...resKeyArr));
        for (let i = 0; i < matrix.length; i++) {
            if (matrix[i][jNum] === undefined) {
                result += "";
            } else {
                result += matrix[i][jNum];
            }
        }
        resKeyArr[jNum] = Infinity;
    }

    document.querySelector('#answerText').value = result
}

function decode() {
    let result = "";
    let encryptedText = document.querySelector('#encryptedText').value;
    let key = document.querySelector('#cipherKey').value;

    let matrix = new Array(Math.ceil(encryptedText.length / key.length));
    for (let i = 0; i < matrix.length; i++) {
        matrix[i] = new Array(key.length);
    }

    for (let i = 0; i < matrix.length; i++) {
        for (let j = 0; j < matrix[i].length; j++) {
            matrix[i][j] = encryptedText[i * matrix[i].length + j];
        }
    }

    let keyArr = [];
    for (let i = 0; i < key.length; i++) {
        keyArr.push(alfabet.indexOf(key[i]));
    }

    let resKeyArr = new Array(key.length);

    for (let i = 0; i < keyArr.length; i++) {
        resKeyArr[keyArr.indexOf(Math.min(...keyArr))] = i;
        keyArr[keyArr.indexOf(Math.min(...keyArr))] = Infinity;
    }

    const fulljs = encryptedText.length % key.length;
    const notFulljs = key.length - fulljs;

    for (let i = 0; i < resKeyArr.length; i++) {
        if (resKeyArr.indexOf(Math.min(...resKeyArr)) > fulljs - 1) {
            let tempString = encryptedText.slice(0, matrix.length - 1);
            for (let j = 0; j < matrix.length - 1; j++) {
                matrix[j][resKeyArr.indexOf(Math.min(...resKeyArr))] = tempString[j];
            }
            //console.log(tempString);
            encryptedText = encryptedText.slice(matrix.length - 1, encryptedText.length);
            //console.log(resKeyArr.indexOf(Math.min(...resKeyArr)));
        } else {
            let tempString = encryptedText.slice(0, matrix.length);
            for (let j = 0; j < matrix.length; j++) {
                matrix[j][resKeyArr.indexOf(Math.min(...resKeyArr))] = tempString[j];
            }
            encryptedText = encryptedText.slice(matrix.length, encryptedText.length);
        }
        resKeyArr[resKeyArr.indexOf(Math.min(...resKeyArr))] = 100;
    }

    for (let i = 0; i < matrix.length; i++) {
        for (let j = 0; j < matrix[i].length; j++) {
            if (matrix[i][j] == undefined) continue;
            result += matrix[i][j];
        }
    }

    let chbox = document.querySelector('#formatCheckbox');
    if (chbox.checked) {
		result = textOfFormatting(result);
	}
    document.querySelector('#answerText').value = result
};

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