
document.addEventListener('DOMContentLoaded', () => {
    
    MapaActivos()
    var elementos = document.querySelectorAll('svg path');
    elementos.forEach(function(elemento) {
        elemento.addEventListener("click", function() {
            var nombreClase = elemento.className.baseVal || elemento.className;

            if (elemento.classList.contains('activeState')) {
                Estados(nombreClase)
              }
              else{
                EstadoNoActivo(nombreClase)
              }

        });
   });
 });

function togglePopup(){
    document.getElementById("popup").classList.toggle("active");
}

async function Estados(ed) {
    let response = await fetch("http://localhost:8080/VerEstadosActivos", { 
        method: "GET"
      });
      
      let data = await response.json();
    //   console.log(data);

    data.results.forEach(E => {
        if(E.id+" activeState"==ed){
           

            const Head=document.getElementById('HeaderEstado');
            Head.innerText=''

            // console.log(E.NombreEst)
            Head.innerText=E.NombreEst

            const Cuerpo=document.getElementById('ParrafoEstado')
            Cuerpo.innerText=''
            // console.log(E.info)
            Cuerpo.innerText=E.info

            togglePopup();
        }
    });
}

async function EstadoNoActivo(ed) {

    console.log("El elemento no esta activo")
    
}


// function Colorear() {
//     var estadoacolorear = document.getElementById('est');
//     var ec = estadoacolorear.value;
//     // console.log(ec);

//     // Obtener todos los elementos con la clase especificada
//     var EstSelec = document.getElementsByClassName(ec);
//     console.log("Estado selecto", EstSelec)
//     // Verificar si se obtuvieron elementos
//     if (EstSelec.length > 0) {
//         // Iterar sobre la colección de elementos
//         for (var i = 0; i < EstSelec.length; i++) {
//             // Alternar la clase 'active'
//             EstSelec[i].classList.toggle('active');
//         }
//     } else {
//         // console.log('No se encontraron elementos con la clase:', ec);
//     }
// }


function TablaEstados() {
    const cuerpo=document.getElementById('Pestana');

    cuerpo.innerHTML=`
    <table id="Tabla">
        <thead>
            <tr>
                <th>Nombre</th>
                <th>Informacion</th>
                <th>Activo</th>
                <th>Editar</th>
            </tr>
        </thead>

        <tbody id="InsertarCuerpo">

        </tbody>
    </table>`;
    TodosEstados();
}

async function TodosEstados() {
    
    let response = await fetch("http://localhost:8080/VerEstados", { 
        method: "GET"
      });
      
      let data = await response.json();
    //   console.log(data);
      
      const Insetrar=document.getElementById('InsertarCuerpo');
      Insetrar.innerHTML=``;
    data.results.forEach(Estado => {
        var renglon=document.createElement('tr')



        var nombreCell=document.createElement('td');
        nombreCell.textContent=Estado.NombreEst;

        var infoCell=document.createElement('td');
        infoCell.textContent=Estado.info;

        var EstadoActivo=Estado.activo;
        var ActCell=document.createElement('td');
        var inputActivo=document.createElement('input');
        inputActivo.type='checkbox';

        if(EstadoActivo==1){
            inputActivo.checked=true;
        }

        inputActivo.disabled=true;

        ActCell.appendChild(inputActivo);

        var editarCell=document.createElement('td');

        var opEditar=document.createElement('div');
        opEditar.setAttribute('onclick', 'togglePopupEditar("' + Estado.id+ '")');
        opEditar.innerHTML=`<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 60 25"><title>Editar</title><g id="_18.Pencil" data-name="18.Pencil"><circle cx="12" cy="12" r="11" style="fill:none;stroke:#000;stroke-miterlimit:10;stroke-width:2px"/><polygon points="15.071 7.101 8 14.172 8 17 10.828 17 17.899 9.929 15.071 7.101" style="fill:none;stroke:#000;stroke-miterlimit:10;stroke-width:2px"/><line x1="12" y1="10.172" x2="14.828" y2="13" style="fill:none;stroke:#000;stroke-miterlimit:10;stroke-width:2px"/></g></svg>`

        editarCell.appendChild(opEditar)

        renglon.appendChild(nombreCell)
        renglon.appendChild(infoCell)
        renglon.appendChild(ActCell)
        renglon.appendChild(editarCell)
        
        Insetrar.appendChild(renglon)

    });
}




function togglePopupEditar(idEstado){
    document.getElementById("Contactanos").classList.toggle("active");
  MostrarInfo(idEstado)
      
}

async function MostrarInfo(idEstado) {
    let response = await fetch(`http://localhost:8080/VerEstados?ID_Estado=${idEstado}`, { 
        method: "GET",
      });
      
      let data = await response.json();

        let txtNombreEstado=data[0].NombreEst;
        let txtActivo=data[0].activo;
        let txtInfo=data[0].info
        const idNombreEstado=document.getElementById('NombreEstado');
        const idInfo=document.getElementById('Info');
        const idActivoEstado=document.getElementById('ActivoEstado');

        //   console.log('Nombre ',txtNombreEstado,'Info ',txtInfo,'Activo',txtActivo);
        

        idNombreEstado.textContent=txtNombreEstado;
        idInfo.textContent=txtInfo;
        if(txtActivo==1){
            idActivoEstado.checked=true
        }


}


function MapaActivos() {

    let elementos = document.querySelectorAll('svg path');
    // console.log(elementos)


    Activos().then(data =>{

        elementos.forEach(function(elemento) {
            // console.log(elemento);
            
          
                let nombreClase = elemento.className.baseVal || elemento.className;
           
                // console.log(data);
                
                data.forEach(E => {
                    // console.log("Este es dentro ", E);
                    
                    if (nombreClase == E.id) {
                        // Asegúrate de realizar alguna acción con los elementos que tienen la clase 'ok'
                        let elementos= document.getElementsByClassName(E.id);
                        
                        // Ejemplo de iteración y modificación de los elementos con clase 'ok'
                        Array.from(elementos).forEach(okElemento => {
                            okElemento.classList.toggle("activeState");
                            // O cualquier otra acción que quieras realizar
                        });
                    }
                });
          
        });

    })
    
}

async function Activos() {
    let response = await fetch("http://localhost:8080/VerEstadosActivos", { 
        method: "GET"
      });
      
      let data = await response.json();
      return data.results;
    
}
