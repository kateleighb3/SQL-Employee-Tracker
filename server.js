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
      };

initialPrompt();

function viewAllEmployees() {
    connection.query(`SELECT employee.first_name, 
            employee.last_name,
            roledb.title AS Title,
            roledb.salary AS Salary,
            department.dept_name AS Department
        FROM employee 
            INNER JOIN roledb ON employee.roledb_id=roledb.roledb_id
            INNER JOIN department ON employee.roledb_id=department.department_id`, (err, result) => {
        if (err) throw err;
        console.table(result);

    })
    initialPrompt();
}

function viewByDept() {
    inquirer.prompt([{
        message: "Which department would you like to view?",
        type: 'list',
        name: 'dept',
        choices: [
            'Engineering',
            'Management',
            'Marketing',
            'Legal',
            'Sales'
        ]
    }])
        .then((answers) => {
            connection.query(`SELECT 
            employee.first_name,
            employee.last_name,
            department.dept_name AS Department
        FROM employee
            INNER JOIN roledb ON employee.roledb_id=roledb.roledb_id     
            INNER JOIN department ON employee.roledb_id=department.department_id
            WHERE department.dept_name='${answers.dept}'`, (err, result) => {
                if (err) throw err;
                console.table(result);

            })
            initialPrompt();
        })

}

function viewByRole() {
    inquirer.prompt([{
        message: "Which roles would you like to view?",
        type: 'list',
        name: 'role',
        choices: [
            'Junior Developer',
            'Senior Developer',
            'Manager',
            'Sales Lead',
            'Lawyer',
            'Designer'
        ]
    }])
        .then((answers) => {
            connection.query(`SELECT 
            employee.first_name,
            employee.last_name,
            roledb.title AS Title
        FROM employee
            INNER JOIN roledb ON employee.roledb_id=roledb.roledb_id     
            INNER JOIN department ON employee.roledb_id=department.department_id
            WHERE roledb.title='${answers.role}'`, (err, result) => {
                if (err) throw err;
                console.table(result);

            })
            initialPrompt();
        })

}

function addEmployee() {

    let roles = [
        'Junior Developer',
        'Senior Developer',
        'Manager',
        'Sales Lead',
        'Lawyer',
        'Designer'
    ];

    inquirer.prompt([
        {
            message: "What would be the employee's role?",
            type: 'list',
            name: 'role',
            choices: roles
        },
        {
            message: "What is the employees first name?",
            type: 'input',
            name: 'firstName',
        },
        {
            message: "What is the employees last name?",
            type: 'input',
            name: 'lastName',
        },

    ])
        .then((answers) => {

            connection.query(`
             INSERT INTO employee SET ?`,
                {
                    first_name: answers.firstName,
                    last_name: answers.lastName,
                    roledb_id: roles.indexOf(answers.role) + 1 
                },

                (err, result) => {
                    if (err) throw err;
                })
            console.log(answers.role);

        })
    initialPrompt();

}

function addRole() {
    inquirer.prompt([
        {
            message: "What is the name of the role you wish to add?",
            type: 'input',
            name: 'newRole'
        },
        {
            message: "What is the yearly salary of the role?",
            type: 'input',
            name: 'salary'
        },
    ]).then((answers) => {
        connection.query(`
             INSERT INTO roledb SET ?`,
            {
                title: answers.newRole,
                salary: answers.salary,
            },
            (err, result) => {
                if (err) throw err;

            })

    })
    exit();
}

function addDept() {
    inquirer.prompt([
        {
            message: "What is the name of the Department?",
            type: 'input',
            name: 'newDept'
        },
    ])
        .then(answers => {
            connection.query(`
             INSERT INTO department SET ?`,
                {
                    name: answers.newDept,
                },
                (err, result) => {
                    if (err) throw err;

                })

        })
    exit();
}

function updateEmployeeRole() {
    let employees = [
        'Jerry Seinfeld',
        'George Constanza',
        'Elaine Benes',
        'Cosmo Kramer',
        'Rachel Green',
        'Phoebe Boufay',
        'Chandler Bing',
        'Joey Tribiani',
        'Ross Gellar',
        'Monica Gellar'
    ];

    let roles = [
        'Junior Developer',
        'Senior Developer',
        'Manager',
        'Sales Lead',
        'Lawyer',
    ];

    inquirer.prompt([
        {
            message: "Which Employee do you wish to update?",
            type: 'list',
            name: 'employee',
            choices: employees
        },
        {
            message: "What is his/her new role?",
            type: 'list',
            name: 'role',
            choices: roles
        }
    ])
        .then(answers => {
            connection.query(`
            UPDATE employee_DB.employee 
            SET roledb_id = '${roles.indexOf(answers.role) + 1}' WHERE (employee_id = '${employees.indexOf(answers.employee) + 1}');`,
                (err, result) => {
                    if (err) throw err;
                    console.log(result);
                })

        })

}

function viewRoles() {
    connection.query(`SELECT * FROM employee_DB.roledb`, (err, result) => {
        if (err) throw err;
        console.table(result);
    })
    initialPrompt();
}

function viewDepts() {
    connection.query(`SELECT * FROM employee_DB.department`, (err, result) => {
        if (err) throw err;
        console.table(result);
    })
    initialPrompt();
}

function exit() {
    connection.end();
}