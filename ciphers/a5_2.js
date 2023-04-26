let alfabet = "абвгдежзийклмнопрстуфхцчшщъыьэюя";

function keyToBits(key) {
    let keyArr = key.split("");
    let resKey = "";
    for (let i = 0; i < keyArr.length; i++) {
        resKey += transformToBits((alfabet.indexOf(keyArr[i])).toString(2));
    }
    return resKey;
} 

function transformToBits(simbol) {
    let resBit = simbol.split("");
    while (resBit.length < 5) {
        resBit.unshift("0");
    }
    return resBit.join("");
}

function transformBitResult(bin) {
    let result = bin.split("");
    while (result[0] == 0) {
        result.shift();
    }
    if (result.length == 0) {
        return 0;
    } else {
        return result.join("");

    }
}


function encryption() {
    let result = "";

    let originalText = document.querySelector('#originalText').value;
    originalText = textFormatting(originalText);

    let keySimbols = document.querySelector('#cipherKey').value;

    if ([...new Set(keySimbols)].join('') == "а") {
        alert("Данный ключ недопустим");
        return;
    }

    let keyInBits = keyToBits(keySimbols).toString();
    console.log(keyInBits + " ключ в биты");

    let bitStockText = keyToBits(originalText);
    console.log(bitStockText);
    let bitStockTextArray = bitStockText.match(/.{1,114}/g);
    console.log(bitStockTextArray);

    for (let kadr = 0; kadr < bitStockTextArray.length; kadr++) {
        let registr1 = new Array(19).fill(0);
        let registr2 = new Array(22).fill(0);
        let registr3 = new Array(23).fill(0);
        let registr4 = new Array(17).fill(0);

        for (let i = 0; i < 64; i++) {
            registr1[0] = (registr1[0] + parseInt(keyInBits[i % keyInBits.length])) % 2;
            registr1.unshift(registr1.pop());

            registr2[0] = (registr2[0] + parseInt(keyInBits[i % keyInBits.length])) % 2;
            registr2.unshift(registr2.pop());

            registr3[0] = (registr3[0] + parseInt(keyInBits[i % keyInBits.length])) % 2;
            registr3.unshift(registr3.pop());


            registr4[0] = (registr4[0] + parseInt(keyInBits[i % keyInBits.length])) % 2;
            registr4.unshift(registr4.pop());
        }

        for (let i = 0; i < 22; i++) {
            registr1[0] = (registr1[0] + kadr) % 2;
            registr1.unshift(registr1.pop());

            registr2[0] = (registr2[0] + kadr) % 2;
            registr2.unshift(registr2.pop());


            registr3[0] = (registr3[0] + kadr) % 2;
            registr3.unshift(registr3.pop());

            registr4[0] = (registr4[0] + kadr) % 2;
            registr4.unshift(registr4.pop());
        }

        registr4[3] = 1;
        registr4[7] = 1;
        registr4[10] = 1;

        for (let i = 0; i < 99; i++) {
            let F = (registr4[3] && registr4[7]) || (registr4[3] && registr4[10]) || (registr4[7] && registr4[10]);
            if (registr4[10] == F) {
                registr1.unshift(registr1.pop());
            }

            if (registr4[3] == F) {
                registr2.unshift(registr2.pop());
            }

            if (registr4[7] == F) {
                registr3.unshift(registr3.pop());
            }
            registr4[0] = (registr4[16] + registr4[11]) % 2;
            registr4.unshift(registr4.pop());
        }

        console.log(registr4);
        let tempResult = "";
        for (let i = 0; i < bitStockTextArray[kadr].length; i++) {
            let F1 = (registr1[12] && registr1[14]) || (registr1[12] && registr1[15]) || (registr1[14] && registr1[15]);

            let F2 = (registr2[9] && registr2[13]) || (registr2[9] && registr2[16]) || (registr2[13] && registr2[16]);

            let F3 = (registr3[13] && registr3[16]) || (registr3[13] && registr3[18]) || (registr3[16] && registr3[18]);

            let lastest = (((((registr1[18] + registr2[21]) % 2) + registr3[22]) % 2)) % 2;

            let outBit = (((((F1 + F2) % 2) + F3) % 2) + lastest) % 2;

            let resBit = (parseInt(bitStockTextArray[kadr][i]) + outBit) % 2;

            tempResult += resBit;

            registr1[0] = (((((registr1[18] + registr1[17]) % 2) + registr1[16]) % 2) + registr1[13]) % 2; 
            registr1.unshift(registr1.pop());

            registr2[0] = (registr2[21] + registr2[20]) % 2;
            registr2.unshift(registr2.pop());

            registr3[0] = ((((registr3[22] + registr3[21]) % 2 + registr3[20]) % 2) + registr3[7]) % 2;
            registr3.unshift(registr3.pop());

        }
        result += tempResult;
        console.log(tempResult);

    }

    let alfabetResult = "";
    let tempArray = result.match(/.{1,5}/g);
    for (let i = 0; i < tempArray.length; i++) {
        alfabetResult += alfabet[parseInt(transformBitResult(tempArray[i]) , 2)];
        if (alfabet[parseInt(transformBitResult(tempArray[i]) , 2)] == undefined) {
            console.log(tempArray[i]);
            console.log(parseInt(transformBitResult(tempArray[i]) , 2));
        }
    }
    console.log(alfabetResult);
    
    document.querySelector('#answerText').value = alfabetResult;
}

