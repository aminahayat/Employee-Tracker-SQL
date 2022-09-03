// get the dependencies
const inquirer = require('inquirer');
// get the dependencies
const inquirer = require('inquirer');


let connection;

console.log(`================`);
console.log(`Employee Tracker`);
console.log(`================`);
//main menu to begin the selection
async function mainMenu() {
    connection = await require('./config/dbconnection');

    const res = await inquirer.prompt([{
        type: 'list',
        name: 'main',
        message: 'Please pick an option: ',
        choices: ['View all departments', 'View all roles', 'View all employees', 'Add a department', 'Add a role', 'Add an employee', 'Update an employee role']
    }]);

    switch (res.main) {
        case 'View all departments':
            await Departments();
            break;
        case 'View all roles':
            await Roles();
            break;
        case 'View all employees':
            await Employees();
            break;
        case 'Add a department':
            await addDepartment();
            break;
        case 'Add a role':
            await addRole();
            break;
        case 'Add an employee':
            await addEmployee();
            break;
        case 'Update an employee role':
            await updateEmployee();
            break;
    }
}
// get departments from database
async function Departments() {
    const [getRows, fields] = await connection.execute('SELECT * FROM departments ORDER BY id');
    console.table(getRows);

    mainMenu();
}

//get roles from database
async function Roles() {
    const [getRows, fields] = await connection.execute('SELECT * FROM roles');
    console.table(getRows);

    mainMenu();
}

//get employees from database
async function Employees() {
    const [getRows, fields] = await connection.execute('SELECT * FROM employees');
    console.table(getRows);

    mainMenu();
}
 
async function addDepartment() {
    const res = await inquirer.prompt([{
        type: 'input',
        name: 'newDepartment',
        message: "What is the new department's name?",
    }]);

    try {
        await connection.query('INSERT INTO departments (department_name) VALUE (?)',
            [
                res.newDepartment
            ]);

        console.log(`${(res.newDepartment)} successfully added.\n`);
    } catch (e) {
        console.log(`Department '${res.newDepartment}' already exists.\n`);
    }

    mainMenu();
}

async function addRole() {
    let departments = {};

    const [getRows, fields] = await connection.query('SELECT * FROM departments');

    getRows.forEach((role) => {
        departments[role.department_name] = role.id;
    });

    displayAddRole(departments);
}

async function displayAddRole(departments) {
    const res = await inquirer.prompt([{
            type: 'input',
            name: 'newRoleName',
            message: 'role name please?'
        },
        {
            type: 'number',
            name: 'newRoleSalary',
            message: 'salary for this role?'
        },
        {
            type: 'list',
            name: 'newRoleDepartment',
            message: 'which department is this role in?',
            choices: Object.keys(departments)
        }
    ]);

    try {
        await connection.query('INSERT INTO roles (title, salary, department_id) VALUE (?, ?, ?)',
            [
                res.newRoleName,
                res.newRoleSalary,
                departments[res.newRoleDepartment]
            ]);
        console.log(`${(res.newRoleName)} successfullly added. \n`);
    } catch (e) {
        console.log(`Role '${res.newRoleName}' already exists. \n`);
    }

    mainMenu();
}

async function getEmployees() {
    let employees = {};

    const [employeeRows] = await connection.query('SELECT id, CONCAT(last_name, ", ", first_name) AS name FROM employees ORDER BY last_name, first_name');

    employeeRows.forEach((employee) => employees[employee.name] = employee.id);
     console.log(employees);
    return employees;

}

// Get list of roles
async function getRoles() {
    let roles = {};

    const [roleRows] = await connection.query('SELECT * FROM roles');

    roleRows.forEach((role) => roles[role.title] = role.id);

    return roles;
}
// add employee 
async function addEmployee() {
    const roles = await getRoles();
    const employees = {
        None: null,
        ...(await getEmployees())
    };

    addEmployeePrompt(roles, employees);
}

// Add new Employee
async function addEmployeePrompt(roles, employees) {
    const res = await inquirer.prompt([{
            type: 'input',
            name: 'firstName',
            message: "please enter employee's first name?"
        },
        {
            type: 'input',
            name: 'lastName',
            message: "please enter employee's last name?"
        },
        {
            type: 'list',
            name: 'employeeRole',
            message: "please enter employee's role?",
            choices: Object.keys(roles)
        },
        {
            type: 'list',
            name: 'employeeManager',
            message: "please enter employee's manager?",
            choices: Object.keys(employees)
        }
    ]);
    try {
        await connection.query('INSERT INTO employees (first_name, last_name, role_id, manager_id) VALUE (?, ?, ?, ?)',
            [
                res.firstName,
                res.lastName,
                roles[res.employeeRole],
                employees[res.employeeManager]
            ]);

        console.log(`${(res.firstName)} ${(res.lastName)} was added successfully. \n`);
    } catch (e) {
        console.log(e.message);
    }
    mainMenu();
}
// update employee
async function updateEmployee() {
    console.log('update employee');

    const employees = await getEmployees();
    const roles = await getRoles();

    updateEmployeePrompt(employees, roles);
}

// add employee questions to update
async function updateEmployeePrompt(employees, roles) {
    const res = await inquirer.prompt([{
            type: 'list',
            name: 'updateAnEmployee',
            message: 'What employee would you like to update?',
            choices: Object.keys(employees)
        },
        {
            type: 'list',
            name: 'updatedRole',
            message: 'What is the updated role for this employee?',
            choices: Object.keys(roles)
        }
    ]);
    try {
        await connection.query('UPDATE employees SET role_id = ? WHERE id = ?',
            [
                roles[res.updatedRole],
                employees[res.updateAnEmployees]
            ]);
        console.log(`updated successfully.`);
    } catch (e) {
        console.log(e.message);
    }

    mainMenu();
}


mainMenu();