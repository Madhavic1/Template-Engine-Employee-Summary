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
        console.log('****Enter manager details****');
        const mngObj = await managerDetails();
        employees.push(mngObj);
        const wantEngineerDetails = await inquirer.prompt([
            {
                type : 'confirm',
                message : 'Do you want to enter Engineer details ?',
                name : 'wantToEnterEngineer'
            }
        ]);
        if (wantEngineerDetails.wantToEnterEngineer === true) {
            const engineerInfo = await getEngineersDetails();
            for (let i = 0; i < engineerInfo.length; i++) {
                if(engineerInfo[i].gitHubUname === 'Not Provided')
                {
                    engineerInfo[i].gitHubUname = 'Not Provided';
                    
                }
                const engineerObj = new Engineer(engineerInfo[i].name, engineerInfo[i].id, engineerInfo[i].email, engineerInfo[i].gitHubUname);
                employees.push(engineerObj);
            }
        }
        const wantInternDetails = await inquirer.prompt([
            {
                type : 'confirm',
                message : 'Do you want to enter Intern details ?',
                name : 'wantToEnterIntern'
            }
        ]);
        if (wantInternDetails.wantToEnterIntern === true) {
            const internInfo = await getInternsDetails();
            for (let i = 0; i < internInfo.length; i++) {
                if(internInfo[i].school === 'Not Provided')
                {
                    internInfo[i].school = 'Not Provided';
                    
                }
                const internObj = new Intern(internInfo[i].name, internInfo[i].id, internInfo[i].email, internInfo[i].school);
                employees.push(internObj);
            }
        }
       
        const html = renderer.render(employees);
        //check if the output folder exists or not . If not exists ,below code  creates the folder.
        if (!fs.existsSync(OUTPUT_DIR)) //fs.existsSync(OUTPUT_DIR) returns false if the directory doesnot exist
        {
            fs.mkdirSync(OUTPUT_DIR);
        }
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
            name: 'name',
            validate: function (val) {
                return validateName(val);
            }
        },
        {
            type: 'input',
            message: 'Enter manager id ?',
            name: 'id',
            validate: function (value) {
                return validateNumber('id',value);
            }
        },
        {
            type: 'input',
            message: 'Enter manager email address ?',
            name: 'email',
            validate: function (email) {
                //Regular Expression (Not accepts second @ symbol before the @gmail.com and accepts everything else) 
                return validateEmail(email);
            }
        },
        {
            type: 'input',
            message: 'Enter manager office number?',
            name: 'officeNumber',
            validate: function (value) {
                return validateNumber('officeNumber',value);
            }
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
            name: 'name',
            validate: function (val) {
                return validateName(val);
            }
        },
        {
            type: 'input',
            message: 'Enter Engineer id ?',
            name: 'id',
            validate: function (value) {
                return validateNumber('id',value);
            }
        },
        {
            type: 'input',
            message: 'Enter Engineer email address ?',
            name: 'email',
            // validate : function(val){
            //     var valid = /[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}/igm;
            //     return valid || "Please enter a valid email !!";
            // }
            validate: function (email) {
                return validateEmail(email);
            }
        },
        {
            type: 'input',
            message: 'Enter Engineer GitHub Username?',
            name: 'gitHubUname',
            default: 'Not Provided'
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
            name: 'name',
            validate: function (val) {
                return validateName(val);
            }
        },
        {
            type: 'input',
            message: 'Enter Intern id ?',
            name: 'id',
            validate: function (value) {
                return validateNumber('id',value);
            }
        },
        {
            type: 'input',
            message: 'Enter Intern email address ?',
            name: 'email',
            validate: function (email) {
                return validateEmail(email);
            }
        },
        {
            type: 'input',
            message: 'Enter Intern School?',
            name: 'school',
            default: 'Not Provided'
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

function validateEmail(email) {
    //Regular Expression (Not accepts second @ symbol before the @gmail.com and accepts everything else) 
    var regexp = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    var valid = regexp.test(String(email));
    // Converting the email to lowercase 
    // return regexp.test(String(email).toLowerCase()); 
    return valid || 'Please enter email address in the format \"test@test.com\"';
}

function validateName(val) {
    var regName = /^[a-zA-Z]+ [a-zA-Z]+$/;
    var valid = regName.test(val);
    return valid || 'Please Enter valid name. Ex : <First name> <Last Name> !!';
}

function validateNumber(type,value) {
    // var valid = !isNaN(parseFloat(value));
    var numbers = /^[0-9]+$/;
    var valid = numbers.test(value);
    var message='';
    if(type === 'id')
    {
        message = "Please enter a positive integer for valid ID";
    }
    else {
        message = "Please enter a positive integer for valid Office Number";

    }
    return valid || message;
}

init();