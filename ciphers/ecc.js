let alfabet = "абвгдеёжзийклмнопрстуфхцчшщъыьэюя";

function phi(n) {
    let result = n;
    for (let i = 2; i * i <= n; ++i)
        if (n % i == 0) {
            while (n % i == 0) {
                n /= i;
            }
            result -= result / i;
        }
    if (n > 1) {
        result -= result / n;
    }
    return result;
}

function fracDivided(divisibleTop, divisibleBot, keyP) {
    let result = Number((BigInt(keyP) + ((BigInt(divisibleTop) * BigInt(divisibleBot) ** BigInt(phi(keyP) - 1)) % BigInt(keyP))) % BigInt(keyP));

    return result;
}

function dotAdding(x1, y1, x2, y2, keyP) {
    if (x1 === x2) {
        return [0, 0];
    }

    let P = keyP;
    let gamma = fracDivided(y2 - y1, x2 - x1, P);
    let x3 = (keyP + ((gamma ** 2 - x1 - x2) % keyP)) % keyP;
    let y3 = (keyP + ((gamma * (x1 - x3) - y1) % keyP)) % keyP;

    return [parseInt(x3), parseInt(y3)];
}

function dotDoubler(x1, y1, keyP, keyA = 1) {
    if (y1 == 0) return [0, 0];
    
    let P = keyP;
    let gamma = fracDivided(3 * x1 ** 2 + keyA, 2 * y1, P);
    let x3 = (keyP + ((gamma ** 2 - 2 * x1) % keyP)) % keyP;
    let y3 = (keyP + ((gamma * (x1 - x3) - y1) % keyP)) % keyP;

    return [parseInt(x3), parseInt(y3)];
}

function encryption() {
    let originalText = document.querySelector('#originalText').value;
    originalText = textFormatting(originalText);

    let keyP = parseInt(document.getElementById('PKey').value);
    let keyA = parseInt(document.getElementById('AKey').value);
    let keyC = parseInt(document.getElementById('CKey').value);
    let dotX = parseInt(document.getElementById('dotX').value);
    let dotY = parseInt(document.getElementById('dotY').value);

    resD = [0, 0];
    resR = [0, 0];

    let paramK = [];
    let result = [];
    for (let i = 0; i < originalText.length; i++) {
        paramK.push(4);
    }
    //console.log(paramK);

    for (let j = 0; j < paramK.length; j++) {
        let R = [0, 0];
        if (paramK[j] > 1) {
            let doubleDot = dotDoubler(dotX, dotY, keyP, keyA);
            let resX = doubleDot[0];
            let resY = doubleDot[1];
            for (let i = 0; i < paramK[j] - 2; i++) {
                let addedDot = dotAdding(resX, resY, dotX, dotY, keyP);
                if (!(addedDot[0] == 0 && addedDot[1] == 0)) {
                    resX = addedDot[0];
                    resY = addedDot[1];
                } else {
                    break;
                }
            }
            R = [resX, resY];
        } else {
            R = [dotX, dotY];
        }

        let D = [0, 0];
        if (keyC > 1) {
            let doubleDot = dotDoubler(dotX, dotY, keyP, keyA);
            console.log(doubleDot);
            let resX = doubleDot[0];
            let resY = doubleDot[1];
            for (let i = 0; i < keyC - 2; i++) {
                let addedDot = dotAdding(resX, resY, dotX, dotY, keyP);
                console.log(addedDot);
                if (!(addedDot[0] == 0 && addedDot[1] == 0)) {
                    resX = addedDot[0];
                    resY = addedDot[1];
                } else {
                    break;
                }
            }
            D = [resX, resY];
        } else {
            D = [dotX, dotY];
        }

        let P = [0, 0];
        if (paramK[j] > 1) {
            let doubleDot = dotDoubler(D[0], D[1], keyP, keyA);
            let resX = doubleDot[0];
            let resY = doubleDot[1];
            for (let i = 0; i < paramK[j] - 2; i++) {
                let addedDot = dotAdding(resX, resY, D[0], D[1], keyP);
                //console.log(addedDot);
                if (!(addedDot[0] == 0 && addedDot[1] == 0)) {
                    resX = addedDot[0];
                    resY = addedDot[1];
                } else {
                    break;
                }
            }
            P = [resX, resY];
        } else {
            P = [D[0], D[1]];
        }
        //console.log("R = ", R);
        //console.log("D = ", D);
        resD = D;
        resR = R;

        let alphaNumber = alfabet.indexOf(originalText[j]);
        let e = (alphaNumber * P[0]) % keyP;
        result.push([R, e]);
        //console.log(result);
    }
    let cypherText = "";
    for (let res of result) {
        cypherText += String(res[1]) + " ";
    }
    
    document.querySelector('#answerText').value = "D = " + resD[0] + ", " + resD[1] + ";    R = " + resR[0] + ", " + resR[1] + ";      " + cypherText;
    document.querySelector('#dotRX').value = resR[0];
    document.querySelector('#dotRY').value = resR[1];
}

function decode() {    
    let encryptedText = document.querySelector('#encryptedText').value;

    let keyP = parseInt(document.getElementById('PKey').value);
    let keyA = parseInt(document.getElementById('AKey').value);
    let keyC = parseInt(document.getElementById('CKey').value);
    let dotRx = parseInt(document.getElementById('dotRX').value);
    let dotRy = parseInt(document.getElementById('dotRY').value);

    let arrE = encryptedText.split(" ");
    let crypted_array = [];
    for (let i = 0; i < arrE.length; i++) {
        let R = [dotRx, dotRy];
        let e = parseInt(arrE[i]);
        crypted_array.push([R, e]);
    }
    let result = "";
    let resQ = [0, 0];
    console.log(crypted_array);
    for (let j = 0; j < arrE.length; j++) {
        let Q = [0, 0];
        if (keyC > 1) {
            let doubleDot = dotDoubler(crypted_array[j][0][0], crypted_array[j][0][1], keyP, keyA);
            //console.log(doubleDot);
            let resultX = doubleDot[0];
            let resultY = doubleDot[1];
            for (let i = 0; i < keyC - 2; i++) {
                let addedDot = dotAdding(resultX, resultY, crypted_array[j][0][0], crypted_array[j][0][1], keyP,
                );
                if (!(addedDot[0] === 0 && addedDot[1] === 0)) {
                    resultX = addedDot[0];
                    resultY = addedDot[1];
                } else {
                    break;
                }
            }
            Q = [resultX, resultY];
            //console.log(Q);
        } else {
            Q = [crypted_array[j][0][0], crypted_array[j][0][1]];
        }
        resQ = Q;
        result += alfabet[fracDivided(crypted_array[j][1], Q[0], keyP) % 33];
        //result += alfabet[Number(miniRes)];
    }
    console.log(`Q = ${resQ}`);

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

//ктослишкомторопитсязптзастреваетподорогетчк
