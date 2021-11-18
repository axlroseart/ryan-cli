// some useful utils for this project
import fs from "fs";
const path = require("path");
const chalk = require("chalk");

export const resolveProject = (...paths: string[]) => {
  return path.resolve(__dirname, "../templates", ...paths);
};

export const resolveUserPath = (...paths:string[]) => {
  return path.resolve(process.cwd(), ...paths);
}

export const templatesData: { [key: string]: string } = {
  "vue-h5": resolveProject("vue-h5-template"),
  "vue-pc": resolveProject("vue-h5-template"),
  "react-h5": resolveProject("react-h5-template"),
  "react-pc": resolveProject("react-pc-template"),
};

export const log = {
  info: (...text: string[]) => {
    const content = chalk.cyan("[info] => ", ...text);
    log.print(content);
  },
  warn: (text: string) => {
    const content = chalk.yellow("[warn] => ", text);
    log.print(content);
  },
  error: (text: string) => {
    const content = chalk.red("[error] => ", text);
    log.print(content);
  },
  success: (text: string) => {
    const content = chalk.green("[success] => ", text);
    log.print(content);
  },
  print: (c: any) => {
    return console.log(c);
  },
};

export const getTemplatesByName = (name: string) => {
  return templatesData[name];
};

export const copyFile = function (srcPath:string, tarPath:string, filter:string[] = []) {
  fs.readdir(srcPath, function (err, files) {
    if (err === null) {
      files.forEach(function (filename) {
        let filedir = path.join(srcPath, filename);
        let filterFlag = filter.some((item) => item === filename);
        if (!filterFlag) {
          fs.stat(filedir, function (errs, stats) {
            let isFile = stats.isFile();
            if (isFile) {
              const destPath = path.join(tarPath, filename);
              // copy
              fs.copyFile(filedir, destPath, (err) => {});
            } else {
              let tarFiledir = path.join(tarPath, filename);
              // create directory
              fs.mkdir(tarFiledir, (err) => {});
              // recursion
              copyFile(filedir, tarFiledir, filter);
            }
          });
        }
      });
    } else {
      if (err) console.error(err);
    }
  });
};
