"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.copyFile = exports.getTemplatesByName = exports.log = exports.templatesData = exports.resolveUserPath = exports.resolveProject = void 0;
// some useful utils for this project
const fs_1 = __importDefault(require("fs"));
const path = require("path");
const chalk = require("chalk");
const resolveProject = (...paths) => {
    return path.resolve(__dirname, "../templates", ...paths);
};
exports.resolveProject = resolveProject;
const resolveUserPath = (...paths) => {
    return path.resolve(process.cwd(), ...paths);
};
exports.resolveUserPath = resolveUserPath;
exports.templatesData = {
    "vue-h5": exports.resolveProject("vue-h5-template"),
    "vue-pc": exports.resolveProject("vue-h5-template"),
    "react-h5": exports.resolveProject("react-h5-template"),
    "react-pc": exports.resolveProject("react-pc-template"),
};
exports.log = {
    info: (...text) => {
        const content = chalk.cyan("[info] => ", ...text);
        exports.log.print(content);
    },
    warn: (text) => {
        const content = chalk.yellow("[warn] => ", text);
        exports.log.print(content);
    },
    error: (text) => {
        const content = chalk.red("[error] => ", text);
        exports.log.print(content);
    },
    success: (text) => {
        const content = chalk.green("[success] => ", text);
        exports.log.print(content);
    },
    print: (c) => {
        return console.log(c);
    },
};
const getTemplatesByName = (name) => {
    return exports.templatesData[name];
};
exports.getTemplatesByName = getTemplatesByName;
const copyFile = function (srcPath, tarPath, filter = []) {
    fs_1.default.readdir(srcPath, function (err, files) {
        if (err === null) {
            files.forEach(function (filename) {
                let filedir = path.join(srcPath, filename);
                let filterFlag = filter.some((item) => item === filename);
                if (!filterFlag) {
                    fs_1.default.stat(filedir, function (errs, stats) {
                        let isFile = stats.isFile();
                        if (isFile) {
                            const destPath = path.join(tarPath, filename);
                            // copy
                            fs_1.default.copyFile(filedir, destPath, (err) => { });
                        }
                        else {
                            let tarFiledir = path.join(tarPath, filename);
                            // create directory
                            fs_1.default.mkdir(tarFiledir, (err) => { });
                            // recursion
                            exports.copyFile(filedir, tarFiledir, filter);
                        }
                    });
                }
            });
        }
        else {
            if (err)
                console.error(err);
        }
    });
};
exports.copyFile = copyFile;
