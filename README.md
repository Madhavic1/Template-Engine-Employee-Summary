# Template-Engine-Employee-Summary

A command-line application that builds a software engineering team generator.

## table of contents

- Introduction / General Information
- Languages used
- Installation
- Launch
- Sources to read

### Introducion (Aim of the project) / General Information:

This is a Node CLI that takes in information about employess and generates an HTML webpage that displays summaries for each person.
The user will be prompted to enter a manager and any number of engineers and interns. Since each employee has slightly different information, different questions will be asked to the user depending on the employee type. 
The user will be prompted to answer the following details, if the employee type is:

Manager :
1. Manager name, in the format of <first-name> <last-name>.
2. Manager id, a positive integer.
3. Email address, in the format of <test@test.com>.
4. Office Number, a positive integer.

Engineer :
1. Engineer name, in the format of <first-name> <last-name>.
2. Engineer id, a positive integer.
3. Email address,  in the format of <test@test.com>.
4. Github username, if not provided the name will be displayed on the document as "Not Provided".

Intern :
1. Intern name, in the format of <first-name> <last-name>.
2. Intern  id, a positive integer.
3. Email address,  in the format of <test@test.com>.
4. School name,  if not provided the school name will be displayed on the document as "Not Provided".

After the user has input all the employees desired , a HTML web page will be created in the ./output folder, which summarises all the details for each person.

In this application , in order to write the code that is readable, reliable and maintainable , the javascript's brand of Object Oriented Programming is used. All the classes Manager, Engineer and Intern inherit from the super class Employee and share its properties and methods to avoid the duplication of code. All the classes passed the tests mentioned in the /test/ folder. 

  ### Languages used:
  1. HTML
  2. CSS
  3. JavaScript
  4. Node.js
  5. npm - Node package manager (below packages are installed from npm)
     - inquirer


### Installation:

    1. Prerequesite is to have Node.js installed on your computer
    2. Un-compress the file Template-Engine-Employee-Summary.zip
    3. Move the directory Template-Engine-Employee-Summary to a source directory(to keep the code away from regular documents)
    4. Open console and open the source directory path and install npm using 'npm install'.
    5. install all the npm packages by using the command 'npm install <package name>'
    6. Run the test cases using npm run test

### Launch:

    Execute the command , node app.js . It will create the pdf profile in the source directory.

### Sources to read

    To get better knowledge of the languages used in this project , you can refer the below resources.
    * https://www.w3schools.com/
    * https://www.freecodecamp.org/
    * https://www.npmjs.com/
