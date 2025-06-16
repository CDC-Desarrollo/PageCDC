
function togglePopupCotizar(){
    document.getElementById("Cotizar").classList.toggle("active");
}


function togglePopupContactanos(){
    document.getElementById("Contactanos").classList.toggle("active");
}

function togglePopupGuia(){
    document.getElementById("SolicitarGuia").classList.toggle("active");
    RegresarGuia()
}


document.getElementById('buttonBuscar').addEventListener('click', activarGuia)


function activarGuia() {
    const guiaTexto=document.getElementById('txtguia')
    let guia=guiaTexto.value
    let guial=guia.length
    console.log(guia,guiaTexto);
    
    
    if(guial>0)
    {
        // alert('entro',guia)
        SacarGuia(guia)
    }
    else{
        alert('No tiene numero de guia especificado')
    }
}


function VerGuia(infoGuia, guia) {
    const contGuia = document.getElementById("divGuia");
    contGuia.innerHTML = '';

    const h1numGuia = document.createElement("h1");
    h1numGuia.innerText = "Guia: ";

    const spanNumGuia = document.createElement("span");
    spanNumGuia.id = "GuiaNumero";
    spanNumGuia.innerText = guia;
    h1numGuia.appendChild(spanNumGuia);

    const contenedorGuias = document.createElement("div");
    contenedorGuias.classList.add("contenedorGuias");

    const fragment = document.createDocumentFragment(); // Mejora de rendimiento
    const infoLength = infoGuia.length;
    let ultimaFecha;

    infoGuia.slice().reverse().forEach((info, index) => {
        const contenedorGuia = document.createElement("div");
        contenedorGuia.classList.add("contenedorGuia");

        const fecha = FormatoFecha(info.fecha);
        const hora = FormatoHora(info.fecha);

        const contFecha = document.createElement("div");
        contFecha.classList.add("fechaGuia");

        if ( index === 0) {
            const msjUltimo = document.createElement("h6");
            msjUltimo.id = "ultimaAct";
            msjUltimo.innerText = "última actualización";

            const almacenFecha = document.createElement("h3");
            almacenFecha.id = "almacenFecha";
            almacenFecha.innerText = fecha;

            contFecha.appendChild(msjUltimo);
            contFecha.appendChild(almacenFecha);
        } else if (!ultimaFecha || ultimaFecha !== fecha) {
            ultimaFecha = fecha;

            const almacenFecha = document.createElement("h3");
            almacenFecha.id = "almacenFecha";
            almacenFecha.innerText = fecha;

            contFecha.appendChild(almacenFecha);
        }

        const almacenHora = document.createElement("h3");
        almacenHora.innerText = hora;
        contFecha.appendChild(almacenHora);

        const contInfo = document.createElement("div");
        contInfo.classList.add("infoGuiaContenedor");

        const contInfoIcono = document.createElement("div");
        contInfoIcono.classList.add("infoGuiaIcono");
        contInfoIcono.innerHTML = `
            <img id="icoGuia" src="/Resources/Engranaje.png" alt="">
        `;

        const contInfoGuia = document.createElement("div");
        contInfoGuia.classList.add("infoGuia");

        const statusGuia = document.createElement("h1");
        statusGuia.innerText = info.status;

        const comentariosGuia = document.createElement("p");
        comentariosGuia.innerText = info.comentarios;

        contInfoGuia.appendChild(statusGuia);
        contInfoGuia.appendChild(comentariosGuia);

        contInfo.appendChild(contInfoIcono);
        contInfo.appendChild(contInfoGuia);

        contenedorGuia.appendChild(contFecha);
        contenedorGuia.appendChild(contInfo);
        fragment.appendChild(contenedorGuia);
    });

    contenedorGuias.appendChild(fragment);
    contGuia.appendChild(h1numGuia);
    contGuia.appendChild(contenedorGuias);

    const opAtras = document.getElementById("opAtras");
    if (opAtras) opAtras.classList.remove("Activar");
}


// function VerGuia(infoGuia, guia) {
//     const contGuia=document.getElementById("divGuia");
//     contGuia.innerHTML=``;
    
//     const h1numGuia=document.createElement("h1");
//     h1numGuia.innerText="Guia: ";


//     const spanNumGuia=document.createElement("span");
//     spanNumGuia.id="GuiaNumero";
//     spanNumGuia.innerText=guia;

//     const contenedorGuias=document.createElement("div");
//     contenedorGuias.classList.add("contenedorGuias");



//     h1numGuia.appendChild(spanNumGuia)



//     const infoLength=infoGuia.length;
//     let ultimaFecha;
    

