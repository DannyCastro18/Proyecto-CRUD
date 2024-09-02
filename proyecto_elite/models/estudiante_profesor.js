const db = require('../config/config')

function obtenerclases(callback){
    const consultarClases = "SELECT * FROM estudiante_profesor";
    db.query(consultarClases, (err, resultados)=>{
        if (err){
            console.log("Consulta no realizada :'(")
        }else{
            callback(resultados)
        }
    })
}

function agregarClase(newClase, callback){
    let iClase = "INSERT INTO estudiante_profesor (estudiante_id, profesor_id) VALUES (?,?)"
    db.query(iClase, [newClase.estudiante_id, newClase.profesor_id], (err, resultados)=>{
        if(err){
            console.log("Profesor no fue asignado a estudiante")
        }else{
            callback(resultados)
        }
    })
}
function eliminarClase(claseid, callback){
    const queryEliminar = "DELETE FroM estudiante WHERE id=?";
    db.query(queryEliminar,[claseid], (err, resultados)=>{
        if(resultados.affectedRows==0){
            console.log("Error al eliminar esta clase")
        }else if(resultados.affectedRows>0){
            callback(resultados)
        }
            
        
    })
}
function actualizarClase(claseId, newDataClase, callback){
    const queryActualizar = "UPDATE clase SET estudiante_id=?, profesor_id=? WHERE id=?";
    db.query(queryActualizar, [newDataClase.estudiante_id, newDataClase.profesor_id], (err, resultados)=>{
        if(resultados.affectedRows==0){
            console.log("Error al actualizar datos de la clase")
        }else if(resultados.affectedRows>0){
            callback(resultados)
        }
    })
}
module.exports = {obtenerclases, agregarClase, eliminarClase, actualizarClase}