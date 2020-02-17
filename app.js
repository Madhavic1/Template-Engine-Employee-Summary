const Manager = require('./lib/Manager');
const Engineer = require('./lib/Engineer');
const Intern = require('./lib/Intern');
const inquirer = require('inquirer');
const path = require('path');
const fs = require('fs');
const OUTPUT_DIR = path.resolve(__dirname, 'output');
const outputPath = path.join(OUTPUT_DIR, 'team.html');
const renderer = require('./lib/htmlRenderer.js');

const init = async () => {
    try {

        const employees = [];
        console.log('Enter manager details');

        const mngObj = await managerDetails();
        employees.push(mngObj);
        console.log('Enter Enginners details ??');
        let inputs = [];
        const engineerInfo = await getEngineersDetails();
        console.log(engineerInfo);
        for (let i = 0; i < engineerInfo.length; i++) {
            const engineerObj = new Engineer(engineerInfo[i].name, engineerInfo[i].id, engineerInfo[i].email, engineerInfo[i].gitHubUname);
            employees.push(engineerObj);
        }
        const internInfo = await getInternsDetails();
        console.log(internInfo);
        for (let i = 0; i < internInfo.length; i++) {
            const internObj = new Intern(internInfo[i].name, internInfo[i].id, internInfo[i].email, internInfo[i].school);
            employees.push(internObj);
        }
        console.log(employees);
        const html = renderer.render(employees);
        fs.writeFileSync(outputPath, html, (err) => {
            if (err) {
                return console.error(err.message);
            }
        })

    }
    catch (err) {
        if (err) {
            console.error(err.message);

        }
    }
}

async function managerDetails() {
    const manager = inquirer.prompt([
        {
            type: 'input',
            message: 'Enter Manager name ?',
            name: 'name'
        },
        {
            type: 'input',
            message: 'Enter manager id ?',
            name: 'id'
        },
        {
            type: 'input',
            message: 'Enter manager email address ?',
            name: 'email'
        },
        {
            type: 'input',
            message: 'Enter manager office number?',
            name: 'officeNumber'
        }
    ]);
    const mngObj = new Manager((await manager).name, (await manager).id, (await manager).email, (await manager).officeNumber);
    return mngObj;
}

const getEngineersDetails = async (inputs = []) => {

    const prompts = [
        {
            type: 'input',
            message: 'Enter Engineer name ?',
            name: 'name'
        },
        {
            type: 'input',
            message: 'Enter Engineer id ?',
            name: 'id'
        },
        {
            type: 'input',
            message: 'Enter Engineer email address ?',
            name: 'email'
        },
        {
            type: 'input',
            message: 'Enter Engineer GitHub Username?',
            name: 'gitHubUname'
        },
        {
            type: 'confirm',
            name: 'again',
            message: 'Want to enter another Engineer details ?',
            default: true
        }
    ];



    // const prompts = (empType === 'engineer') ? prompts1 : prompts2;
    const { again, ...answers } = await inquirer.prompt(prompts);
    const newInputs = [...inputs, answers];
    return again ? getEngineersDetails(newInputs) : newInputs;
};

const getInternsDetails = async (inputs = []) => {

    const prompts = [
        {
            type: 'input',
            message: 'Enter Intern name ?',
            name: 'name'
        },
        {
            type: 'input',
            message: 'Enter Intern id ?',
            name: 'id'
        },
        {
            type: 'input',
            message: 'Enter Intern email address ?',
            name: 'email'
        },
        {
            type: 'input',
            message: 'Enter Intern School?',
            name: 'school'
        },
        {
            type: 'confirm',
            name: 'again',
            message: 'Want to enter another Intern details ?',
            default: true
        }
    ];

    // const prompts = (empType === 'engineer') ? prompts1 : prompts2;
    const { again, ...answers } = await inquirer.prompt(prompts);
    const newInputs = [...inputs, answers];
    return again ? getInternsDetails(newInputs) : newInputs;
};

init();