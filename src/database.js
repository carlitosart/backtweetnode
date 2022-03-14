const mysql = require('mysql');

const mysqlConnection = mysql.createConnection({
    host: 'localhost',
    user: 'root',
    password: 'ABCabc123',
    database: 'tweetdb'
})

mysqlConnection.connect(function (err){
    if(err){
        console.log(err);
        return;
    }else{
        console.log('DB CONNECTED!')
    }
});

module.exports = mysqlConnection;