let alfabet = "абвгдеёжзийклмнопрстуфхцчшщъыьэюя";

function gcd(a, b) {
    if (!b) {
        return a;
    }
    return gcd(b, a % b);
}

function coPrime(a, b){
    let check = 1;
    while (check !=0 ) {
        if(gcd(a,b) == 1) {
            check = 0;
        }
        else {
            return false;
        }
    }
    
    return true;
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

function encryption() {
    let originalText = document.querySelector('#originalText').value;
    originalText = textFormatting(originalText);

    let keyP = parseInt(document.getElementById('PKey').value);
    let keyG = parseInt(document.getElementById('GKey').value);
    let keyX = parseInt(document.getElementById('XKey').value);
    let keyK = parseInt(document.getElementById('KKey').value);

    if (!primeTest(keyP)) {
        alert("Ключ P должен быть простым числом");
        return;
    }

    if (keyG >= keyP) {
        alert("Ключ G должен быть меньше чем ключ P");
        return;
    }

    if (keyX <= 1 || keyX > (keyP - 1)) {
        alert("Секретный ключ X должен быть больше единицы и меньше или равно функции Эйлера от P");
        return;
    }

    if (keyK <= 1 || keyK >= (keyP - 1)) {
        alert("Ключ K должен быть больше единицы и меньше фукнции Эйлера от P");
    }

    if (!coPrime(keyK, keyP - 1)) {
        alert("Ключ K должен быть больше взаимно простым с фукнцией Эйлера от P");
    }

    let Y = Number(BigInt(keyG) ** BigInt(keyX) % BigInt(keyP));

    let H = 0;
    for (let i = 0; i < originalText.length; i++) {
        H = (alfabet.indexOf(originalText[i]) + 1 + H) ** 2 % keyP;
    }
    console.log(H);

    let A = Number(BigInt(keyG) ** BigInt(keyK) % BigInt(keyP));
    let B = 0;
    for (let i = 1; i < 100000; i++) {
        if ((keyK * i) % (keyP - 1) == (keyP - 1 + ((H - keyX * A) % (keyP - 1))) % (keyP - 1)) {
            B = i;
            break;
        }
    }

    document.querySelector('#YKey').value = Y;
    document.querySelector('#AKey').value = A;
    document.querySelector('#BKey').value = B;
    document.querySelector('#answerText').value = "Цифровая подпись - S = (" + A + ", " + B + ")";
}

function decode(){
    let originalText = document.querySelector('#originalText').value;
    originalText = textFormatting(originalText);

    let keyP = parseInt(document.getElementById('PKey').value);
    let keyG = parseInt(document.getElementById('GKey').value);
    let keyY = document.querySelector('#YKey').value;
    let keyA = document.querySelector('#AKey').value;
    let keyB = document.querySelector('#BKey').value;

    if (!primeTest(keyP)) {
        alert("Ключ P должен быть простым числом");
        return;
    }

    if (keyG >= keyP) {
        alert("Ключ G должен быть меньше чем ключ P");
        return;
    }

    let H = 0;
    for (let i = 0; i < originalText.length; i++) {
        H = (alfabet.indexOf(originalText[i]) + 1 + H) ** 2 % keyP;
    }

    let a1 = Number((BigInt(keyY) ** BigInt(keyA) * BigInt(keyA) ** BigInt(keyB)) % BigInt(keyP));
    let a2 = Number(BigInt(keyG) ** BigInt(H) % BigInt(keyP));

    let answerArea = document.getElementById("answerText");
    if (a1 == a2) {
        answerArea.value = "Подпись верна: a1 = " + a1 + " a2 = " + a2;
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