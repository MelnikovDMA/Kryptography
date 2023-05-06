let alfabet = "абвгдежзийклмнопрстуфхцчшщъыьэюя";

function gcd(a, b) {
    if (!b) {
        return a;
    }
    return gcd(b, a % b);
}

function coPrimeEandF(e, f){
    let check = 1;
    while (check !=0 ) {
        if(gcd(e,f) == 1) {
            check = 0;
            //('Числа ', e, 'и', f, ' взаимно простые')
        }
        else {
            return false;
        }
    }
    
    return true;
}

function testPandQ(num) {
    for (let i = 2; i < num/2; i++) {
        if (num % 2 == 0) {
            return 0;
        }
    }
}

function crypRsa(pr, n, e){
    let crypText = "";
    for (let i of pr) {
        crypText += (((alfabet.indexOf(i) + 1) ** e) % n + " ");
    }
    return crypText;
}

function encryption() {
    let originalText = document.querySelector('#originalText').value;
    originalText = textFormatting(originalText);

    let keyP = parseInt(document.getElementById('PKey').value);
    let keyQ = parseInt(document.getElementById('QKey').value);
    let keyE = parseInt(document.getElementById('EKey').value);

    if (testPandQ(keyP) == 0 ||  testPandQ(keyQ) == 0) {
        alert('Число P или Q не простое.');
        return;
    }
    

    let N = keyP * keyQ;
    console.log(N);

    let F = (keyP - 1) * (keyQ - 1);

    if(!coPrimeEandF(keyE, F)) {
        alert('Числа E и F Не взаимно простые');
        return;
    }

    let result = crypRsa(originalText, N, keyE);
    console.log(result);

    document.querySelector('#answerText').value = result;
}

function dec_rsa(text, n, e, f){
    splitText = text.split(" ");
    console.log(splitText);
    let textLen = splitText.length;
    let result = "";
    let d = 0;
    for (let i = 0; i < 100000; i++) {
        if (i * e % f == 1) {
            d = i;
            break;
        }

    }


    for (let i = 0; i < textLen; i++) {
        if (alfabet[(parseInt(splitText[i]) ** d) % n - 1] != undefined) {
            result += alfabet[(parseInt(splitText[i]) ** d) % n - 1];
            console.log(d);
        }
    }

    return result;
}

function decode() {
    let encryptedText = document.querySelector('#encryptedText').value;
    
    let keyP = parseInt(document.getElementById('PKey').value);
    let keyQ = parseInt(document.getElementById('QKey').value);
    let keyE = parseInt(document.getElementById('EKey').value);

    testPandQ(keyP);
    testPandQ(keyQ);

    let N = keyP * keyQ;
    console.log(N);

    let F = (keyP - 1) * (keyQ - 1);

    coPrimeEandF(keyE, F);

    let result = dec_rsa(encryptedText, N, keyE, F);
    console.log(result);   

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