// RUTAS
const express = require('express')
const app = express();
const PORT = 3000;
app.use(express.json());
const {traerEstudiantes, agregarEstudiante, eliminarEstudiante,actualizarEstudiante} = require("./models/estudiantes")
const {traerProfesor, agregarProfesor, eliminarProfesor, actualizarProfesor} = require("./models/profesores")
const{obtenerclases, agregarClase, eliminarClase, actualizarClase} = require ("./models/estudiante_profesor.js")


//Mostrar datos
app.get('/estudiante', (req,res)=>{
    traerEstudiantes((resultado)=>{
        res.json(resultado);
    });
})
app.get('/profesor', (req,res)=>{
    traerProfesor((results)=>{
        res.send(results)
    })
})
app.get('/clases', (req,res)=>{
    obtenerclases((resultados)=>{
        res.send(resultados)
    })
})

//agregar personas
app.post('/estudiante',(req,res)=>{
    let newEstudiante = req.body
    if(!newEstudiante.nombre || !newEstudiante.apellidos || !newEstudiante.telefono || !newEstudiante.direccion ||!newEstudiante.medioTransporte){
        return res.send("¡Es necesario llenar todos los campos!")
    }
    else{
        agregarEstudiante(newEstudiante, (resultado)=>{
            res.json({Mensaje: "Bienvenido a Elite"})
        })
    }
})


app.post('/profesor', (req,res)=>{
    let newProfesor = req.body
    if(!newProfesor.nombre || !newProfesor.apellidos || !newProfesor.correo || !newProfesor.telefono || !newProfesor.materia){
        return res.send("¡Es necesario llenar todos los campos!")
    }
    else{
        agregarProfesor(newProfesor,(results)=>{
            res.json({Mensaje: "Bienvenido a Elite"})
        })
    }
})
app.post('/clases', (req,res)=>{
    let newClase = req.body
    if(!newClase.estudiante_id || !newClase.profesor_id){
        return res.send("¡Es necesario llenar todos los campos!")
    }else{
        agregarClase(newClase,(resultados)=>{
            res.json({Mensaje: "Se asignó profesor al estudiante"})
        })
    }
})

//eliminar personas
app.delete('/estudiante/:id',(req,res)=>{
    let estudianteid = req.params.id;
    eliminarEstudiante(estudianteid, (err,resultado)=>{
        if(!err){
            return res.send("Error al eliminar estudiante")
        }else{
            return res.json({Mensaje: "Estudiante eliminado exitosamente"})
        }
            
    })
})
app.delete('/profesor/:id', (req,res)=>{
    let profesorid = req.params.id;
    eliminarProfesor(profesorid, (err, results)=>{
        if(!err){
            return res.send("Error al eliminar profesor")
        }else{
            return res.json({Mensaje: "Profesor eliminado exitosamente"})
        }
    })
})
app.delete('/clase/:id',(req,res)=>{
    let claseid = req.params.id;
    eliminarClase(claseid, (err,resultados)=>{
        if(!err){
            return res.send("Error al eliminar esta clase")
        }else{
            return res.json({Mensaje: "Clase eliminada exitosamente"})
        }
    })
})
//actualizar datos
app.put('/estudiante/:id', (req,res)=>{
    let estudianteId=req.params.id;
    const newDataEstudiante = req.body;
    actualizarEstudiante(estudianteId,newDataEstudiante,(err,resultado)=>{
        if(!err){
            console.error("Error al actualizar datos del estudiante")
        }else{
            return res.json({Mensaje: "Datos del estudiante actualizados exitosamente"})
        }
    })
})
app.put('/profesor/:id', (req, res)=>{
    let profesorId=req.params.id;
    const newDataProfesor = req.body;
    actualizarProfesor(profesorId,newDataProfesor, (err, results)=>{
        if(!err){
            console.error("Error al actualizar datos del profesor")
        }else{
            return res.json({Mensaje: "Datos del profesor actualizados exitosamente"})
        }
    })
})
app.put('/clase/:id', (req,res)=>{
    let claseId=req.params.id;
    const newDataClase = req.body;
    actualizarClase(claseId,newDataClase,(err, resultados)=>{
        if(!err){
            console.error("Error al actualizar los datos de la clase")
        }else{
            return res.json({Mensaje: "Datos de la clase actualizados exitosamente"})
        }
    })
})
app.listen(PORT,()=>{
    console.log("¡SERVIDOR CORRIENDO!")
})