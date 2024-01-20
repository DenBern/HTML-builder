const fs = require('fs');
const path = require('path');
const pathDist = path.join(__dirname, '/project-dist');
const pathStyles = path.join(__dirname, '/styles');
const bundle = '/bundle.css';

const writeStream = fs.createWriteStream(`${pathDist + bundle}`);

const writeStyle = (file) => {
  fs.readFile(pathStyles + '/' + file, (err, data) => {
    writeStream.write(`${data.toString()}`, () => {});
  });
};

const createBundle = () => {
  fs.readdir(pathStyles, (err, files) => {
    files.forEach((file) => {
      if (file.includes('.css')) {
        writeStyle(file);
      }
    });
  });
};

createBundle();