function decode() {
    let result = "";

    let encryptedText = document.querySelector('#encryptedText').value;
    
    let keySimbols = document.querySelector('#cipherKey').value;
    
    if ([...new Set(keySimbols)].join('') == "а") {
        alert("Данный ключ недопустим");
        return;
    }
    
    let keyInBits = keyToBits(keySimbols).toString();
    console.log(keyInBits + " ключ в биты");

    let bitStockText = keyToBits(encryptedText);
    console.log(bitStockText);
    let bitStockTextArray = bitStockText.match(/.{1,114}/g);
    console.log(bitStockTextArray);

    for (let kadr = 0; kadr < bitStockTextArray.length; kadr++) {
        let registr1 = new Array(19).fill(0);
        let registr2 = new Array(22).fill(0);
        let registr3 = new Array(23).fill(0);
        let registr4 = new Array(17).fill(0);

        for (let i = 0; i < 64; i++) {
            registr1[0] = (registr1[0] + parseInt(keyInBits[i % keyInBits.length])) % 2;
            registr1.unshift(registr1.pop());

            registr2[0] = (registr2[0] + parseInt(keyInBits[i % keyInBits.length])) % 2;
            registr2.unshift(registr2.pop());

            registr3[0] = (registr3[0] + parseInt(keyInBits[i % keyInBits.length])) % 2;
            registr3.unshift(registr3.pop());


            registr4[0] = (registr4[0] + parseInt(keyInBits[i % keyInBits.length])) % 2;
            registr4.unshift(registr4.pop());
        }

        for (let i = 0; i < 22; i++) {
            registr1[0] = (registr1[0] + kadr) % 2;
            registr1.unshift(registr1.pop());

            registr2[0] = (registr2[0] + kadr) % 2;
            registr2.unshift(registr2.pop());


            registr3[0] = (registr3[0] + kadr) % 2;
            registr3.unshift(registr3.pop());

            registr4[0] = (registr4[0] + kadr) % 2;
            registr4.unshift(registr4.pop());
        }

        registr4[3] = 1;
        registr4[7] = 1;
        registr4[10] = 1;

        for (let i = 0; i < 99; i++) {
            let F = (registr4[3] && registr4[7]) || (registr4[3] && registr4[10]) || (registr4[7] && registr4[10]);
            if (registr4[10] == F) {
                registr1.unshift(registr1.pop());
            }

            if (registr4[3] == F) {
                registr2.unshift(registr2.pop());
            }

            if (registr4[7] == F) {
                registr3.unshift(registr3.pop());
            }
            registr4[0] = (registr4[16] + registr4[11]) % 2;
            registr4.unshift(registr4.pop());
        }

        console.log(registr4);
        let tempResult = "";
        for (let i = 0; i < bitStockTextArray[kadr].length; i++) {
            let F1 = (registr1[12] && registr1[14]) || (registr1[12] && registr1[15]) || (registr1[14] && registr1[15]);

            let F2 = (registr2[9] && registr2[13]) || (registr2[9] && registr2[16]) || (registr2[13] && registr2[16]);

            let F3 = (registr3[13] && registr3[16]) || (registr3[13] && registr3[18]) || (registr3[16] && registr3[18]);

            let lastest = (((((registr1[18] + registr2[21]) % 2) + registr3[22]) % 2)) % 2;

            let outBit = (((((F1 + F2) % 2) + F3) % 2) + lastest) % 2;

            let resBit = (parseInt(bitStockTextArray[kadr][i]) + outBit) % 2;

            tempResult += resBit;

            registr1[0] = (((((registr1[18] + registr1[17]) % 2) + registr1[16]) % 2) + registr1[13]) % 2; 
            registr1.unshift(registr1.pop());

            registr2[0] = (registr2[21] + registr2[20]) % 2;
            registr2.unshift(registr2.pop());

            registr3[0] = ((((registr3[22] + registr3[21]) % 2 + registr3[20]) % 2) + registr3[7]) % 2;
            registr3.unshift(registr3.pop());

        }
        result += tempResult;
        console.log(tempResult);

    }

    let alfabetResult = "";
    let tempArray = result.match(/.{1,5}/g);
    for (let i = 0; i < tempArray.length; i++) {
        alfabetResult += alfabet[parseInt(transformBitResult(tempArray[i]) , 2)];
        if (alfabet[parseInt(transformBitResult(tempArray[i]) , 2)] == undefined) {
            console.log(tempArray[i]);
            console.log(parseInt(transformBitResult(tempArray[i]) , 2));
        }
    }
    console.log(alfabetResult);

    alfabetResult = textOfFormatting(alfabetResult);
    document.querySelector('#answerText').value = alfabetResult;  
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