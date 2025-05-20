#!/usr/bin/env node

const fs = require('fs-extra');
const path = require('path');
const { exec } = require('child_process');

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

    const isNative = process.argv[3];

    // Reactylon Native
    if (isNative) {

        const spinner = ora(`Creating a new Reactylon Native app in ${chalk.green(projectName)}.`).start();

        exec(`npx @react-native-community/cli@latest init ${projectName} --version 0.74.2 --skip-install --skip-git-init`, async (error) => {
            if (error) {
                spinner.fail();
                console.log(error);
                return;
            }
            await fs.remove(path.join(projectPath, 'App.tsx'));
            await fs.copy(path.join(__dirname, '..', 'templates', 'reactylon-native'), path.join(projectPath));
            spinner.succeed();

            spinner.text = 'Installing packages. This might take a couple of minutes.';
            spinner.start();
            exec('npm i @babylonjs/core@8.3.0 @babylonjs/loaders@8.3.0 @babylonjs/react-native @babylonjs/react-native-iosandroid-0-71 react-native-permissions@^3.10.1 reactylon@latest react-reconciler@0.29.2 --save --force', { cwd: projectPath }, (error) => {
                if (error) {
                    spinner.fail();
                    console.error(error);
                    return;
                }

                exec('npm i babel-plugin-reactylon --save-dev --force', { cwd: projectPath }, (devError) => {
                    if (devError) {
                        spinner.fail();
                        console.error(devError);
                        return;
                    }

                    spinner.succeed();
                    console.log(`\nReactylon Native app successful created.`);
                });
            });
        });
    }

    // Reactylon
    else {
        const spinner = ora(`Creating a new Reactylon app in ${chalk.green(projectName)}.`).start();
        fs.mkdirSync(projectPath);

        try {

            await fs.copy(path.join(__dirname, '..', 'templates', 'reactylon'), path.join(projectPath));

            const templatePackageJsonPath = path.join(__dirname, '..', 'templates', 'reactylon', 'package.json');
            let packageJsonContent = fs.readFileSync(templatePackageJsonPath, 'utf-8');
            packageJsonContent = packageJsonContent.replace(/{{projectName}}/g, projectName);
            fs.writeFileSync(path.join(projectPath, 'package.json'), packageJsonContent);

            spinner.succeed();

            spinner.text = 'Installing packages. This might take a couple of minutes.';
            spinner.start();
            exec('npm install', { cwd: projectPath }, (error) => {
                if (error) {
                    spinner.fail();
                    console.error(error);
                    return;
                }
                spinner.succeed();
                console.log(`\nReactylon app successful created.`);
            });
        }
        catch (error) {
            spinner.fail();
            console.error(error);
        }
    }
})();
