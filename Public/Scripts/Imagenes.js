window.onload= function() {
  Intro();
  Hitos();
  Locales();
  Anuncios();
}

async function Intro() {
    let response = await fetch("http://localhost:8080/api/Images?carpeta=Intro", { 
        method: "GET",
      });
      
      let data = await response.json();
      console.log(data);

      
      const QuienesSomos=document.getElementById("divQS")
      const QSImg=document.createElement("img")
      QSImg.id="QSImg";
      QSImg.src=data[0];
      QuienesSomos.appendChild(QSImg);

      const Mision=document.getElementById("divM")
      const MImg=document.createElement("img")
      MImg.id="MImg";
      MImg.src=data[1];
      Mision.appendChild(MImg);

      const Vision=document.getElementById("divV")
      const VImg=document.createElement("img")
      VImg.id="VImg";
      VImg.src=data[2];
      Vision.appendChild(VImg);
}

async function Hitos() {
    let response = await fetch("http://localhost:8080/api/Images?carpeta=Hitos", { 
        method: "GET",
      });
      
      let data = await response.json();
      console.log(data);

      const Hito1=document.getElementById("divHito1");
      const HImg1=document.createElement("img")
      HImg1.id="HImg1";
      HImg1.src=data[0];
      Hito1.appendChild(HImg1);

      const Hito2=document.getElementById("divHito2");
      const HImg2=document.createElement("img")
      HImg2.id="HImg2";
      HImg2.src=data[1];
      Hito2.appendChild(HImg2);

      const Hito3=document.getElementById("divHito3");
      const HImg3=document.createElement("img")
      HImg3.id="HImg3";
      HImg3.src=data[2];
      Hito3.appendChild(HImg3);

}

async function Locales() {
    let response = await fetch("http://localhost:8080/api/Images?carpeta=Locales", { 
        method: "GET",
      });
      
      let data = await response.json();
      console.log(data.length);

      const claseGaleria=document.getElementsByClassName('g')
      
      for (let i = 0; i < claseGaleria.length; i++) {
        console.log(claseGaleria[i])
        const imgLocales=document.createElement('img')
        imgLocales.id="ImgG"+i;
        imgLocales.src=data[i]
        claseGaleria[i].appendChild(imgLocales);
      }
    
}

async function Anuncios() {
    let response = await fetch("http://localhost:8080/api/Images?carpeta=Anuncios", { 
        method: "GET",
      });
      
      let data = await response.json();


    
      var contador=0;
      const listaAnuncios=document.getElementById("ListaAnuncios");
      data.forEach(element => {
        const listado=document.createElement('li');
        const imagen=document.createElement('img');
        imagen.src=element;
        imagen.classList='Anuncio'
        imagen.id="imgAn"+contador
        contador++;
        listado.appendChild(imagen)
        listaAnuncios.appendChild(listado)

      });



}

