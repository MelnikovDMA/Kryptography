let alphabet = "абвгдежзийклмнопрстуфхцчшщъыьэюя";

function encryption() {
    let result = "";

    let originalText = document.querySelector('#originalText').value;
    originalText = textFormatting(originalText);
    
    let matrixKey = document.querySelectorAll(".cardano-key");
    let tempArray = [];
    for (let i = 0; i < matrixKey.length; i++) {
        tempArray.push(parseInt(matrixKey[i].value))
    }
    let matrix  = new Array(6);
    let matrix2  = new Array(6);
    let matrix3  = new Array(6);
    let matrix4  = new Array(6);

    for (let i = 0; i < matrix.length; i++) {
        matrix[i] = new Array(10);
        matrix2[i] = new Array(10);
        matrix3[i] = new Array(10);
        matrix4[i] = new Array(10);
    }

    for (let i = 0; i < matrix.length; i++) {
        for (let j = 0; j < matrix[i].length; j++) {
            matrix[i][j] = tempArray[i * 10 + j];
        }
    }

    for (let i = 0; i < matrix.length; i++) {
        for (let j = 0; j < matrix[i].length; j++) {
            matrix2[i][j] = matrix[i][j];

        }
    }

    console.log(matrix);
    for (i = 0; i < matrix2.length; i++) {
        matrix2[i] = matrix2[i].reverse();
    }

    for (let i = 0; i < matrix.length; i++) {
        for (let j = 0; j < matrix[i].length; j++) {
            matrix3[i][j] = matrix2[i][j];

        }
    }

    matrix3.reverse();

    for (let i = 0; i < matrix.length; i++) {
        for (let j = 0; j < matrix[i].length; j++) {
            matrix4[i][j] = matrix3[i][j];

        }
    }
    for (let i = 0; i < matrix4.length; i++) {
        matrix4[i] = matrix4[i].reverse();
    }

    console.log("----");
    console.log(matrix);
    console.log(matrix2);
    console.log(matrix3);
    console.log(matrix4);

    console.log("----");

    let alphasMatrix = new Array(matrix.length);
    for (let i = 0; i < alphasMatrix.length; i++) {
        alphasMatrix[i] = new Array(matrix[i].length);
    }
    console.log(alphasMatrix);
    let oneCounter = 0;
    for (let i = 0; i < matrix.length; i++) {
        for (let j = 0; j < matrix[i].length; j++) {
            if (matrix[i][j] == 1) {
                oneCounter += 1;
            }
        }
    }


    // console.log(matrix3);
    console.log(oneCounter + "------");

    let allCombMatrix = new Array(4);
    allCombMatrix[0] = matrix;
    allCombMatrix[1] = matrix2;
    allCombMatrix[2] = matrix3;
    allCombMatrix[3] = matrix4;

    let matrix4D = new Array(Math.ceil(originalText.length / (4 * oneCounter)));
    for (let i = 0; i < matrix4D.length; i++) {
        matrix4D[i] = JSON.parse(JSON.stringify(allCombMatrix))
    }
    let alphasMatrixArray = new Array(matrix4D.length);
    for (let i = 0; i < alphasMatrixArray.length; i++) {
        alphasMatrixArray[i] = JSON.parse(JSON.stringify(alphasMatrix));
    }

    if (oneCounter != 15) {
        alert("В Вашей решётке ошибка (число единичных ячеек (отверстий) должно быть 60 / 4  = 15)")
    }

    oneCounter = 0;
    let nullCounter = 0;

    let resultMatrixArray = new Array(matrix4D.length);
    for (let i = 0; i < resultMatrixArray.length; i++) {
        let tempFL = new Array(matrix.length);
        for (let j = 0; j < tempFL.length; j++) {
            tempFL[j] = new Array(matrix[0].length);
        }
        resultMatrixArray[i] = tempFL;
    }

    console.log("-------");

    console.log(matrix4D);

    for (let i = 0; i < matrix4D.length; i++) {
        for (let j = 0; j < matrix4D[i].length; j++) {
            for(let k = 0; k < matrix4D[i][j].length; k++) {
                for (let l = 0; l < matrix4D[i][j][k].length; l++) {
                    if (matrix4D[i][j][k][l] == 1) {
                        if (originalText[oneCounter] == undefined) {
                            matrix4D[i][j][k][l] = alphabet[nullCounter % 32];
                            resultMatrixArray[i][k][l] = alphabet[nullCounter % 32];
                            nullCounter += 1;
                        } else {
                            matrix4D[i][j][k][l] = originalText[oneCounter];
                            resultMatrixArray[i][k][l] = originalText[oneCounter];
                            oneCounter += 1;
                            console.log(matrix4D[i][j][k][l]);
                        }
                    }
                }

            }
        }
    }

    console.log(resultMatrixArray);

    console.log(matrix4D);


    for (let i = 0; i < resultMatrixArray.length; i++) { //0,1,2,3,4
        for (let j = 0; j < resultMatrixArray[i].length; j++) { //6
            for (let k = 0; k < resultMatrixArray[i][j].length; k++) {
                if (resultMatrixArray[i][j][k] == undefined) {
                    alert("Ошибка при заполнении таблицы");
                }
                result += resultMatrixArray[i][j][k];
            } //10
        }
    }

    console.log(resultMatrixArray);


    document.querySelector('#answerText').value = result;

    console.log(matrix);

    //направо, вверх,влево
    
}


