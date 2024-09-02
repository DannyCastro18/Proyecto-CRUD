const db = require ('../config/config.js')


function traerProfesor(callback){
    const consultarProfesores = "SELECT * FROM profesor";
    db.query(consultarProfesores, (err, results)=>{
        if(err){
            console.log("Consulta no realizada :(")
        }else{
            callback(results)
        }
    })
}
function agregarProfesor(newProfesor, callback){
    let iProfesor = "INSERT INTO profesor (nombre, apellidos, correo, telefono, materia) VALUES (?,?,?,?,?)"
    db.query(iProfesor, [newProfesor.nombre, newProfesor.apellidos, newProfesor.correo, newProfesor.telefono, newProfesor.materia], (err,results)=>{
        if(results.affectedRows==0){
            console.log("Profesor no agregado :)")
        }
        if(results.affectedRows>0){
            callback(results)
        }
    })
}
function eliminarProfesor(profesorid, callback){
    const queryEliminar = "DELETE FROM profesor WHERE id=?";
    db.query(queryEliminar, [profesorid], (err, results)=>{
        if(results.affectedRows==0){
            console.log("Error al eliminar profesor")
        }else if(results.affectedRows>0){
            callback(results)
        }
    })
}
function actualizarProfesor(profesorId, newDataProfesor, callback){
    const queryActualizar = "UPDATE profesor SET nombre=?, apellidos=?, correo=?, telefono=?, materia=? WHERE id=?";
    db.query(queryActualizar, [newDataProfesor.nombre, newDataProfesor.apellidos, newDataProfesor.correo, newDataProfesor.telefono, newDataProfesor.materia, profesorId], (err, results)=>{
        if(results.affectedRows==0){
            console.log("Error al actualizar profesor")
        }if(results.affectedRows>0){
            callback(results)
        }
    })
}
module.exports = {traerProfesor, agregarProfesor, eliminarProfesor, actualizarProfesor}