const mysql = require("mysql2");
const db=mysql.createConnection({
    host:"localhost",
    user:"root",
    password:"CTPI2024*",
    database:"escuela"
});
db.connect((e) => {
    if(e){
        console.log("Error en la conexión")
    }
    else{
        console.log("Conexión exitosa a MySQL")
    }
})
module.exports = db;