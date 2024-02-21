
const express = require('express');
const bodyParser = require('body-parser');
const mysql = require('mysql2');
const cors = require('cors');

const app = express();
const port = 3001;
app.use(cors());

app.use(bodyParser.json());

const connection = mysql.createConnection({
  host: 'localhost',
  user: 'root',
  password: 'ASmitha@11',
  database: 'e_s',
});

connection.connect((err) => {
  if (err) {
    console.error('Error connecting to MySQL:', err);
  } else {
    console.log('Connected to MySQL database');
  }
});

app.post('/submit', (req, res) => {
  const {
    name,
    employeeId,
    department,
    dob,
    gender,
    designation,
    salary,
  } = req.body;


  const sql = `INSERT INTO employees (name, employee_id, department, dob, gender, designation, salary)
               VALUES (?, ?, ?, ?, ?, ?, ?)`;

 connection.query(sql, [name, employeeId, department, dob, gender, designation, salary], (err, results) => {
  if (err) {
    console.error('Error inserting into database:', err);
    res.status(500).json({ message: 'Internal Server Error', error: err.message });
  } else {
    console.log('Employee added successfully!');
    res.json({ message: 'Employee added successfully!' });
  }
});
});

app.listen(port, () => {
  console.log(`Server is running on http://localhost:${port}`);
});
