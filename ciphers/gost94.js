let alfabet = "абвгдежзийклмнопрстуфхцчшщъыьэюя";

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

function generateK() {
    let keyQ = parseInt(document.getElementById('QKey').value);

    if (!keyQ) {
        alert("Нет значения ключа Q");
        return;
    }
    result = generateRandom(0, keyQ - 1);

    document.getElementById("KKey").value = result;
}


function encryption() {
    let originalText = document.querySelector('#originalText').value;
    originalText = textFormatting(originalText);

    let keyP = parseInt(document.getElementById('PKey').value);
    let keyQ = parseInt(document.getElementById('QKey').value);
    let keyA = parseInt(document.getElementById('AKey').value);
    let keyX = parseInt(document.getElementById('XKey').value);
    let keyK = parseInt(document.getElementById('KKey').value);

    if (!primeTest(keyP)) {
        alert("Ключ P должен быть простым числом");
        return;
    }

    if (!primeTest(keyQ) || (keyP - 1) % keyQ != 0) {
        alert("Ключ Q должен быть простым сомножителем функции Эйлера от P");
        return;
    }

    if (keyA <= 1 || keyA >= keyP - 1 || Number((Bigint(keyA) ** Bigint(keyQ)) % BigInt(keyP)) != 1) {
        alert("Ключ A должен быть больше 1, меньше функции Эйлера от P и выполнять неравенство A^Q mod P = 1");
        return;
    }

    if (keyX >= keyQ) {
        alert("Ключ X должен быть меньше ключа Q");
        return;
    }

    if (!keyK) {
        alert("Введите или сгенерируйте ключ K");
        return;
    }

    if (keyK >= keyQ) {
        alert("Ключ K должен быть меньше ключа Q");
        return;
    }

    let H = 0;
    for (let i = 0; i < originalText.length; i++) {
        H = (alfabet.indexOf(originalText[i]) + 1 + H) ** 2 % (keyP * keyQ);
    }
    if ((H % keyQ) == 0) {
        H += 1;
    }

    let r = Number(((BigInt(keyA) ** BigInt(keyK)) % Bigint(keyP)) % keyQ);

    if (r == 0) {
        alert("r = 0, поэтому повторите попытку, изменив ключи");
        return;
    }

    let s = ((keyX * r + keyK * H) % keyQ);
    
    document.querySelector('#RKey').value = r;
    document.querySelector('#SKey').value = s;
    document.querySelector('#answerText').value = "Цифровая подпись - r = " + r + " s = " + s;
}

function decode() {
    let originalText = document.querySelector('#originalText').value;
    originalText = textFormatting(originalText);

    let r = document.querySelector('#RKey').value;
    let s = document.querySelector('#SKey').value;
    let keyP = parseInt(document.getElementById('PKey').value);
    let keyQ = parseInt(document.getElementById('QKey').value);
    let keyA = parseInt(document.getElementById('AKey').value);
    let keyX = parseInt(document.getElementById('XKey').value);

    if (!primeTest(keyP)) {
        alert("Ключ P должен быть простым числом");
        return;
    }

    if (!primeTest(keyQ) || (keyP - 1) % keyQ != 0) {
        alert("Ключ Q должен быть простым сомножителем функции Эйлера от P");
        return;
    }

    if (keyA <= 1 || keyA >= keyP - 1 || Number((Bigint(keyA) ** Bigint(keyQ)) % BigInt(keyP)) != 1) {
        alert("Ключ A должен быть больше 1, меньше функции Эйлера от P и выполнять неравенство A^Q mod P = 1");
        return;
    }

    if (keyX >= keyQ) {
        alert("Ключ X должен быть меньше ключа Q");
        return;
    }

    let H = 0;
    for (let i = 0; i < originalText.length; i++) {
        H = (alfabet.indexOf(originalText[i]) + 1 + H) ** 2 % (keyP * keyQ);
    }
    if ((H % keyQ) == 0) {
        H += 1;
    }

    let y = Number((BigInt(keyA) ** BigInt(keyX)) % Bigint(keyQ));

    let v = Number((BigInt(H) ** BigInt(keyQ - 2)) % Bigint(keyQ));

    let z1 = (s * v) % keyQ;
    let z2 = ((keyQ - r) * v) % keyQ;

    let u = Number((((BigInt(keyA) ** BigInt(z1)) * (BigInt(y) ** BigInt(z2))) % Bigint(keyP)) % Bigint(keyQ));
    
    let answerArea = document.getElementById("answerText");
    if (u == r) {
        answerArea.value = "Подпись верна: u = " + u + " r = " + r;
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
    document.querySelector("#generateKBtn").onclick = generateK;
}