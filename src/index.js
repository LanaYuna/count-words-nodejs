const { log } = require('console');
const fs = require('fs');

const filePath = process.argv;
const file = filePath[2];

fs.readFile(file, 'utf-8', (error, text) => {
    try {
        if(error) throw error;
        separateParagraphs(text);
    } catch(error) {
        if(error.code == 'ENOENT') console.log('Erro esperado');
        else console.log('Outro erro');
    }   
})

function extractParagraphs(text){
    return text.toLowerCase().split("\n");
}

function separateParagraphs(text){
    const arrayParagraphs = extractParagraphs(text);
    const arrayCount = arrayParagraphs.flatMap((paragraph) => {
        if(!paragraph) return []; // remove vazios
        return countRepeatedWords(paragraph); // transforma
    })
    // .filter((paragraph) => paragraph) O FILTER DESCARTA ELEMENTOS VAZIOS, JÁ QUE SÃO FALSY.
    // .map((paragraph) => {            
    //     return countRepeatedWords(paragraph);
    // })
    console.log(arrayCount);
}

 
function removeSpecialCharacters(word){
    return word.replace(/[.,\/#!$%\^&\*;:{}=\-_`~()]/g, ''); // USO DE REGEX
}


function countRepeatedWords(text){
    const arrayWords = text.split(" ");
    const arrayObj = {};

    arrayWords.forEach((word) => {
        if(word.length >= 3){                                                                   
            removeSpecialCharacters(word);
            arrayObj[word] = (arrayObj[word] || 0) + 1;
        }
    });

    return arrayObj;
}
