window.onload= function() {
  // Intro();
  // Hitos();
  Storyboard()
  Locales();
  Anuncios();
}

// async function Intro() {
//     let response = await fetch("http://localhost:8080/api/Images?carpeta=Intro", { 
//         method: "GET",
//       });
      
//       let data = await response.json();
//       // console.log(data);

      
//       const QuienesSomos=document.getElementById("divQS")
//       const QSImg=document.createElement("img")
//       QSImg.id="QSImg";
//       QSImg.src=data[0];
//       QuienesSomos.appendChild(QSImg);

//       const Mision=document.getElementById("divM")
//       const MImg=document.createElement("img")
//       MImg.id="MImg";
//       MImg.src=data[1];
//       Mision.appendChild(MImg);

//       const Vision=document.getElementById("divV")
//       const VImg=document.createElement("img")
//       VImg.id="VImg";
//       VImg.src=data[2];
//       Vision.appendChild(VImg);
// }

// async function Hitos() {
//     let response = await fetch("http://localhost:8080/api/Images?carpeta=Hitos", { 
//         method: "GET",
//       });
      
//       let data = await response.json();
//       // console.log(data);

//       const Hito1=document.getElementById("divHito1");
//       const HImg1=document.createElement("img")
//       HImg1.id="HImg1";
//       HImg1.src=data[0];
//       Hito1.appendChild(HImg1);

//       const Hito2=document.getElementById("divHito2");
//       const HImg2=document.createElement("img")
//       HImg2.id="HImg2";
//       HImg2.src=data[1];
//       Hito2.appendChild(HImg2);

//       const Hito3=document.getElementById("divHito3");
//       const HImg3=document.createElement("img")
//       HImg3.id="HImg3";
//       HImg3.src=data[2];
//       Hito3.appendChild(HImg3);

// }


async function getImagenes(categoria) {

  let response = await fetch(`http://localhost:8080/api/imagenes?carpeta=${categoria}`, {
    method: "GET",
  });
  
  let data = await response.json();
  console.log(data);
  return data
  
}

function Locales() {
  const claseGaleria = document.getElementsByClassName('g');
  getImagenes("Locales").then(data=>{
      for (let i = 0; i < claseGaleria.length; i++) {
        const imgLocales = document.createElement('img');
        imgLocales.id = "ImgG" + i;
    
        // Aquí en vez de usar el API directo, usamos la ruta proxy para servir la imagen
        // data[i] es algo como "/controldecarga/images/Locales/Locales1.jpg" (o sin slash inicial, ajusta si es necesario)
    
        // Si data[i] no empieza con '/', lo agregamos para formar bien la URL
        const rutaRelativa = data[i].startsWith('/') ? data[i].slice(1) : data[i];
    
        imgLocales.src = "http://localhost:8080/img/" + rutaRelativa;
        claseGaleria[i].appendChild(imgLocales);
      }
  })
}


function Anuncios() {
 getImagenes("Anuncios").then(data=>{
  
   let contador = 0;
   const listaAnuncios = document.getElementById("ListaAnuncios");
 
   data.forEach(element => {
     const listado = document.createElement('li');
     const imagen = document.createElement('img');
 
     // Si element empieza con '/', le quitamos para concatenar bien la URL proxy
     const rutaRelativa = element.startsWith('/') ? element.slice(1) : element;
 
     // Aquí usamos el proxy para servir la imagen
     imagen.src = "http://localhost:8080/img/" + rutaRelativa;
     imagen.classList = 'Anuncio';
     imagen.id = "imgAn" + contador;
 
     listado.appendChild(imagen);
     listaAnuncios.appendChild(listado);
 
     contador++;
   });
 })
}

function Storyboard(){
  const sb = document.getElementById("storyBoard");

  getImagenes("Agentes").then(data=>{ 
    
    let contador=0;
    data.forEach(element=>{
      contador++;
     const rutaRelativa = element.startsWith('/') ? element.slice(1) : element;

      const div=document.createElement("div");
      div.classList.add="imgStoryboard"

      const imagen=document.createElement("img");
      imagen.src = "http://localhost:8080/img/" + rutaRelativa;
      imagen.id = "sb" + contador;

      div.appendChild(imagen)
      sb.appendChild(div)
    })


  })

}
