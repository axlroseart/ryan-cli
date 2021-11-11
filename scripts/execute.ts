import inquirer from 'inquirer';
import fs, { open, mkdir } from 'fs';
import { templatesData, getTemplatesByName, copyFile, resolveUserPath, log } from './utils';

export const execute = async() => {
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
      // validate: ,
    },
  ])

  const { templateName, projectName } = answers;

  const templatePath = getTemplatesByName(templateName);

  // fetch all target files which is under templatePath

  // ignore target list
  const ignoreFileList:string[] = [
    '.git',
    'node_modules'
  ]
  
  // copy files, from template to user
  const userPath = resolveUserPath(projectName)
  console.log('==> user path:', userPath);
  fs.mkdirSync(userPath, { recursive: true });
  copyFile(templatePath, userPath, ignoreFileList);
  
  // mkdir(userPath, { recursive: true }, (err) => {
  //   if (err) {
  //     log.error(err.message || 'unknow error');
  //     return;
  //   };
  //   copyFile(templatePath, userPath, ignoreFileList);
  // });

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