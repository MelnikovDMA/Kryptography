function main() {
    let keyXOne = parseInt(document.getElementById('secretKeyOne').value);
    let keyXTwo = parseInt(document.getElementById('secretKeyTwo').value);
    let keyN = parseInt(document.getElementById('NKey').value);
    let keyA = parseInt(document.getElementById('AKey').value);

    if (keyA <= 1 || keyA > keyN) {
        alert("Должно выполняться неравенство 1 < a < n")
        return;
    }

    if (keyXOne < 2 || keyXOne > keyN - 1) {
        alert("Секретный ключ пользователя 1 должен принадлежать интервалу [2, n-1]");
        return;
    }

    if (keyXTwo < 2 || keyXTwo > keyN - 1) {
        alert("Секретный ключ пользователя 2 должен принадлежать интервалу [2, n-1]");
        return;
    }

    let Y1 = Number(BigInt(keyA) ** BigInt(keyXOne) % BigInt(keyN));
    let Y2 = Number(BigInt(keyA) ** BigInt(keyXTwo) % BigInt(keyN));

    let K1 = Number(BigInt(Y2) ** BigInt(keyXOne) % BigInt(keyN));
    let K2 = Number(BigInt(Y1) ** BigInt(keyXTwo) % BigInt(keyN));

    if (K1 == 1 || K2 == 1) {
        alert("Секретный ключ не должен быть равен 1");
        return;
    }

    let answerArea = document.getElementById("answerText");
    if (K1 == K2) {
        answerArea.value = "Задача решена верно: K1 = " + K1 + "; K2 = " + K2;
    } else {
        answerArea.value = "Задача решена неверно";
    }
}

window.onload = function () {
    document.querySelector('#checkBtn').onclick = main;
}