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

    let bitStockText = keyToBits(originalText);
    console.log(bitStockText);

    let bitStockTextArray = bitStockText.match(/.{1,114}/g);
    console.log(bitStockTextArray);

    for (let kadr = 0; kadr < bitStockTextArray.length; kadr++) {
        let registr1 = new Array(19).fill(0);
        let registr2 = new Array(22).fill(0);
        let registr3 = new Array(23).fill(0);

        for (let i = 0; i < 64; i++) {
            registr1[0] = (registr1[0] + parseInt(keyInBits[i % keyInBits.length])) % 2;
            registr1.unshift(registr1.pop());

            registr2[0] = (registr2[0] + parseInt(keyInBits[i % keyInBits.length])) % 2;
            registr2.unshift(registr2.pop());

            registr3[0] = (registr3[0] + parseInt(keyInBits[i % keyInBits.length])) % 2;
            registr3.unshift(registr3.pop());
        }

        for (let i = 0; i < 22; i++) {
            registr1[0] = (registr1[0] + kadr) % 2;
            registr1.unshift(registr1.pop());

            registr2[0] = (registr2[0] + kadr) % 2;
            registr2.unshift(registr2.pop());


            registr3[0] = (registr3[0] + kadr) % 2;
            registr3.unshift(registr3.pop());

        }

        for (let i = 0; i < 100; i++) {
            let F = registr1[8] && registr2[10] || registr1[8] && registr3[10] || registr2[10] && registr3[10];
            if (registr1[8] == F) {
                registr1.unshift(registr1.pop());
            }
            if (registr2[10] == F) {
                registr2.unshift(registr2.pop());
            }
            if (registr3[10] == F) {
                registr3.unshift(registr3.pop());
            }
        }
        console.log(registr1);
        console.log(registr2);
        console.log(registr3);
        let tempResult = "";
        for (let i = 0; i < bitStockTextArray[kadr].length; i++) {
            tempResult += (parseInt(bitStockTextArray[kadr][i]) + ((((registr1[18] + registr2[21]) % 2) + registr3[22]) % 2)) % 2;

            registr1[0] = (((((registr1[18] + registr1[17]) % 2) + registr1[16]) % 2) + registr1[13]) % 2; 
            registr1.unshift(registr1.pop());

            registr2[0] = (registr2[21] + registr2[20]) % 2;
            registr2.unshift(registr2.pop());

            registr3[0] = ((((registr3[22] + registr3[21]) % 2 + registr3[20]) % 2) + registr3[7]) % 2;
            registr3.unshift(registr3.pop());
        }
        
        result += tempResult;
    }
    console.log(result);

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
        
        for (let i = 0; i < 64; i++) {
            registr1[0] = (registr1[0] + parseInt(keyInBits[i % keyInBits.length])) % 2;
            registr1.unshift(registr1.pop());

            registr2[0] = (registr2[0] + parseInt(keyInBits[i % keyInBits.length])) % 2;
            registr2.unshift(registr2.pop());

            registr3[0] = (registr3[0] + parseInt(keyInBits[i % keyInBits.length])) % 2;
            registr3.unshift(registr3.pop());
        }

        for (let i = 0; i < 22; i++) {
            registr1[0] = (registr1[0] + kadr) % 2;
            registr1.unshift(registr1.pop());

            registr2[0] = (registr2[0] + kadr) % 2;
            registr2.unshift(registr2.pop());


            registr3[0] = (registr3[0] + kadr) % 2;
            registr3.unshift(registr3.pop());

        }

        for (let i = 0; i < 100; i++) {
            let F = registr1[8] && registr2[10] || registr1[8] && registr3[10] || registr2[10] && registr3[10];
            if (registr1[8] == F) {
                registr1.unshift(registr1.pop());
            }
            if (registr2[10] == F) {
                registr2.unshift(registr2.pop());
            }
            if (registr3[10] == F) {
                registr3.unshift(registr3.pop());
            }
        }
        console.log(registr1);
        console.log(registr2);
        console.log(registr3);
        let tempResult = "";
        for (let i = 0; i < bitStockTextArray[kadr].length; i++) {
            tempResult += (parseInt(bitStockTextArray[kadr][i]) + ((((registr1[18] + registr2[21]) % 2) + registr3[22]) % 2)) % 2;

            registr1[0] = (((((registr1[18] + registr1[17]) % 2) + registr1[16]) % 2) + registr1[13]) % 2; 
            registr1.unshift(registr1.pop());

            registr2[0] = (registr2[21] + registr2[20]) % 2;
            registr2.unshift(registr2.pop());

            registr3[0] = ((((registr3[22] + registr3[21]) % 2 + registr3[20]) % 2) + registr3[7]) % 2;
            registr3.unshift(registr3.pop());
        }
        
        result += tempResult;
    }
    console.log(result);

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