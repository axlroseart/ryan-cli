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
      validate: function(val) {
        const targetPath = resolveUserPath(val);
        log.info(targetPath);
        if (!fs.existsSync(targetPath)) {
          return true;
        }
        // TODO - ask if remove exists files or not
        return 'Target directory "vue-h5-template" is not empty. Remove existing files and continue?';
      }
    },
  ])

  const { templateName, projectName } = answers;

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