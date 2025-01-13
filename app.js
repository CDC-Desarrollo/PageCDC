const express=require('express');
const app=express();
const path=require('path');
const mysql2 =require('mysql2');
const fs =require('fs');
const nodemailer = require("nodemailer");
const cors=require('cors');
const multer = require('multer');

require('dotenv').config();

app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(express.static(path.join(__dirname, 'Public')));
app.use(express.static(path.join(__dirname, 'Data')));

app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, 'Views'))


const IMAGES_DIR = path.join(__dirname, 'public/images');

const connection=mysql2.createConnection({
    host:process.env.DB_Host,
    user:process.env.DB_User,
    password:process.env.DB_Password,
    database:process.env.DB_Name
})
connection.connect((err) => {
    if (err) {
      return console.error('Error conectando: ' + err.stack);
    }
    console.log('Conexion creada con exito');
  })
  

app.get('/', (req,res)=>{
    res.render('home');
});

app.get('/Prueba', (req,res)=>{
    res.render('Prueba');
});


app.get('/Admin', (req,res)=>{
    res.render('InicioAdmin');
});

app.get('/Admin/Inicio', (req,res)=>{
    res.render('Administrador');
});

app.get('/VerEstadosActivos',(req,res)=>{
    connection.execute(
        'select * from vista_EstadosActivos',
        (err, results) => {
            if (err) {
                return res.status(500).json({ error: err.message });
            }
            res.json(results); 
        }
    )
})

app.get('/VerEstados',(req,res)=>{
    let consulta='';
    let consultaVariable=[req.query.ID_Estado];

    if(typeof(req.query.ID_Estado)=='undefined'){
        consulta='select * from Estados'
        consultaVariable=''
    }
    else{
        consulta='select * from Estados where id=?'
  
    }
    connection.execute(
        consulta,
        consultaVariable,
        (err, results) => {
            if (err) {
                return res.status(500).json({ error: err.message });
            }
            res.json(results); 
        }
    )
})
var transporter = nodemailer.createTransport({
    host: "controldecarga.com",
    port: 465,
    auth: {
      user: "desarrollo2@controldecarga.com",
      pass: "D3s4rr01i0!*"
    }
  });

const sendEmail = async (to, subject, text,cc) => {
    try {
      const info = await transporter.sendMail({
        from: '"Sistema interno" <desarrollo2@controldecarga.com>', // Remitente
        to, // Destinatario
        cc,
        subject, // Asunto del correo
        text, // Contenido en texto plano
        // html: '<b>Mensaje en HTML</b>' // Opcional, contenido en HTML
      });
    
      console.log('Correo enviado: %s', info.messageId);
    } catch (error) {
      console.error('Error al enviar correo:', error);
    }
    };
    
    app.post('/Correo', (req,res)=>{
      const{to, subject, text,cc}=req.body;
      
      sendEmail(to,subject,text,cc)
      .then(() => console.log('Correo enviado correctamente'))
      .catch(error => console.error('Error al enviar el correo:', error));
      res.json({"message":"mensaje"})
    })

 app.put('/VerEstados/Actualizar',(req,res)=>{
    const {activo, informacion,ID_Estado}=req.body;

    connection.execute(
        "UPDATE `webcdc`.`estados` SET `info` = ?, `activo` = ? WHERE `id` = ?;",
        [informacion,activo,ID_Estado],
        (err, results) => {
            if (err) {
                return res.status(500).json({ error: err.message });
            }
            res.json(results); 
        }
    )

 })

 app.get('/api/Images', (req, res) => {
    fs.readdir(IMAGES_DIR, (err, files) => {
      if (err) return res.status(500).json({ error: 'Error al obtener las imágenes' });
      const imageUrls = files.map(file => `/Images/${file}`);
      res.json(imageUrls);
    });
  });

app.listen(process.env.PORT, (req,res)=>{
console.log("servidor en marcha en http://localhost:8080/")
});