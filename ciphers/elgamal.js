let alfabet = "абвгдеёжзийклмнопрстуфхцчшщъыьэюя";

function gcd(a, b) {
    if (!b) {
        return a;
    }
    return gcd(b, a % b);
}

function generateRandom(min = 0, max = 100) {
    // find diff
    let difference = max - min;

    // generate random number
    let rand = Math.random();

    // multiply with difference
    rand = Math.floor(rand * difference);

    // add with min value
    rand = rand + min;

    return rand;
}

function isCoPrime(k, f, random = false) {
    let check = 1;
    while (check != 0) {
        if (gcd(k, f) == 1) check = 0;
        else {
        alert("k[i] не взаимнопростой с Ф.Эйлера от числа P");
        return null;
        } 
    }
    return k;
}

function encryption() {
    let result = "";
    let originalText = document.querySelector('#originalText').value;
    let chbox = document.querySelector('#formatCheckbox');
    if (chbox.checked) {
		originalText = textFormatting(originalText);
	}

    let PKey = parseInt(document.getElementById("PKey").value);
    if (PKey < alfabet.length) {
        alert("p > Mi");
        return;
    }
    let XKey = parseInt(document.getElementById("XKey").value);
    if (!(1 < XKey && XKey < PKey)) {
        alert("1 < x < p");
        return;
    }

    let GKey = parseInt(document.getElementById("GKey").value);

    if (!(1 < GKey && GKey < PKey)) {
        alert("1 < g < p");
        return;
    }

    let KKey = document.getElementById("KKey").value.split(" ");
    for (let i = 0; i < KKey.length; i++) {
        if (KKey[i] == "") {
            KKey.pop();
        } else {
            KKey[i] = parseInt(KKey[i]);

        }
    }
    if (KKey.length != originalText.length) {
        alert("Длина K должна совпадать с длиной открытого текста");
        return;
    }

    let y = Number(BigInt(GKey) ** BigInt(XKey) % BigInt(PKey));
    let f = PKey - 1;

    for (let i = 0; i < originalText.length; i++) {
        let k = KKey[i];

        if (isCoPrime(k, f) == null) {
            break;
        } else {
            k = isCoPrime(k, f);
        }
    
        let a = String(Number(BigInt(GKey) ** BigInt(k) % BigInt(PKey)));
        let b = String(Number((BigInt(y) ** BigInt(k) * BigInt(alfabet.indexOf(originalText[i]))) % BigInt(PKey)));

        if (a.length == 1) {
            a = "0" + a;
        }

        if (b.length == 1) {
            b = "0" + b;
        }

        if (i != originalText.length-1) {
            result = result + a.toString() + b.toString() + " ";
        } else {
            result = result + a.toString() + b.toString();
        } 
    }
    
    document.querySelector('#answerText').value = result;
}

function decode(){
    let PKey = parseInt(document.getElementById("PKey").value);
    let XKey = parseInt(document.getElementById("XKey").value);
    let encryptedText = document.querySelector('#encryptedText').value

    let result = "";

    let enTextArr = encryptedText.split(" ");
    for (let i = 0; i < enTextArr.length; i++) {
        enTextArr[i] = enTextArr[i].match(/.{1,2}/g);
    }

    for (let i = 0; i < enTextArr.length; i++) {
        let a = enTextArr[i][0];
        let b = enTextArr[i][1];      
        for (let j = 0; j < alfabet.length; j++) {
            if (Number(((BigInt(a) ** BigInt(XKey)) * BigInt(j)) % BigInt(PKey)) == (b % PKey)) {
                result += alfabet[j];
                console.log(j);
            }
        }
    }

    let chbox = document.querySelector('#formatCheckbox');
    if (chbox.checked) {
		result = textOfFormatting(result);
	}
    document.querySelector('#answerText').value = result;
}

function generateK() {
    let fi = parseInt(document.getElementById("PKey").value) - 1;
    let result = "";
    let originalText = document.querySelector('#originalText').value;
    originalText = textFormatting(originalText);

    let temp = 0;

    for (let i = 0; i < originalText.length; i++) {
        temp = generateRandom(0, fi);
        while ((gcd(temp, fi) != 1)){
            temp = generateRandom(0, fi)
        }
        result += temp + " ";
    }

    result = result.substring(0, result.length - 1);

    document.getElementById("KKey").value = result;
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
    document.querySelector("#generateKBtn").onclick = generateK;
}

//яоткрылглазапосмотрелнамирчутьнеослепдаизакрылглаза