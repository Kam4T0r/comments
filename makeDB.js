const mysql = require('mysql');

var con = mysql.createConnection(
    {
        host: "localhost",
        user: "root",
        password: ""
    });
con.connect((err)=>
    {
        if (err) throw err;
        con.query("CREATE DATABASE leave_a_comment",(err)=>
            {
                if (err) throw err;
                console.log("created db"); 
            });
    });