let alfabet = "абвгдежзийклмнопрстуфхцчшщъыьэюя";

function encryption() {
    let result = "";
    let originalText = document.querySelector('#originalText').value;
    originalText = textFormatting(originalText);

    let aKey = parseInt(document.getElementById('aKey').value);
    let cKey = parseInt(document.getElementById('cKey').value);
    let ToKey = parseInt(document.getElementById('ToKey').value);

    if (cKey % 2 == 0 || cKey > 32) {
        alert("Ключ c должен быть нечетным не больше мощности алфавита");
        return;
    }

    if (aKey % 4 != 1 || aKey == 1) {
        alert("Ключ а mod 4 должен быть равен 1 и ключ не должен быть равен 1");
        return;
    }

    if (ToKey > (32 - 1)) {
        alert("To должно быть больще модуля -1");
        return;
    }

    let tValue = ToKey;
    for (let i = 0; i < originalText.length; i++) {
        res = ((aKey * tValue + cKey) % 32 + (alfabet.indexOf(originalText[i]) + 1)) % 32;
        tValue = (aKey * tValue + cKey) % 32;
        result = result + res + " ";
    } 

    document.querySelector('#answerText').value = result
}

function decode() {
    let result = "";
    let encryptedText = document.querySelector('#encryptedText').value;
    encryptedText = encryptedText.split(' ');
    if (encryptedText[encryptedText.length - 1] == '') {
        encryptedText.pop();
    }
    
    let aKey = parseInt(document.getElementById('aKey').value);
    let cKey = parseInt(document.getElementById('cKey').value);
    let ToKey = parseInt(document.getElementById('ToKey').value);

    if (cKey % 2 == 0 || cKey > 32) {
        alert("Ключ c должен быть нечетным не больше мощности алфавита");
        return;
    }

    if (aKey % 4 != 1 || aKey == 1) {
        alert("Ключ а mod 4 должен быть равен 1 и ключ не должен быть равен 1");
        return;
    }

    if (ToKey > (32 - 1)) {
        alert("To должно быть больще модуля -1");
        return;
    }

    let tValue = ToKey;
    for (let i = 0; i < encryptedText.length; i++) {
        res = encryptedText[i] - ((aKey * tValue + cKey) % 32)
        while (res <= 1) {
            res += 32
        }      

        tValue = (aKey * tValue + cKey) % 32;

        if (res > 32) {
            res -= 32;
        } 
        result += alfabet[res - 1]
    }

    result = textOfFormatting(result);
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