//     infoGuia.forEach((info, index) => {
//         const contenedorGuia=document.createElement("div");
//         contenedorGuia.classList.add("contenedorGuia");
        
//         console.log(info, index)

//         const fecha=FormatoFecha(info.fecha)
//         const hora=FormatoHora(info.fecha)
            
//         const contFecha=document.createElement("div")
//         contFecha.classList.add("fechaGuia")

//         if(infoLength-index==1){
//             const msjUltimo=document.createElement("h6");
//             msjUltimo.id="ultimaAct";
//             msjUltimo.innerText="ultima actualizacion";

            
//             const almacenFecha=document.createElement("h3");
//             almacenFecha.id="almacenFecha"
//             almacenFecha.innerText=fecha;
//             contFecha.appendChild(msjUltimo);
//             contFecha.appendChild(almacenFecha);
//         }
//         else{
//             if(ultimaFecha==null || ultimaFecha !== fecha){
//                 ultimaFecha=fecha;

//                 const almacenFecha=document.createElement("h3");
//                 almacenFecha.id="almacenFecha"
//                 almacenFecha.innerText=fecha;
//                 contFecha.appendChild(almacenFecha);
//             }
//         }
        
//         const almacenHora=document.createElement("h3");
//         almacenHora.innerText=hora
//         contFecha.appendChild(almacenHora)


//         const contInfo=document.createElement("div");
//         contInfo.classList.add("infoGuiaContenedor");

//         const contInfoIcono=document.createElement("div");
//         contInfoIcono.classList.add("infoGuiaIcono");
//         contInfoIcono.innerHTML=`
//                     <img id="icoGuia" src="/Resources/Engranaje.png" alt="" srcset="">

//         `;

//         const contInfoGuia=document.createElement("div");
//         contInfo.classList.add("infoGuia");

//         const statusGuia=document.createElement("h1");
//         statusGuia.innerText=info.status;
        
//         const comentariosGuia=document.createElement("p");
//         comentariosGuia.innerText=info.comentarios;

//         contInfoGuia.appendChild(statusGuia);
//         contInfoGuia.appendChild(comentariosGuia);

//         contInfo.appendChild(contInfoIcono);
//         contInfo.appendChild(contInfoGuia);


//         contenedorGuia.appendChild(contFecha);
//         contenedorGuia.appendChild(contInfo);
//         contenedorGuias.appendChild(contenedorGuia);


//         const opAtras = document.getElementById("opAtras")
//         opAtras.classList.remove("Activar")

//     });


//     contGuia.appendChild(h1numGuia)
//     contGuia.appendChild(contenedorGuias)
// }

function FormatoFecha(data) {
    const fecha = new Date(data);

    const formateada = `${fecha.getDate().toString().padStart(2, '0')}/${
    (fecha.getMonth() + 1).toString().padStart(2, '0')
    }/${fecha.getFullYear()}`;

    return formateada; // "21/01/2025"
}


function FormatoHora(data) {

    const fecha = new Date(data);

    const horas = fecha.getHours().toString().padStart(2, '0');
    const minutos = fecha.getMinutes().toString().padStart(2, '0');

    const horaFormateada = `${horas}:${minutos}`;
    return horaFormateada; // "12:22"
}

async function SacarGuia(guia) {
    try {
        let response = await fetch(`http://localhost:8080/Guia?Guia=${guia}`, {
            method: "GET"
        });

        if (!response.ok) {
            throw new Error(`No se encontro la guia`);
        }

        let data = await response.json();
        // console.log(data);

        if (data === "error") {
            // console.log("error");
            return;
        }

        if (data.length !== 0) {
            VerGuia(data, guia);
        }
    } catch (error) {
        // console.error("Ocurrió un error al sacar la guía:", error);
        const errorGuia=document.getElementById("errorGuia")
        errorGuia.innerHTML= `No se encontro la guia` ;
        errorGuia.classList.add("err")
        
    }
      
           
}

function RegresarGuia() {
    const contGuia=document.getElementById("divGuia");
    contGuia.innerHTML='';
    contGuia.innerHTML=`
     <h1>Rastrear</h1>
                    <div class="Informacion">
                        <h4>Numero de guia</h4>
                        <input type="text" id="txtguia">

                          <p id="errorGuia" class="errGuia"></p>
                      
                        <div class="enviar" style="padding: 10px;">
                          <button type="button" id="buttonBuscar"> <b>Buscar</b></button>
                        </div>
                    </div>
    `;

    const botonBuscar = document.getElementById("buttonBuscar");
    if (botonBuscar) {
        botonBuscar.addEventListener("click", activarGuia);
    }

    const opAtras = document.getElementById("opAtras")
    opAtras.classList.add("Activar")
}