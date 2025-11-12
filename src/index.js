export function separateParagraphs(text){
    const arrayParagraphs = extractParagraphs(text);
    const arrayCount = arrayParagraphs.flatMap((paragraph) => {
        if(!paragraph) return []; // remove vazios
        return countRepeatedWords(paragraph); // transforma
    })
    // .filter((paragraph) => paragraph) O FILTER DESCARTA ELEMENTOS VAZIOS, JÁ QUE SÃO FALSY.
    // .map((paragraph) => {            
    //     return countRepeatedWords(paragraph);
    // })
    return arrayCount;
}

function extractParagraphs(text){
    return text.toLowerCase().split("\n");
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
