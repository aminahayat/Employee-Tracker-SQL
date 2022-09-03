INSERT INTO departments (department_name)
VALUES
    ('Sales'),
    ('Software'),
    ('Accountant'),
    ('Legal');

INSERT INTO roles (title, salary, department_id)
VALUES
    ('Sales Consultant', 100000, 1),
    ('Azure Specialist', 80000, 1),
    ('Lead Engineer', 170000, 2),
    ('Software Engineer', 150000, 2),
    ('Project Manager', 190000, 3),
    ('Accountant', 130000, 3),
    ('Legal Team Lead', 230000, 4),
    ('Scrum Master', 200000, 4);

INSERT INTO employees (first_name, last_name, role_id, manager_id)
VALUES
    ('Amina', 'Hayat', 3, null),
    ('Amelia', 'Amelie', 1, 1),
    ('Nadia', 'Hassan', 2, null),
    ('Kevin', 'Mcallaster', 4, 1),
    ('Tory', 'Lanez', 5, 2),
    ('Keri', 'Hilson', 6, null),
    ('Trey', 'Songz', 7, 3),
    ('Tom', 'Carry', 8, 3);