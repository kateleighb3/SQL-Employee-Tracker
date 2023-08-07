const inquirer = require('inquirer');
const mysql = require('mysql2');
const consoleTable = require('console.table');

const connection = mysql.createConnection({
    host: '127.0.0.1',
    port: 3306,
    user: "root",
    password: "Root1root2!",
    database: "employee_DB"
})

connection.connect((err) => {
    if (err) {
        console.error(`error connecting`, err.stack);
        return
    }
    console.log(`connected as id ${connection.threadId}`);
})

function initialPrompt() {

    inquirer.prompt([{
        message: 'What would you like to do?',
        type: 'list',
        name: 'choice',
        choices: [
            'View All Employees',
            'View All Employees by Department',
            'View All Employees by Role',
            'Add Employee',
            'Add Role',
            'Add Department',
            'Update Employee Role',
            'View All Roles',
            'View All Departments',
            'Exit Program'
        ]
    }])
        .then((answers) => {
            if (answers.choice === 'View All Employees') {
                viewAllEmployees();
            } else if (answers.choice === 'View All Employees by Department') {
                viewByDept();
            } else if (answers.choice === 'View All Employees by Role') {
                viewByRole();
            } else if (answers.choice === 'Add Employee') {
                addEmployee();
            } else if (answers.choice === 'Add Role') {
                addRole();
            } else if (answers.choice === 'Add Department') {
                addDept();
            } else if (answers.choice === 'Update Employee Role') {
                updateEmployeeRole();
            } else if (answers.choice === 'View All Roles') {
                viewRoles();
            } else if (answers.choice === 'View All Departments') {
                viewDepts();
            }

            else if (answers.choice === 'Exit Program') {
                exit();
            }
        })
      }

initialPrompt();

function exit() {
    connection.end();
}