function decode() {
    let result = "";

    let encryptedText = document.querySelector('#encryptedText').value;
    
    let matrixKey = document.querySelectorAll(".cardano-key");
    let tempArray = [];
    for (let i = 0; i < matrixKey.length; i++) {
        tempArray.push(parseInt(matrixKey[i].value))
    }
    let matrix  = new Array(6);
    let matrix2  = new Array(6);
    let matrix3  = new Array(6);
    let matrix4  = new Array(6);

    for (let i = 0; i < matrix.length; i++) {
        matrix[i] = new Array(10);
        matrix2[i] = new Array(10);
        matrix3[i] = new Array(10);
        matrix4[i] = new Array(10);
    }

    for (let i = 0; i < matrix.length; i++) {
        for (let j = 0; j < matrix[i].length; j++) {
            matrix[i][j] = tempArray[i * 10 + j];
        }
    }

    for (let i = 0; i < matrix.length; i++) {
        for (let j = 0; j < matrix[i].length; j++) {
            matrix2[i][j] = matrix[i][j];

        }
    }

    for (i = 0; i < matrix2.length; i++) {
        matrix2[i] = matrix2[i].reverse();
    }

    for (let i = 0; i < matrix.length; i++) {
        for (let j = 0; j < matrix[i].length; j++) {
            matrix3[i][j] = matrix2[i][j];

        }
    }

    matrix3.reverse();

    for (let i = 0; i < matrix.length; i++) {
        for (let j = 0; j < matrix[i].length; j++) {
            matrix4[i][j] = matrix3[i][j];

        }
    }
    for (let i = 0; i < matrix4.length; i++) {
        matrix4[i] = matrix4[i].reverse();
    }

    let alphasMatrix = new Array(matrix.length);
    for (let i = 0; i < alphasMatrix.length; i++) {
        alphasMatrix[i] = new Array(matrix[i].length);
    }

    let oneCounter = 0;
    for (let i = 0; i < matrix.length; i++) {
        for (let j = 0; j < matrix[i].length; j++) {
            if (matrix[i][j] == 1) {
                oneCounter += 1;
            }
        }
    }

    let allCombMatrix = new Array(4);
    allCombMatrix[0] = matrix;
    allCombMatrix[1] = matrix2;
    allCombMatrix[2] = matrix3;
    allCombMatrix[3] = matrix4;

    let matrix4D = new Array(Math.ceil(encryptedText.length / (4 * oneCounter)));
    for (let i = 0; i < matrix4D.length; i++) {
        matrix4D[i] = JSON.parse(JSON.stringify(allCombMatrix))
    }
    let alphasMatrixArray = new Array(matrix4D.length);
    for (let i = 0; i < alphasMatrixArray.length; i++) {
        alphasMatrixArray[i] = JSON.parse(JSON.stringify(alphasMatrix));
    }

    for (let i = 0; i < alphasMatrixArray.length; i++) {
        for (let j = 0; j < alphasMatrixArray[i].length; j++) {
            for (let k = 0; k < alphasMatrixArray[i][j].length; k++) {
                alphasMatrixArray[i][j][k] = encryptedText[(i * 60) + (j * 10 + k)];
                console.log(encryptedText[(i * 60) + (j * 10 + k)]);
            }
        }
    }

    console.log(alphasMatrixArray);

    if (oneCounter != 15) {
        alert("В Вашей решётке ошибка (число единичных ячеек (отверстий) должно быть 60 / 4  = 15)")
    }

    oneCounter = 0;
    let nullCounter = 0;

    let resultMatrixArray = new Array(matrix4D.length);
    for (let i = 0; i < resultMatrixArray.length; i++) {
        let tempFL = new Array(matrix.length);
        for (let j = 0; j < tempFL.length; j++) {
            tempFL[j] = new Array(matrix[0].length);
        }
        resultMatrixArray[i] = tempFL;
    }

    for (let i = 0; i < matrix4D.length; i++) {
        for (let j = 0; j < matrix4D[i].length; j++) {
            for(let k = 0; k < matrix4D[i][j].length; k++) {
                for (let l = 0; l < matrix4D[i][j][k].length; l++) {
                    if (matrix4D[i][j][k][l] == 1) {
                        result += alphasMatrixArray[i][k][l];
                    }
                }
            }
        }
    }

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