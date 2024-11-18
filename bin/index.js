#!/usr/bin/env node

const fs = require('fs-extra');
const path = require('path');
const { exec } = require('child_process');

async function delay(ms) {
    return new Promise(resolve => {
        setTimeout(resolve, ms);
    })
}

(async () => {
    const projectName = process.argv[2];
    if (!projectName) {
        console.log('You must provide a project name.');
        process.exit(1);
    }

    const projectPath = path.join(process.cwd(), projectName);

    if (fs.existsSync(projectPath)) {
        console.log(`Project '${projectName}' already exists.`);
        process.exit(1);
    }

    const ora = (await import('ora')).default;
    const chalk = (await import('chalk')).default;

    console.log('');
    const spinner = ora(`Creating a new Reactylon app in ${chalk.green(projectName)}.`).start();
    fs.mkdirSync(projectPath);

    try {

        await fs.copy(path.join(__dirname, '..', 'template'), path.join(projectPath));

        const templatePackageJsonPath = path.join(__dirname, '..', 'template', 'package.json');
        let packageJsonContent = fs.readFileSync(templatePackageJsonPath, 'utf-8');
        packageJsonContent = packageJsonContent.replace(/{{projectName}}/g, projectName);
        fs.writeFileSync(path.join(projectPath, 'package.json'), packageJsonContent);

        spinner.succeed();

        spinner.text = 'Installing packages. This might take a couple of minutes.';
        spinner.start();
        exec('npm install', { cwd: projectPath }, (error) => {
            if (error) {
                spinner.fail();
            }
            spinner.succeed();
            console.log(`\nReactylon app successful created.`);
        });
    }
    catch (error) {
        spinner.fail();
        console.error(error);
    }

})();
