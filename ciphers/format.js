function textFormatting() {
    let formResult = "";
    let originalText = document.querySelector('#originalText').value;
    originalText = originalText.toLowerCase();
    for (let i = 0; i < originalText.length; i++) {
    if (originalText[i] == " " && originalText[i + 1] != "-") {
            formResult += "прб";
        }
        else if (originalText[i] == '.') {
            formResult += "тчк";
            i++;
        }
        else if (originalText[i] == ',') {
            formResult += "зпт";
            i++;
        }
        else if (originalText[i] == '!') {
            formResult += "всз";
            i++;
        }
        else if (originalText[i] == '?') {
            formResult += "впз";
            i++;
        }
        else if (originalText[i] == ':') {
            formResult += "двт";
            i++;
        }
        else if (originalText[i] == ';') {
            formResult += "тсз";
            i++;
        }
        else if (originalText[i] == '-') {
            formResult += "дфс";
        }
        else if (originalText[i] == ' ' && originalText[i + 1] == "-") {
            formResult += "трэ";
            i += 2;
        }
        else {
            formResult += originalText[i];
        }
    }

    document.querySelector('#answerText').value = formResult;
}

function textOfFormatting() {
    let formResult = "";
    let formatedText = document.querySelector('#formatedText').value;
    for (let i = 0; i < formatedText.length; i++) {
        if (formatedText[i] == "п" && formatedText[i + 1] == "р" && formatedText[i + 2] == 'б') {
            formResult += " ";
            i += 2;
        }
        else if (formatedText[i] == "т" && formatedText[i + 1] == "ч" && formatedText[i + 2] == 'к') {
            formResult += ". ";
            i += 2;
        }
        else if (formatedText[i] == "з" && formatedText[i + 1] == "п" && formatedText[i + 2] == 'т') {
            formResult += ", ";
            i += 2;
        }
        else if (formatedText[i] == "в" && formatedText[i + 1] == "с" && formatedText[i + 2] == 'з') {
            formResult += "! ";
            i += 2;            
        }
        else if (formatedText[i] == "в" && formatedText[i + 1] == "п" && formatedText[i + 2] == 'з') {
            formResult += "? ";
            i += 2;            
        }
        else if (formatedText[i] == "д" && formatedText[i + 1] == "в" && formatedText[i + 2] == 'т') {
            formResult += ": ";
            i += 2;            
        }
        else if (formatedText[i] == "т" && formatedText[i + 1] == "с" && formatedText[i + 2] == 'з') {
            formResult += "; ";
            i += 2;            
        }
        else if (formatedText[i] == "д" && formatedText[i + 1] == "ф" && formatedText[i + 2] == 'с') {
            formResult += "-";
            i += 2;
        }
        else if (formatedText[i] == "т" && formatedText[i + 1] == "р" && formatedText[i + 2] == 'э') {
            formResult += " - ";
            i += 2;
        }
        else {
            formResult += formatedText[i];
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
    
    document.querySelector('#answerText').value = finalResult;
}


window.onload = function () {
    document.querySelector('#formationBtn').onclick = textFormatting;
    document.querySelector('#offormationBtn').onclick = textOfFormatting;
}



//бубу бу. бу, бу! бу? бу: бу; бу-бу - бубу
//бубупрббутчкбузптбувсзбувпзбудвтбутсзбудфсбутрэбубу
// " "   => прб
// ". "  => тчк
// ", "  => зпт
// "! "  => всз
// "? "  => впз
// ": "  => двт
// "; "  => тсз
// "-"   => дфс
// " - " => трэ