const fs = require('fs');
const path = require('path');
const pathDir = path.join(__dirname, '/secret-folder');

const readFiles = () => {
  fs.readdir(pathDir, (err, files) => {
    files.forEach((file) => {
      let res = '';
      const pathToFile = pathDir + '/' + file;
      fs.stat(pathToFile, (err, stat) => {
        if (stat.isFile()) {
          const parse = path.parse(pathToFile);
          res = `${
            parse.name +
            ' - ' +
            parse.ext.replace('.', '') +
            ' - ' +
            stat.size / 1000 +
            'kb'
          }`;
          console.log(res);
        }
      });
    });
  });
};

readFiles();
