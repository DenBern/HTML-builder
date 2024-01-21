const fs = require('fs');
const path = require('path');

fs.mkdir(__dirname + '/project-dist', () => {});

const projectPath = path.join(__dirname, '/project-dist');

const createStyle = () => {
  const styleFile = '/style.css';
  const pathStyles = path.join(__dirname, '/styles');
  const writeStream = fs.createWriteStream(`${projectPath + styleFile}`);

  const writeStyle = (file) => {
    fs.readFile(pathStyles + '/' + file, (err, data) => {
      writeStream.write(`${data.toString()}`, () => {});
    });
  };

  const readStyle = () => {
    fs.readdir(pathStyles, (err, files) => {
      files.forEach((file) => {
        if (file.includes('.css')) {
          writeStyle(file);
        }
      });
    });
  };
  readStyle();
};

const createAssets = () => {
  const assetsFolder = '/assets';
  fs.mkdir(projectPath + assetsFolder, () => {});

  const pathAssets = path.join(__dirname + assetsFolder);

  const createFolder = (folder) => {
    fs.mkdir(projectPath + assetsFolder + '/' + folder, () => {});
  };

  const copyFile = (path, folder, file) => {
    fs.copyFile(
      `${pathAssets + '/' + folder + '/' + file}`,
      `${path + '/' + folder + '/' + file}`,
      () => {},
    );
  };

  fs.readdir(pathAssets, (err, folders) => {
    folders.forEach((folder) => {
      createFolder(folder);
      fs.readdir(pathAssets + '/' + folder, (err, files) => {
        files.forEach((file) => {
          copyFile(`${projectPath + assetsFolder}`, folder, file);
        });
      });
    });
  });
};

const createIndexHtml = () => {
  const pathComponents = path.join(__dirname, '/components');

  let buildIndex;

  fs.readFile(path.join(__dirname, '/template.html'), (err, templateData) => {
    const writeSream = fs.createWriteStream(projectPath + '/index.html');
    writeSream.write(templateData);

    buildIndex = templateData;

    fs.readdir(pathComponents, (err, files) => {
      files.forEach((file) => {
        fs.readFile(pathComponents + '/' + file, (err, dataComponent) => {
          const fileName = path.parse(file).name;
          buildIndex = buildIndex
            .toString()
            .replace(`{{${fileName}}}`, dataComponent.toString());
          fs.writeFile(projectPath + '/index.html', buildIndex, () => {});
        });
      });
    });
  });
};

createIndexHtml();
createStyle();
createAssets();
