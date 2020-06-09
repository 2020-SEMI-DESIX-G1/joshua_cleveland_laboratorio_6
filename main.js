const express = require('express')
const bodyParser = require('body-parser');
const multer = require('multer');
const app = express();
const port = 3000;
const typeorm = require("typeorm"); 
const Estudiantes = require("./students.js").Estudiantes;
const options={
    type: "sqlite",
    database: `database.sqlite`,
    logging: true,
    synchronize: true,
    entities: [
        require("./studentsSchema")
    ]
};

let connectionsqlit = typeorm.createConnection(options);



// for parsing application/json
app.use(bodyParser.json()); 


// for parsing multipart/form-data
const upload = multer();
app.use(upload.array()); 
app.use(express.static('public'));


app.get('/estudiantes/', (req, res) => {
    let conection = connectionsqlit;
    conection.then(function (connection) {
        let postRepository = connection.getRepository(Estudiantes).find();
        postRepository.then(function (data){
            res.status(200).json(data);
        })
        
    }).catch(function(err) { res.status(400).json(err);}); 
});

app.get('/estudiantes/:idestuduante', (req, res) => {

    let conection = connectionsqlit;
    conection.then(function (connection) {
        let postRepository = connection.getRepository(Estudiantes).findOneOrFail(req.params.idestuduante);
        postRepository.then(function (data){
            res.status(200).json(data);
        }).catch(function(err) { res.status(400).json(err);}); 
        
    }).catch(function(err) { res.status(400).json({message:'estudiante no encontrado'});}); 
});

app.post('/estudiantes/', (req, res) => {
    let conection = connectionsqlit;
    conection.then(function (connection) {
        let est=new Estudiantes();
        est.nombre=req.body.nombre;
        est.apellido=req.body.apellido;
        est.grado=req.body.grado;
        console.log(connection.manager);
        connection.manager
        .save(est)
        .then((data) => {
            res.status(200).json(data);
        }).catch(
            function(err) { res.status(400).json(err); 
        });
    }).catch(function(err) { res.status(400).json(err);}); 
});

app.delete('/estudiantes/:idestuduante', (req, res) => {
    let conection = connectionsqlit;
    conection.then(function (connection) {
        let postRepository = connection.getRepository(Estudiantes).delete(parseInt(req.params.idestuduante));
        postRepository.then(function (data){
            res.status(200).json({message:'estudiante eliminado'});
        });
    }).catch(function(err) { 
        console.log(err);
        res.status(400).json({message:'estudiante no eliminado'});
    }); 
});

app.put('/estudiantes/:idestuduante', (req, res) => {
    let conection = connectionsqlit;
    conection.then(function (connection) {
        let repo = connection.getRepository(Estudiantes);//
        let est=new Estudiantes();
        
        let find=repo.findOneOrFail(req.params.idestuduante);
        find.catch(function(err) { 
            console.log(err);
            res.status(400).json({message:'estudiante no encontrado'});
            return;
        }); 

        est.id=parseInt(req.params.idestuduante);
        est.nombre=req.body.nombre;
        est.apellido=req.body.apellido;
        est.grado=req.body.grado;
        console.log(est);
        repo.save(est).then(function (data){
            res.status(200).json(data);
        });

        
    }).catch(function(err) { 
        console.log(err);
        res.status(400).json({message:'estudiante no actualizado'});
    }); 
});

app.listen(port, () => console.log(`Example app listening at http://localhost:${port}`))