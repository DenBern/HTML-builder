const fs = require('fs');
const path = require('path');
const pathDir = path.join(__dirname);
const pathFolder = pathDir + '/files';

const copyFolder = pathDir + '/files-copy';

const copyFiles = () => {
  fs.readdir(copyFolder, (err, files) => {
    files.forEach((file) => {
      const filePath = path.join(copyFolder, file);
      fs.unlinkSync(filePath);
    });
  });
  fs.readdir(pathFolder, (err, files) => {
    files.forEach((file) => {
      fs.copyFile(pathFolder + '/' + file, copyFolder + '/' + file, () => {});
    });
  });
};

fs.mkdir(copyFolder, () => {
  copyFiles();
});
