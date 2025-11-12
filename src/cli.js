import fs from 'fs';
import path from 'path';
import handleErrors from './errors/errorFunction.js';
import { separateParagraphs } from './index.js';
import { Command } from 'commander';   
import chalk from 'chalk';

const program = new Command();

program
    .version('0.0.1')
    .option('-s, --source <string>', 'caminho do texto a ser processado')
    .option('-d, --destination <string>', 'caminho do destino para salvar o arquivo resultante')
    .action((options) => {
        const { source, destination } = options;

        if(!source || !destination){
            console.error(chalk.red('Erro: favor inserir caminho de origem e destino'));
            program.help();
            return;
        }

        const sourcePath = path.resolve(source); // transforma em endereço relativo -> absoluto
        const destinationPath = path.resolve(destination);

        try{
            processFile(sourcePath, destinationPath);
            console.log(chalk.magenta('Texto processado com sucesso!'));
        } catch(error){
            console.log(chalk.cyanBright('Ocorreu um erro no processamento'), error);
        }
    })

program.parse(); // Uso do Commander para processar os argumentos da CLI

function processFile(source, destination){
    fs.readFile(source, 'utf-8', (error, text) => {
        try {
            if(error) throw error;
            const wordList = separateParagraphs(text);
            createAndSaveFile(wordList, destination);
        } catch(error) {
            handleErrors(error);
        }   
    })

}

// ASSÍNCRONO
async function createAndSaveFile(wordList, destination){
    const newFile = `${destination}/result.txt`; 
    const wordText = JSON.stringify(wordList, null, 2); // Converte objeto e array em formato JSON
    try {
        await fs.promises.writeFile(newFile, wordText);
        console.log(chalk.magentaBright('Arquivo criado com sucesso'));
    } catch(error){
        throw error;
    }
}
