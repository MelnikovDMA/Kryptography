let alfabet = "абвгдежзийклмнопрстуфхцчшщъыьэюя";

function gcd(a, b) {
    if (!b) {
        return a;
    }
    return gcd(b, a % b);
}

function primeTest(n) {
    if (n == 1)  {
        return false;
    } else if (n == 2)  {
        return true;
    } else {
        for(let i = 2; i < n; i++)  {
            if (n % i == 0) {
                return false;
            }
        }
        return true;  
    }
}

function coPrimeEandF(e, f){
    let check = 1;
    while (check !=0 ) {
        if(gcd(e,f) == 1) {
            check = 0;
        }
        else {
            return false;
        }
    }
    
    return true;
}

function encryption() {
    let originalText = document.querySelector('#originalText').value;
    originalText = textFormatting(originalText);

    let keyP = parseInt(document.getElementById('PKey').value);
    let keyQ = parseInt(document.getElementById('QKey').value);
    let keyE = parseInt(document.getElementById('EKey').value);

    if (!primeTest(keyP)) {
        alert("Ключ P должен быть простым числом");
        return;
    }

    if (!primeTest(keyQ)) {
        alert("Ключ Q должен быть простым числом");
        re=turn;
    }

    let N = keyP * keyQ;
    let F = (keyP - 1) * (keyQ - 1);

    if (keyE <= 1 || keyE >= F) {
        alert("Ключ К должен быть числом, которое больше 1 и меньше функции Эйлера");
        return;
    }
    if (!coPrimeEandF(keyE, F)) {
        alert("Числа E и F Не взаимно простые");
        return;
    }

    let D = 0;
    for (let i = 0; i < 1000000; i++) {
        if ((i * keyE) % F == 1) {
            D = i;
            break;
        }
    }

    let H = 0;
    for (let i = 0; i < originalText.length; i++) {
        H = (alfabet.indexOf(originalText[i]) + 1 + H) ** 2 % N;
    }
  
    let S = Number(BigInt(H) ** BigInt(D) % BigInt(N));

    document.querySelector('#SKey').value = S;
    document.querySelector('#answerText').value = "Цифровая подпись - S = " + S;
}

function decode() {
    let originalText = document.querySelector('#originalText').value;
    originalText = textFormatting(originalText);

    let S = parseInt(document.querySelector('#SKey').value);  
    let keyP = parseInt(document.getElementById('PKey').value);
    let keyQ = parseInt(document.getElementById('QKey').value);
    let keyE = parseInt(document.getElementById('EKey').value);

    if (!primeTest(keyP)) {
        alert("Ключ P должен быть простым числом");
        return;
    }

    if (!primeTest(keyQ)) {
        alert("Ключ Q должен быть простым числом");
        re=turn;
    }

    let N = keyP * keyQ;
    let F = (keyP - 1) * (keyQ - 1);

    if (keyE <= 1 || keyE >= F) {
        alert("Ключ К должен быть числом, которое больше 1 и меньше функции Эйлера");
        return;
    }
    if (!coPrimeEandF(keyE, F)) {
        alert("Числа E и F Не взаимно простые");
        return;
    }

    let H = 0;
    for (let i = 0; i < originalText.length; i++) {
        H = (alfabet.indexOf(originalText[i]) + 1 + H) ** 2 % N;
    }

    let M = Number(BigInt(S) ** BigInt(keyE) % BigInt(N));

    let answerArea = document.getElementById("answerText");
    if (M == H) {
        answerArea.value = "Подпись верна: m = " + M + " h = " + H;
    } else {
        answerArea.value = "Подпись неверна";
    }
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

window.onload = function () {
    document.querySelector('#encryptionBtn').onclick = encryption;
    document.querySelector('#decodeBtn').onclick = decode;
}