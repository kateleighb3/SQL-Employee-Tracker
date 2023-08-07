INSERT INTO department (dept_name)
VALUES ("Sales"),
       ("Engineering"),
       ("Finance"),
       ("Legal"),

INSERT INTO roledb (title, salary, department_id)
VALUES ("Sales Lead", 1000000, 1),
       ("Salesperson", 80000, 1),
       ("Lead Engineer", 150000, 2),
       ("Software Engineer", 120000, 2),
       ("Account Manager", 160000, 3),
       ("Accountant", 125000, 3),
       ("Legal Team Lead", 250000, 4),
       ("Lawyer", 190000, 4);
       
INSERT INTO employee (first_name, last_name, roledb_id, manager_id)
VALUES ("Stevie", "Nicks", 1, NULL),
       ("Britney", "Spears", 1, 1),
       ("Tommy", "Lee", 2, NULL),
       ("Dr.", "Dre", 2, 3),
       ("Snoop", "Dogg", 3, NULL),
       ("Lil", "Kim", 3, 5),
       ("Willy", "Nelson", 4, NULL),
       ("Mariah", "Carey", 4, 7);
       