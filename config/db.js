const mysql = require("mysql2");


const connection = mysql.createPool({
 host:'localhost',
 user:'root',
 database:'voting_db',
 password:'password'


})

module.exports = connection;