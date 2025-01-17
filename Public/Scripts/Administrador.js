// const { create } = require("app");

// const { create } = require("app");


function Imagen() {
    const cuerpo=document.getElementById('Pestana');

    console.log('entro')
    cuerpo.innerHTML=`
     <div id="categorias">
                    <div class="categoria" onclick="MostrarImagenes('Intro')">Intro</div>

                    <div class="contImagenes" id="Intro"></div>

                    <div class="categoria" onclick="MostrarImagenes('Hitos')">Hitos</div>

                    <div class="contImagenes"  id="Hitos"></div>

                    <div class="categoria" onclick="MostrarImagenes('Locales')">Locales</div>

                    <div class="contImagenes" id="Locales"></div>

                    <div class="categoria" onclick="MostrarImagenes('Clientes')">Clientes</div>

                    <div class="contImagenes"  id="Clientes"></div>

                    <div class="categoria" onclick="MostrarImagenes('Anuncios')">Anuncios</div>

                    <div class="contImagenes"  id="Anuncios"></div>

                </div>
    `;
}

async function ObtenerImagenes(categoria) {
    
    let response = await fetch(`http://localhost:8080/api/Images?carpeta=${categoria}`, { 
        method: "GET",
      });
      
      let data = await response.json();
    //   console.log(data);
      return data
}

function InsertarEnCategoria(NombreCategoria) {
    const  categoria=document.getElementById(`${NombreCategoria}`);
    
    console.log(categoria.classList.contains('activo'))
    if(!categoria.classList.contains('activo')){
        categoria.classList.add('activo')

        const listadoImagenes=document.createElement('div');

        let contador=1;
        ObtenerImagenes(NombreCategoria).then(data =>{
            console.log("Los datos que estan en la carpeta ",NombreCategoria," son: ",data)
           
            

            data.forEach(direccionImg => {
                // const lista=document.createElement('li');
                // lista.id=NombreCategoria+contador;
                // contador++;
                const imagen=document.createElement('img')
                imagen.src=direccionImg;
                imagen.id=NombreCategoria+contador;
               

                // lista.appendChild(imagen)
                // listadoImagenes.appendChild(lista)
                const icoEdit=document.createElement('div')
                icoEdit.innerHTML=`<button style="width: 50px; border: 0px; background: none;" id="btnEditarImagenes" onclick="EditarImagen('${NombreCategoria}',${contador})"><svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24"><title>18.Pencil</title><g id="_18.Pencil" data-name="18.Pencil"><path d="M12,24A12,12,0,1,1,24,12,12.013,12.013,0,0,1,12,24ZM12,2A10,10,0,1,0,22,12,10.011,10.011,0,0,0,12,2Z"/><path d="M11.242,18H7V13.757l8.071-8.07,4.242,4.242ZM9,16h1.414l6.071-6.071L15.071,8.515,9,14.585Z"/><rect x="12.414" y="9.586" width="2" height="4" transform="translate(-4.264 12.877) rotate(-44.995)"/></g></svg>
                 </button>`

                icoEdit.appendChild(imagen)
                listadoImagenes.appendChild(icoEdit)
                contador++;
            });


        });

        categoria.appendChild(listadoImagenes)

    }
    else{
        categoria.classList.remove('activo')
        categoria.innerHTML=``
    }

    console.log(categoria);
    
}

function MostrarImagenes(NombreCategoria){
    InsertarEnCategoria(NombreCategoria)
}

function EditarImagen(carpeta, noArchivo){
    console.log(carpeta, noArchivo);
    document.getElementById("editImg").classList.toggle("active");

    const encabezado=document.getElementById('EncabezadoPopup')
    encabezado.textContent=carpeta


    ObtenerImagenes(carpeta).then(data =>{
        console.log("Los datos que estan en la carpeta ",carpeta," son: ",data)
       
        
        let largoDatos=data.length
        for (let i = 0; i < largoDatos; i++){
            
            if(i==noArchivo-1){
                console.log(data[i]);
                const img=document.createElement('img')
                img.name=carpeta+noArchivo;
                img.src=data[i];
                img.id='imagenRemplazo'

                const divImg=document.getElementById('contenedorImg');
                divImg.appendChild(img)

                console.log(img.src);
                
                
            }
            
        }


    });

    
}

function togglePopup(){
    document.getElementById("editImg").classList.toggle("active");
    const divImg=document.getElementById('contenedorImg');
    divImg.innerHTML=``;
    Imagen();
}



async function subirArchivo(){
    const imagenRemplazo=document.getElementById('imagenRemplazo')
    console.log(imagenRemplazo.name);
    
    const encabezado=document.getElementById('EncabezadoPopup')

    console.log(encabezado.textContent)

    const inputFile = document.getElementById('inputFile');
    if (inputFile.files.length === 0) {
        alert('Por favor, selecciona un archivo para subir.');
        return;
    }
    const file = inputFile.files[0]; // Primer archivo seleccionado
    console.log('Archivo seleccionado:', file.name);

    const formData = new FormData();
    
    formData.append('filename',imagenRemplazo.name)
    formData.append('folder',encabezado.textContent)
    formData.append('image', file);
   
    console.log(...formData);

    try {
        const response = await fetch('/upload', {
        method: 'POST',
        body: formData
        // ,headers:{"Content-Type":"multipart/form-data"}
        });

        const data = await response.json();
        if (response.ok) {
        alert(`Archivo subido exitosamente:\n${data.path}`);
        } else {
        alert(`Error: ${data.error}`);
        }
    } catch (error) {
        console.error('Error al subir el archivo:', error);
    }

}

