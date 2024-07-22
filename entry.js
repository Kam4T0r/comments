const express = require('express');
const app = express();
const bodyParser = require('body-parser')
const path = require('path');
const mysql = require('mysql');

var con = mysql.createConnection(
    {
        host: "localhost",
        user: "root",
        password: "",
        database: "leave_a_comment"
    });

app.use(bodyParser.urlencoded({extended: true}));

app.listen(5555,() =>
    {
        console.log('starting app on port 5555');
    });

app.get('/',(req,res)=>
    {
        res.sendFile(path.join(__dirname,"/public/index.html"));
    });
app.post('/',(req,res)=>
    {
        function next()
            {
                const usersMessages = [];
                con.query("SELECT username, comment FROM comments",(err, results, fields)=>
                    {
                        if (err) throw err;
                        let i = 0;
                        while (true)
                            {
                                if (results[i] != undefined)
                                    {
                                        usersMessages[i] = `USERNAME: ${results[i].username} MESSAGE: ${results[i].comment}`;
                                        i++;
                                    }
                                else
                                {
                                    break;
                                }
                            };
                            res.send(`
        <!DOCTYPE html>
        <html>
            <head>
                <title>View other users messages</title>
            </head>
            <body>
                <h1 id="title">Here are all the messages that users left</h1>
                <p id="usersMessages">${usersMessages.join(`<br><br>`)}</p>
            </body>
            <style>
                body
                {
                    font-family: sans-serif;
                    text-align: center;
                    background-color: honeydew;
                }
                #title
                {
                    font-size: 3.5rem;
                }
                #usersMessages
                {
                    font-size: 1.5rem;
                }
            </style>
        </html>
        `);
                    });
                
            };
        var name = JSON.stringify(req.body.username);
        var msg = JSON.stringify(req.body.message);
        console.log(`name: ${name} \nmessage: ${msg}`);
        con.query(`INSERT INTO comments (comment, username) VALUES (${msg}, ${name})`);
        next();
    });