import express from 'express';
const app=express();
import path, { dirname } from 'path';
import mysql2 from 'mysql2';
import fs from 'fs';
import nodemailer from 'nodemailer';
import cors from 'cors';
import multer from 'multer';
import dotenv from 'dotenv';
import url from 'url';
import axios from'axios';

const __filename=url.fileURLToPath(import.meta.url)
const __dirname=dirname(__filename)

dotenv.config();

app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(express.static(path.join(__dirname, 'Public')));
app.use(express.static(path.join(__dirname, 'Data')));

app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, 'Views'))


const IMAGES_DIR = path.join(__dirname, 'public/images');

const DatosConexion={
    host:process.env.DB_Host,
    user:process.env.DB_User,
    password:process.env.DB_Password,
    database:process.env.DB_Name,
    port: process.env.DB_Port,           
  ssl: {
    rejectUnauthorized:  false  
  }
}
// const connection=mysql2.createConnection(DatosConexion)
const pool = mysql2.createPool({
  ...DatosConexion,
  waitForConnections: true,
  connectionLimit: 20, // Número máximo de conexiones simultáneas
  queueLimit: 0,
  connectTimeout: 10000
}).promise();



app.get('/Guia', async (req, res) => {
  const guia = req.query.Guia;

  let bodyContent = new FormData();
  bodyContent.append("username", "usrconsultaguias");
  bodyContent.append("password", "USAmx2022*@pro");
  bodyContent.append("guia", guia);

  try {
    let response = await fetch("https://controldecarga.ecusmart.net/webservice/ws_status_guia.php", {
      method: "POST",
      body: bodyContent,
      redirect: "follow",
      headers: {
        "Cookie": "PHPSESSID=b9jk77p1sp7kqg63oepks046d7"
      }
    });

    let data = await response.json();
    // console.log(data);
    // Filtrar donde status NO sea "consolidado" (sin importar mayúsculas/minúsculas)
    let datosFiltrados = data
      .filter(g => g.status.toLowerCase() !== "consolidado")
      .map(g => ({
        status: g.status,
        fecha: g.fecha,
        comentarios:g.comentarios
      }));

    res.json(datosFiltrados);

  } catch (error) {
    console.error("Error al consultar la guía:", error);
    res.status(500).json({ error: "Error al obtener datos de la guía" });
  }
});

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

app.get('/VerEstadosActivos', async(req,res)=>{
  let connection;
  try{
     connection=await pool.getConnection();
     const[results]=await connection.execute(
      'select * from vista_EstadosActivos'
    );

    if(results.length>0){
      return res.json({
        status:"200",
        results
      })
    }
    else{
      return res.status("404").json({error:"Usuario no encontrado"})
    }
  }
  catch(error){
      console.error("Error en la solicitud: ", error) ;
  }
  finally{
    if(connection){
      connection.release();
    }
  }
  
})

app.get('/VerEstados', async(req,res)=>{
  
  let consulta='';
  let consultaVariable=[req.query.ID_Estado];
  if(typeof(req.query.ID_Estado)=='undefined'){
      consulta='select * from Estados'
      consultaVariable=''
  }
  else{
      consulta='select * from Estados where id=?'

  }
  let connection;
  try{
     connection=await pool.getConnection();
     const[results]=await connection.execute(
      consulta,
      consultaVariable,
    );

    if(results.length>0){
      return res.json({
        status:"200",
        results
      })
    }
    else{
      return res.status("404").json({error:"Usuario no encontrado"})
    }
  }
  catch(error){
      console.error("Error en la solicitud: ", error) ;
  }
  finally{
    if(connection){
      connection.release();
    }
  }
  
  
})

app.put('/VerEstados/Actualizar', async(req,res)=>{

  const {activo, informacion,ID_Estado}=req.body;
  
  let connection;
  try{
    connection=await pool.getConnection();
    const[results]=await connection.execute(
      "UPDATE `webcdc`.`estados` SET `info` = ?, `activo` = ? WHERE `id` = ?;",
        [informacion,activo,ID_Estado],
    );

    if(results.length>0){
      return res.json({
        status:"200",
        results
      })
    }
    else{
      return res.status("404").json({error:"Estado no encontrado"})
    }
  }
  catch(error){
    console.error("Error en la solicitud: ", error) ;
  }
  finally{
    if(connection){
      connection.release();
    }
  }
  

  connection.execute(
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


app.get('/api/Images', (req, res) => {
  const carpeta=req.query.carpeta
  const carpetas=IMAGES_DIR+'/'+carpeta
    fs.readdir(carpetas, (err, files) => {
      if (err) return res.status(500).json({ error: 'Error al obtener las imágenes' });
      const imageUrls = files.map(file => `/Images/${carpeta}/${file}`);
      res.json(imageUrls);
    });
});

// Configuración de almacenamiento
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    // Carpeta personalizada desde la solicitud
    const folder = req.body.folder || 'default';
    const uploadPath = IMAGES_DIR+"\\" +folder

    cb(null, uploadPath); // Asigna la carpeta donde se guardará el archivo
  },
  filename: (req, file, cb) => {
    // Nombre del archivo personalizado desde la solicitud
    const customName = req.body.filename || `file_${Date.now()}`;
    const extension = path.extname(file.originalname); // Extensión del archivo
    const newFilename = `${customName}${extension}`;

    cb(null, newFilename); // Asigna el nombre del archivo
  },
});

const fileFilter = (req, file, cb) => {
  // Verifica que el archivo tenga el tipo MIME correspondiente a JPG
  if (file.mimetype === 'image/jpeg') {
    cb(null, true); // Acepta el archivo
  } else {
    cb(new Error('Solo se permiten archivos JPG')); // Rechaza el archivo
  }
};

// Crear el middleware de multer
const upload = multer({
  storage: storage  ,
  fileFilter: fileFilter
  // limits: { fileSize: 5 * 1024 * 1024 }, // Tamaño máximo: 5 MB
});

// Ruta para subir archivos
app.post('/upload', upload.single('image'), (req, res) => {
  if (!req.file) {
    return res.status(400).json({ error: 'No se subió ningún archivo' });
  }

  res.json({
    message: 'Archivo subido exitosamente', 
    filename: req.file.filename,
    path: `/uploads/${req.body.folder || 'default'}/${req.file.filename}`,
  });
});
  

//Prueba proxy img
app.get('/api/imagenes', async (req, res) => {
  const carpeta = req.query.carpeta;

  try {
    // Pide la lista al API real
    const respuesta = await axios.get(`http://localhost:3000/api/cdc/imagenes?carpeta=${carpeta}`);
    // Envía solo la lista al frontend
    res.json(respuesta.data);
  } catch (error) {
    console.error('Error al obtener lista de imágenes:', error.message);
    res.status(500).send('Error al obtener imágenes');
  }
});

// Proxy dinámico para servir imágenes (ruta completa en URL)
app.get('/img/*', async (req, res) => {
  const rutaRelativa = req.params[0]; // todo lo que venga después de /img/

  try {
    const urlImagen = `http://localhost:3000/${rutaRelativa}`;

    const respuesta = await axios({
      url: urlImagen,
      method: 'GET',
      responseType: 'stream',
    });

    // Pasamos el tipo MIME correcto al cliente
    res.setHeader('Content-Type', respuesta.headers['content-type']);
    respuesta.data.pipe(res);
  } catch (error) {
    console.error('Error al obtener imagen:', error.message);
    res.status(404).send('Imagen no encontrada');
  }
});

app.listen(process.env.PORT, (req,res)=>{
console.log("servidor en marcha en http://localhost:8080/")
});