DROP DATABASE IF EXISTS employee_DB;

CREATE DATABASE employee_DB;

USE employee_DB;

CREATE TABLE department (
    department_id INT NOT NULL AUTO_INCREMENT PRIMARY KEY,
    dept_name VARCHAR(255) NOT NULL
);

CREATE TABLE roledb (
    roledb_id INT NOT NULL AUTO_INCREMENT PRIMARY KEY,
    title VARCHAR(255) NOT NULL, 
    salary DECIMAL,
    department_id INT,
    FOREIGN KEY (department_id) REFERENCES department(department_id)
);

CREATE TABLE employee (
    employee_id INT NOT NULL AUTO_INCREMENT PRIMARY KEY,
    first_name VARCHAR(255) NOT NULL, 
    last_name VARCHAR(255) NOT NULL,
    roledb_id INT,
    manager_id INT,
    FOREIGN KEY (roledb_id) REFERENCES role(roledb_id),
    FOREIGN KEY (manager_id) REFERENCES department(department_id)
)

--SELECTS and JOINS the id's from the Role and Department tables together into one result.
SELECT employee.first_name, 
	employee.last_name,
	role.title AS Title,
    role.salary AS Salary,
    department.dept_name AS Department
FROM employee 
	INNER JOIN role ON employee.role_id=roledb.roledb_id
    INNER JOIN department ON employee.roledb_id=department.department_id
