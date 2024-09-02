const db = require("../config/config");

function traerEstudiantes(callback){
    const consultarEstudiantes = "SELECT * FROM estudiante";
    db.query(consultarEstudiantes, (err,resultado)=>{
        if(err){
            console.log("Consulta NO realizada :(")
        }else{
            callback(resultado)
        }
    })
}
function agregarEstudiante(newEstudiante, callback){
    let iEstudiante =  "INSERT INTO estudiante (nombre, apellidos, telefono, direccion, medioTransporte) VALUES (?,?,?,?,?)"
    db.query(iEstudiante,[newEstudiante.nombre, newEstudiante.apellidos, newEstudiante.telefono, newEstudiante.direccion, newEstudiante.medioTransporte], (err,resultado)=>{
        if(err){
            console.log("Estudiante no agregado :)")
        }
        else{
            callback(resultado)
        }
    });
}
function eliminarEstudiante(estudianteid,callback){
    const queryEliminar = "DELETE FROM estudiante WHERE id=?";
    db.query(queryEliminar, [estudianteid],(err, resultado)=>{
        if(resultado.affectedRows==0){
            console.log("Error al eliminar estudiante")
        }else if(resultado.affectedRows > 0){
            callback(resultado)
        }
    })
}
function actualizarEstudiante(estudianteId, newDataEstudiante,callback){
    const queryActualizar = "UPDATE estudiante SET nombre=?, apellidos=?, telefono=?, direccion=?, medioTransporte=? WHERE id=?";
    db.query(queryActualizar, [newDataEstudiante.nombre, newDataEstudiante.apellidos, newDataEstudiante.telefono, newDataEstudiante.direccion, newDataEstudiante.medioTransporte, estudianteId], (err,resultado)=>{
        if(resultado.affectedRows==0){
            console.log("Error al actualizar estudiante")
        }else if(resultado.affectedRows>0){
            callback(resultado)
        }
    })
}
module.exports = {traerEstudiantes, agregarEstudiante, eliminarEstudiante,actualizarEstudiante}
 