const Employee = require("../lib/Employee");

class Engineer extends Employee{
    constructor(name,id,email,gitHubUname){
        super(name,id,email);
        this.github = gitHubUname;
    }

    getRole(){
        return this.constructor.name;
    }

    getGithub()
    {
        return this.github;
    }
}


module.exports = Engineer;