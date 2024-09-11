const express=require('express');
const app=express();
const path=require('path')

app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, 'views'))

app.use(express.static(path.join(__dirname, 'css')));

app.get('/', (req,res)=>{
    res.render('home');
});

app.listen(8080,(req,res)=>{
console.log("servidor en marcha en http://localhost:8080/")
});