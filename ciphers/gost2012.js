let alfabet = "абвгдежзиклмнопрстуфхцчшщъыьэюя";

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


function findQ(dotX, dotY, keyP) {
    let q = 0;
    let n = 50;
    let doubleDot = dotDoubler(dotX, dotY, keyP);
    //console.log(doubleDot);
    let doublX = doubleDot[0];
    let doublY = doubleDot[1];
    let tempX = doublX;
    let tempY = doublY;
    for (let i = 2; i < n; i++) {
        if (dotAdding(tempX, tempY, dotX, dotY, keyP)[0] == 0 && dotAdding(tempX, tempY, dotX, dotY, keyP)[1] == 0) {
            q = i + 1;
            break;
        }
        let addedDot = dotAdding(tempX, tempY, dotX, dotY, keyP);
        if (!(addedDot[0] === 0 && addedDot[1] === 0)) {
            let resX = addedDot[0];
            let resY = addedDot[1];
            tempX = resX;
            tempY = resY;
        } else {
            break;
        }
    }
    return q;
}

function encryption() {
    let originalText = document.querySelector('#originalText').value;
    let chbox = document.querySelector('#formatCheckbox');
    if (chbox.checked) {
		originalText = textFormatting(originalText);
	}

    let keyP = parseInt(document.getElementById('PKey').value);
    let keyA = parseInt(document.getElementById('AKey').value);
    let keyX = parseInt(document.getElementById('XKey').value);
    let keyQ = parseInt(document.getElementById('QKey').value);
    let keyK = parseInt(document.getElementById('KKey').value);
    let dotX = parseInt(document.getElementById('dotX').value);
    let dotY = parseInt(document.getElementById('dotY').value);

    let H = 0;
    for (let i = 0; i < originalText.length; i++) {
        H = (alfabet.indexOf(originalText[i]) + 1 + H) ** 2 % keyP;
    }
    console.log(H);

    let Q = keyQ > 0 ? keyQ : findQ(dotX, dotY, keyP);
    console.log(`Q = ${Q}`);

    let r = 0;
    let s = 0;

    let Y = [0, 0];
    if (keyX > 1) {
        let doubleDot = dotDoubler(dotX, dotY, keyP, keyA);
        let resX = doubleDot[0];
        let resY = doubleDot[1];
        for (let i = 0; i < keyX - 2; i++) {
            let addedDot = dotAdding(resX, resY, dotX, dotY, keyP);
            if (!(addedDot[0] === 0 && addedDot[1] === 0)) {
                resX = addedDot[0];
                resY = addedDot[1];
            } else {
                break;
            }
        }
        Y = [resX, resY];
    } else {
        Y = [dotX, dotY];
    }
    console.log(`Y = ${Y}`);
    // r = P[0] % Q;
    // s = (keyK * H + r * keyX) % q;

    while (r == 0 || s == 0) {
        let R = [0, 0];
        if (keyK > 1) {
            let doubleDot = dotDoubler(dotX, dotY, keyP, keyA);
            let resX = doubleDot[0];
            let resY = doubleDot[1];
            for (let i = 0; i < keyK - 2; i++) {
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
        console.log(`R = ${R}`);
        r = R[0] % Q;
        s = (keyK * H + r * keyX) % Q;
    }

    document.querySelector('#RKey').value = r;
    document.querySelector('#SKey').value = s;
    document.querySelector('#YdotX').value = Y[0];
    document.querySelector('#YdotY').value = Y[1];
    document.querySelector('#answerText').value = "Цифровая подпись: r = " + r + " s = " + s + "  Y = " + Y[0] + ", " + Y[1];
}

function decode() {
    let originalText = document.querySelector('#originalText').value;
    let chbox = document.querySelector('#formatCheckbox');
    if (chbox.checked) {
		originalText = textFormatting(originalText);
	}

    let r = parseInt(document.querySelector('#RKey').value);
    let s = parseInt(document.querySelector('#SKey').value);
    let YdotX = parseInt(document.getElementById('YdotX').value);
    let YdotY = parseInt(document.getElementById('YdotY').value);
    let keyP = parseInt(document.getElementById('PKey').value);
    let keyA = parseInt(document.getElementById('AKey').value);
    let keyQ = parseInt(document.getElementById('QKey').value);
    let dotX = parseInt(document.getElementById('dotX').value);
    let dotY = parseInt(document.getElementById('dotY').value);


    let H = 0;
    for (let i = 0; i < originalText.length; i++) {
        H = (alfabet.indexOf(originalText[i]) + 1 + H) ** 2 % keyP;
    }
    console.log(H);

    let Q = keyQ > 0 ? keyQ : findQ(dotX, dotY, keyP);

    let u1 = 0;
    let u2 = 0;

    if (!(0 < r || s < Q)) {
        console.log("0 < r, s < Q, подпись не верна");
    }

    if (H == 0) {
        u1 = 0;
        u2 = 0;
    } else {
        u1 = (Q + (fracDivided(s, H, Q) % Q)) % Q;
        u2 = (Q + (fracDivided(-r, H, Q) % Q)) % Q;
    }

    let Y = [YdotX, YdotY];

    let P0 = [0, 0];
    if (u1 > 1) {
        let doubleDot = dotDoubler(dotX, dotY, keyP, keyA);
        let resX = doubleDot[0];
        let resY = doubleDot[1];
        for (let i = 0; i < u1 - 2; i++) {
            let addedDot = dotAdding(resX, resY, dotX, dotY, keyP);
            if (!(addedDot[0] == 0 && addedDot[1] == 0)) {
                resX = addedDot[0];
                resY = addedDot[1];
            } else {
                break;
            }
        }
        P0 = [resX, resY];
    } else if (u1 === 0) {
        P0 = [0, 0];
    } else {
        P0 = [dotX, dotY];
    }

    let P1 = [0, 0];
    if (u2 > 1) {
        let doubleDot = dotDoubler(Y[0], Y[1], keyP, keyA);
        let resX = doubleDot[0];
        let resY = doubleDot[1];
        for (let i = 0; i < u2 - 2; i++) {
            let addedDot = dotAdding(resX, resY, Y[0], Y[1], keyP);
            if (!(addedDot[0] == 0 && addedDot[1] ===0)) {
                resX = addedDot[0];
                resY = addedDot[1];
            } else {
                break;
            }
        }
        P1 = [resX, resY];
    } else if (u2 === 0) {
        P1 = [0, 0];
    } else {
        P1 = [Y[0], Y[1]];
    }

    let P = [0, 0];
    console.log(`H = ${H}, Q = ${Q}`);
    console.log(`u1 = ${u1}, u2 = ${u2}`);
    console.log(`P0 = ${P0}`);
    console.log(`P1 = ${P1}`);
    console.log(`Y = ${Y}`);

    if (P0[0] == P1[0]) {
        if (P0[1] == P1[1]) {
            P = dotDoubler(P0[0], P0[1], keyP, keyA);
        } else {
            return "P = 0, Подпись не верна";
        }
    } else {
        P = dotAdding(P0[0], P0[1], P1[0], P1[1], keyP);
    }

    console.log(`P = ${P}`);
    if (P[0] % Q == r) {
        answerArea.value = "Подпись верна";
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