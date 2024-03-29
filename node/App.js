const express = require('express');
const app = express();
const bodyParser = require('body-parser');
const mysql = require('mysql');

app.use(express.static("public"));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));


app.listen(3000, () => {
    console.log('grapple')
});

const conn = mysql.createConnection({
    host     : 'localhost',
    user     : 'root',
    password : 'root',
    port     : 3306,
    database : 'GRNode'
});

conn.connect();

app.post('/login', (req, res) => {
    const id = req.body.id;
    let data = [];
    
    let query = conn.query(
        `SELECT name FROM dbtest WHERE id = '${id}'`,
        async (err, rows) => {
            if(err) throw err;
            if(rows[0]){
                data.push({
                    result : true,
                    name : rows[0].name
                })
            }else{
                data.push({
                    result: false,
                    name : ''
                })
            }
            res.render('index.ejs',{data: JSON.stringify(data)});
        }
    );
    console.log(data);
});

app.post('/join', (req, res) => {
    const id = req.body.id;
    const name = req.body.name;
    let data = [];
    
    let query = conn.query(
        `INSERT INTO dbtest VALUES ('${id}','${name}')`,
        async (err) => {
            if(err) throw err;
                data.push({
                    result : true
                });
            res.render('index.ejs',{data: JSON.stringify(data)});
        }
    );
    console.log(data);
});