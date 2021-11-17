import inquirer from 'inquirer';
import fs from 'fs';
import { templatesData, getTemplatesByName, copyFile, resolveUserPath, log } from './utils';

export const execute = async() => {

  // const chooseRmExitsFilesOrNot = async(target:string) => {
  //   const res = await inquirer.prompt([
  //     {
  //       type: 'confirm',
  //       name: 'isRmExsitFile',
  //       message: 'Remove existing files and continue?', 
  //       default: true,
  //     }
  //   ])
  //   const { isRmExsitFile } = res;
  //   if (!isRmExsitFile) {
  //     execute();
  //     return 'repeat';
  //   }
  //   // todo - remove exits file
  //   fs.rmdir(target, () => {
  //     execute();
  //     return true;
  //   });
  // }
  const answers = await inquirer.prompt([
    {
      type: 'list',
      name: 'templateName',
      message: 'choose one of these templates that you need',
      choices: Object.keys(templatesData),
      loop: true
    },
    {
      type: 'input',
      name: 'projectName',
      message: "your project's name:",
      default: 'a-ryan-cli-project',
      // TODO - check if target file name is available
      validate: async function(val) {
        const targetPath = resolveUserPath(val);
        if (!fs.existsSync(targetPath)) {
          return true;
        }
        return 'Target directory "a-ryan-cli-project" is not empty';
      }
    },
  ])

  const { templateName, projectName, isRmExsitFile } = answers;
  console.log('==> dsa:', isRmExsitFile);

  const templatePath = getTemplatesByName(templateName);

  // ignore target list
  const ignoreFileList:string[] = [
    '.git',
    'node_modules',
    'package-lock.json'
  ]
  
  // copy files, from template to user
  const userPath = resolveUserPath(projectName)
  console.log('==> user path:', userPath);

  fs.mkdirSync(userPath, { recursive: true });
  copyFile(templatePath, userPath, ignoreFileList);

  log.success(`
  your project ${projectName} has been inited.
  next cmd you should run:
    cd ${projectName}
    yarn
    yarn start
  - for more scripts, you can review \`${projectName}/package.json\` > scripts
  - for more infomation, you can review \`${projectName}/README.md\`
  `)

}