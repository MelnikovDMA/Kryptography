let alfabet = "абвгдежзийклмнопрстуфхцчшщъыьэюя";

function gcd(a,b) {
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

function cryp_elm(pr, p, g = 5, y = 31, f = 46, kArr) {
  let n = pr.length;
  let cryp_text = "";

  for (let i = 0; i < n; i++) {
    let k = kArr[i];

    if (isCoPrime(k, f) == null) {
        break
    } else {
        k = isCoPrime(k, f);

    }
    let a = g ** k % p;
    let b = (y ** k * alfabet.indexOf(pr[i])) % p;

    a = String(a);
    if (a.length == 1) {
        a = "0" + a;
    }

    b = String(b);
    if (b.length == 1) {
        b = "0" + b;
    }

    if (i != n-1) {
        cryp_text = cryp_text + a.toString() + b.toString() + " ";
    } else {
        cryp_text = cryp_text + a.toString() + b.toString();
    }
    
  }

  return cryp_text;
}

function encryption() {
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

    let originalText = document.querySelector('#originalText').value;
    originalText = textFormatting(originalText);

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

    let y = GKey ** XKey % PKey;
    let f = PKey - 1;
    
    document.querySelector('#answerText').value = cryp_elm(originalText, PKey, GKey, y, f, KKey);
    // 3117 2327 1137 3115 2322 1141 3113 2328 1137 313 2327 1137 3122 234 115 3131 2327 1135 3111 2346 115 318 2346 110 3115 2327 1120 3112 2335 110 3112 2327 115 3136 2323 1137 3122 234 1145 3112 2327 1131 3117 
}

function dec_elm(enText, x, p) {
    let decryp_text = "";
  
    let enTextArr = enText.split(" ");
    for (let i = 0; i < enTextArr.length; i++) {
        enTextArr[i] = enTextArr[i].match(/.{1,2}/g);
    }
    console.log(enTextArr + "bababuy");

    for (let i = 0; i < enTextArr.length; i++) {
        let a = enTextArr[i][0];
        let b = enTextArr[i][1];      
        for (let j = 0; j < alfabet.length; j++) {
            console.log((((a ** x) * i) % p) + "  " + (b % p));
            if (((a ** x) * j) % p === (b % p)) {
                decryp_text += alfabet[j];

            }
        }
    }

    console.log(decryp_text);
  
    return decryp_text;
}

function decode(){
    let PKey = parseInt(document.getElementById("PKey").value);
    let XKey = parseInt(document.getElementById("XKey").value);
    let GKey = parseInt(document.getElementById("GKey").value);

    let encryptedText = document.querySelector('#encryptedText').value

    let y = GKey ** XKey % PKey;
    let f = PKey - 1;

    let result = dec_elm(encryptedText, XKey, PKey);
    document.querySelector('#answerText').value = textOfFormatting(result)
}

function generateK() {
    let f = parseInt(document.getElementById("PKey").value) - 1;
    let KKey = document.getElementById("KKey");
    let k = "";
    let originalText = document.querySelector('#originalText').value;
    originalText = textFormatting(originalText);

    let temp = 0;

    for (let i = 0; i < originalText.length; i++) {
        temp = generateRandom(0, f);
        while ((gcd(temp, f) != 1)){
            temp = generateRandom(0, f)
            console.log(temp + " " + f + "--" + gcd(temp, f) + "-gcd");
        }
        k += temp + " ";
        console.log(k + "-123422131");
    }

    k = k.substring(0, k.length - 1);

    KKey.value = k;
    
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