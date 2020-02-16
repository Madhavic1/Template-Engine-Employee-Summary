// TODO: Write code to define and export the Employee class
class Employee {
    constructor(name,id,email){
        this.name = name;
        this.id = id;
        this.email = email;
    }

    //getName() method returns the name of the employee
    getName()
    {
        return this.name;
    }
    getId()
    {
        return this.id;
    }
    getEmail()
    {
        return this.email;  
    }
    getRole(){
return this.constructor.name;
    }
}
module.exports = Employee;