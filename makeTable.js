const mysql = require('mysql');

const con = mysql.createConnection(
    {
        host: "localhost",
        user: "root",
        password: "",
        database: "leave_a_comment"
    });
con.connect((err)=>
    {
        if (err) throw err;
        con.query("CREATE TABLE comments (comment VARCHAR(255), username VARCHAR(255))",(err)=>
            {
                if (err) throw err;
                console.log("created table");
            });
    });