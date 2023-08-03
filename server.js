const express = require('express');
// Import and require mysql2
const mysql = require('mysql2');
const inquirer = require('inquirer');

const db = mysql.createConnection(
    {
      host: '127.0.0.1',
      // MySQL username,
      user: 'root',
      // TODO: Add MySQL password here
      password: 'Root1root2!',
      database: 'employee_db'
    },
    console.log(`Connected to the employee_db database.`)
  );

  const start = () => {
    inquirer
        .prompt ([
            {
                type: "list",
                message: "Select from the following options:",
                name: "start",
                choices: [
                    "View all departments",
                    "view all roles",
                    "view all employees",
                    "Add a department",
                    "Add a role",
                    "Add an employee",
                    "Upddate an employee role"

                ]
            }
        ]).then(answers => {
          switch (answers.initalize) {
            case "View all departments": viewDept();
              break;
            case "View all roles": viewRoles();
              break;
            case "View all employees": viewEmployees();
              break;
            case "Add a department": addDept();
              break;
            case "Add a role": addRole();
              break;
            case "Add an employee": addEmployee();
              break;
            case "Update an employee role": updateEmployee();
              break;
          }

        }).catch(err => console.error(err)); 
  }

  start();

  const viewDept = () => {
    db.query(`SELECT * FROM department`, (err, results) => {
      if (err) {
        console.log(err);
      }
      console.log("results", results);
      start();
    })
  };

  const viewRoles = () => {
    db.query(`SELECT * FROM roles`, (err, results) => {
      if (err) {
        console.log(err);
      }
      console.log("results", results);
      start();
    })
  };

  const viewEmployees = () => {
    db.query(`SELECT * FROM employees`, (err, results) => {
      if (err) {
        console.log(err);
      }
      console.log("results", results);
      start();
    })
  };

  const addDept = () => {
    inquirer
      .prompt([
        {
          type: "input",
          message: "What is the name of the department you'd like to add?",
          name: "addDept"
        }
      ]).then(answers => {
          db.query(`INSERT INTO department(name)
          VALUES(?)`, answers.addDept, (err, results) => {
            if (err) {
              console.log(err)
            } else{
              db.query(`SELECT * FROM department`, (err, results) => {
                if (err) {
                  console.log(err)
                }
                console.log(results);
                start();
              })
            }
            })

          })
        };

  const addRole = () => {
    const deptChoices = () => db.promise().query(`SELECT * FROM department`)
    .then ((rows) => {
      let arrayNames = rwos[0].map(obj => obj.name);
      return arrayNames
    })
  inquirer
    .prompt([
      {
        type:"input",
        message:"What is the title of the role you'd like to add?",
        name: "roleTitle"
      },
      {
        type:"input",
        message:"What is the salary for this role?",
        name: "roleSalary"
      },
      {
        type:"input",
        message:"What department is this role in?",
        name: "addDept",
        choices: deptChoices
      }

    ]).then(answers => {
      db.promise().query(`SELECT id FROM department WHERE name = ?`, answers.addDept)
        .then(answers => {
          let mappedID = answers[0].map(obj => obj.id);
          return mappedId[0]
        })
        .then((mappedId) => {
          db.promise().query(`INSERT INTO roles(title, salary, department_id)
          VALUES(?,?,?)`, [answers.roleTitle, answers.roleSalary, mappedId]);
          start()
        })
    })
  };

  const addEmployee = () => {
    inquirer
      .prompt([
        {
        type:"input",
        message:"What is the employee's first name?",
        name: "firstName"
        },
        {
          type:"input",
        message:"What is the employee's last name?",
        name: "lastName"
        },
      ]).then(answers => {
        db.query(`INSERT INTO employess(first_name, last_name)
        VALUES(?,?)`, [answeres.firstName, answeres.lastName], (err, results) => {
          if (err) {
            console.log(err)
          } else {
            db.query(`SELECT * FROM employees`, (err, results) =>{
              if (err){
                console.log(err);
              }
              console.log(results);
              start();
            })
          }
        })
      })
  }

