
function togglePopupCotizar(){
    document.getElementById("Contactanos").classList.toggle("active");
}

function togglePopupGuia(){
    document.getElementById("SolicitarGuia").classList.toggle("active");
}

document.getElementById('buttonBuscar').addEventListener('click', function() {
    const guiaTexto=document.getElementById('txtguia')
    let guia=guiaTexto.value
    let guial=guia.length
    console.log(guia,guiaTexto);
    
    
    if(guial>0)
    {
        alert('entro',guia)
        SacarGuia(guia)
    }
    else{
        alert('No tiene numero de guia especificado')
    }
})

async function SacarGuia(guia) {
    // console.log(guia,"dentro de sacarguia"); 
    // const myHeaders = new Headers();
    // myHeaders.append("Cookie", "PHPSESSID=op89h91qhub5lkuhdlc2sd57m6");

    // const formdata = new FormData();
    // formdata.append("username", "usrconsultaguias");
    // formdata.append("password", "USAmx2022*@pro");
    // formdata.append("guia", guia);
    // // MOR139004502
    // const requestOptions = {
    // method: "POST",
    // headers: myHeaders,
    // body: formdata,
    // redirect: "follow"
    // };

    // fetch("https://controldecarga.ecusmart.net/webservice/ws_status_guia.php", requestOptions)
    // .then((response) => response.json())
    // .then((result) => console.log(result))
    // .catch((error) => console.error(error));

    const myHeaders = new Headers();
myHeaders.append("Cookie", "PHPSESSID=2kr6tkhisc9qs0d0rqqun8dko2");

const formdata = new FormData();
formdata.append("username", "usrconsultaguias");
formdata.append("password", "USAmx2022*@pro");
formdata.append("guia", "MOR139004502");

const requestOptions = {
  method: "POST",
  headers: myHeaders,
  body: formdata,
  redirect: "manual"
};

try {
  const response = await fetch("https://controldecarga.ecusmart.net/webservice/ws_status_guia.php", requestOptions);
  const result = await response.json();
  console.log(result)
} catch (error) {
  console.error(error);
};
    }