import inquirer from 'inquirer';
import fs from 'fs-extra';
import { templatesData, getTemplatesByName, copyFile, resolveUserPath, log } from './utils';

export const execute = async() => {

  const { templateName } = await inquirer.prompt([
    {
      type: 'list',
      name: 'templateName',
      message: 'choose one of these templates that you need',
      choices: Object.keys(templatesData),
      loop: true
    },
  ])

  log.info(templateName);

  const { firstProjectName } = await inquirer.prompt([
    {
      type: 'input',
      name: 'firstProjectName',
      message: "your project's name:",
      default: 'a-ryan-cli-project',
    },
  ])
  
  log.info(firstProjectName);

  // check if target directory name is available
  const targetValidate = async(targetName:string) => {
    const targetPath = resolveUserPath(targetName);
    try {
      log.info('isExists:', String(fs.existsSync(targetPath)))
      if (fs.existsSync(targetPath)) {
        const { isRmExsitFile } = await inquirer.prompt([
          {
            type: 'confirm',
            name: 'isRmExsitFile',
            message: `Target directory "${targetName}" is not empty, Remove existing files and continue?`, 
            default: true,
          }
        ])
        log.info(isRmExsitFile);
        if (!isRmExsitFile) {
          const { projectName } = await inquirer.prompt([
            {
              type: 'input',
              name: 'projectName',
              message: 'Type a new project name:',
              default: '',
              validate: (val) => {
                return val.replace(/(^s*)|(s*$)/g, '').length > 0;
              }
            },
          ])
          return targetValidate(projectName);
        } else {
          log.info('remove target directory...')
          const target = resolveUserPath(firstProjectName);
          fs.emptyDirSync(target);
          fs.rmdirSync(target);
          return firstProjectName;
        }
      } else {
        return targetName;
      }
    } catch (error) {
      log.error(error);
    }
  }

  try {
    const res = await targetValidate(firstProjectName);
    const userPath = resolveUserPath(res)
    fs.mkdirSync(userPath, { recursive: true });
    const templatePath = getTemplatesByName(templateName);
    // ignore target list
    const ignoreFileList:string[] = [
      '.git',
      'node_modules',
      'package-lock.json',
      'yarn.lock'
    ]
    // copy files, from template to user
    copyFile(templatePath, userPath, ignoreFileList);

    log.success(`
    your project ${res} has been inited.
    next cmd you should run:
      cd ${res}
      yarn
      yarn start
    - for more scripts, you can review \`${res}/package.json\` > scripts
    - for more infomation, you can review \`${res}/README.md\`
    `)
  } catch (error) {
    log.error(error);
  }
}