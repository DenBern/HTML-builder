const fs = require('fs');
const path = require('path');
const pathDir = path.join(__dirname + '/');
const nameFile = 'text.txt';
const readline = require('readline');

const writeStream = fs.createWriteStream(`${pathDir + nameFile}`);

const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout,
});

const writeTextToFile = (text) => writeStream.write(`${text}`, () => {});

process.stdout.write('Hello! Write text...\n');

const exitConsole = () => {
  console.log('Goodbye!');
  rl.close();
};

rl.on('SIGINT', () => exitConsole());

const writeToConsoleAndFile = () => {
  rl.question('', (input) => {
    if (input.trim().toLowerCase() === 'exit') {
      exitConsole();
    } else {
      writeTextToFile(input);
      writeToConsoleAndFile();
    }
  });
};

writeToConsoleAndFile();
