const express = require('express');
const mysql = require("mysql2");
const cors = require('cors');
const bodyParser = require('body-parser');
const port = process.env.PORT || 3001;

const app = express();
app.use(bodyParser.json());

const corsOptions = {
    origin : 'http://localhost:3000',
    optionSuccessStatus : 200
};
app.use(cors(corsOptions));

const connection = mysql.createConnection ({
    host : 'localhost',
    user : 'root',
    password : 'L@mborgh!n!700',
    database : 'portfolio'
});

connection.connect((err) => {
    if(err) {
        console.log("Database connection error",err);
        return;
    };
    console.log("Database connected successfully");
});

app.listen(port, () => {
    console.log("App listening to port : ", port);
});

app.post('/api/contact', (req,res) => {
    const { name, number, email, message } = req.body;

    if(!name || !number || !email) {
        return res.status(400).json({ error: "Name, Number and Email are required, where as message is optional" });
    };

    const insertQuery = "insert into contact (name, phoneNum, email, message) values (?,?,?,?)";
    const values = [name, number, email, message];

    connection.query(insertQuery, values, (err, result) => {
        if(err) {
            console.log("Error inserting data into the database",err);
            return res.status(500).json({error: "Unable to insert data into the database"});
        };
        console.log('Data inserted successfully');
        res.status(200).json({message: "Data inserted successfully"});
    });
});