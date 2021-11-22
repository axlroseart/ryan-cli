"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.execute = void 0;
const inquirer_1 = __importDefault(require("inquirer"));
const fs_extra_1 = __importDefault(require("fs-extra"));
const utils_1 = require("./utils");
const execute = () => __awaiter(void 0, void 0, void 0, function* () {
    const { templateName } = yield inquirer_1.default.prompt([
        {
            type: 'list',
            name: 'templateName',
            message: 'choose one of these templates that you need',
            choices: Object.keys(utils_1.templatesData),
            loop: true
        },
    ]);
    utils_1.log.info(templateName);
    const { firstProjectName } = yield inquirer_1.default.prompt([
        {
            type: 'input',
            name: 'firstProjectName',
            message: "your project's name:",
            default: 'a-ryan-cli-project',
        },
    ]);
    utils_1.log.info(firstProjectName);
    // check if target directory name is available
    const targetValidate = (targetName) => __awaiter(void 0, void 0, void 0, function* () {
        const targetPath = utils_1.resolveUserPath(targetName);
        try {
            utils_1.log.info('isExists:', String(fs_extra_1.default.existsSync(targetPath)));
            if (fs_extra_1.default.existsSync(targetPath)) {
                const { isRmExsitFile } = yield inquirer_1.default.prompt([
                    {
                        type: 'confirm',
                        name: 'isRmExsitFile',
                        message: `Target directory "${targetName}" is not empty, Remove existing files and continue?`,
                        default: true,
                    }
                ]);
                utils_1.log.info(isRmExsitFile);
                if (!isRmExsitFile) {
                    const { projectName } = yield inquirer_1.default.prompt([
                        {
                            type: 'input',
                            name: 'projectName',
                            message: 'Type a new project name:',
                            default: '',
                            validate: (val) => {
                                return val.replace(/(^s*)|(s*$)/g, '').length > 0;
                            }
                        },
                    ]);
                    return targetValidate(projectName);
                }
                else {
                    utils_1.log.info('remove target directory...');
                    const target = utils_1.resolveUserPath(firstProjectName);
                    fs_extra_1.default.emptyDirSync(target);
                    fs_extra_1.default.rmdirSync(target);
                    return firstProjectName;
                }
            }
            else {
                return targetName;
            }
        }
        catch (error) {
            utils_1.log.error(error);
        }
    });
    try {
        const res = yield targetValidate(firstProjectName);
        const userPath = utils_1.resolveUserPath(res);
        fs_extra_1.default.mkdirSync(userPath, { recursive: true });
        const templatePath = utils_1.getTemplatesByName(templateName);
        // ignore target list
        const ignoreFileList = [
            '.git',
            'node_modules',
            'package-lock.json',
            'yarn.lock',
            'yarn-error.log'
        ];
        // copy files, from template to user
        utils_1.copyFile(templatePath, userPath, ignoreFileList);
        utils_1.log.success(`
    your project ${res} has been inited.
    next cmd you should run:
      cd ${res}
      yarn
      yarn start
    - for more scripts, you can review \`${res}/package.json\` > scripts
    - for more infomation, you can review \`${res}/README.md\`
    `);
    }
    catch (error) {
        utils_1.log.error(error);
    }
});
exports.execute = execute;
