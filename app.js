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







  
app.listen(process.env.PORT, (req,res)=>{
console.log("servidor en marcha en http://localhost:8080/")
});