DROP DATABASE IF EXISTS employeetrack;
CREATE DATABASE employeetrack;
USE employeetrack;

CREATE TABLE departments (
    id INTEGER PRIMARY KEY AUTO_INCREMENT,
    department_name VARCHAR(30) NOT NULL UNIQUE
);

CREATE TABLE roles (
    id INTEGER PRIMARY KEY AUTO_INCREMENT,
    title VARCHAR(30) NOT NULL,
    salary DECIMAL (10, 2) NOT NULL,
    department_id INTEGER,
    FOREIGN KEY (department_id) REFERENCES departments(id)

);

CREATE TABLE employees (
    id INTEGER PRIMARY KEY AUTO_INCREMENT,
    first_name VARCHAR(30) NOT NULL,
    last_name VARCHAR(30) NOT NULL,
    role_id INTEGER,
    manager_id INTEGER,
    FOREIGN KEY (manager_id) REFERENCES employees(id),
    FOREIGN KEY (role_id) REFERENCES roles(id)
);