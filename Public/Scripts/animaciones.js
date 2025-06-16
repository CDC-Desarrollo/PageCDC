let animacionServicios = false;
let animacionEstadistica = false;
let animacionMapa = false;



window.addEventListener('scroll', () => {
  const menu = document.getElementById('menu');
  const menuTop = menu.getBoundingClientRect().top;
  
  
  
  if (menuTop <= 0) {
    menu.classList.add('scrolled'); // Cambiar el color
  } else {
    menu.classList.remove('scrolled'); // Volver al color original      
  }
 
});



const observer = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if (!entry.isIntersecting) return;

    const id = entry.target.id;

    if (id === 'Servicios' && !animacionServicios) {
      ServicioActivar();
      observer.unobserve(entry.target);
    }

    if (id === 'mapa' && !animacionMapa) {
      MapaActivar();
      observer.unobserve(entry.target);
    }
  });
}, {
  threshold: 0.3 // activa cuando el 30% del elemento esté en pantalla
});


['Servicios',  'mapa'].forEach(id => {
  const el = document.getElementById(id);
  if (el) observer.observe(el);
});

function EsVisible(Apartado){
  const divApartado = document.getElementById(`${Apartado}`);
  const rectApartado = divApartado.getBoundingClientRect();

  // console.log(divApartado)
  // Verifica si el elemento es completamente visible
  const Visible = rectApartado.top <= window.innerHeight && rectApartado.bottom >= 0;
  return Visible
}
      
function ServicioActivar(){

  console.log("Entro")
  animacionServicios=true;

  const tl = anime.timeline({
    easing: "easeOutExpo",
    duration: 1800
  });
  tl.add({
    targets: "#divPaqueteria",
    translateY: ["150px", "0px"],
    opacity: [0, 1], 
    delay: 1000
  })
  .add({
      targets: "#divMudanza",
      translateY: ["150px", "0px"],
      opacity: [0, 1]
  }, 0) // Equivalente a usar 'start'
  .add({
      targets: "#divMensajeria",
      translateY: ["150px", "0px"],
      opacity: [0, 1]

      // rotate: "1turn"
  }, '-=1000');

  
}



function MapaActivar() {
  
  animacionMapa=true;
  anime({
    targets: "#mapaUSA",   
    translateX: [-1000, 0],            
    duration: 2000,         
    opacity: [0, 1], 
    // delay: 500,       
    // direction: "alternate", // correcto para que vaya y vuelva
    // loop: true,             // opcional: para repetir indefinidamente
    easing: "easeInOutCubic"
  });

  anime({
    targets: "#banner",   
    translateX: [1000, 0],            
    duration: 2000,         
    opacity: [0, 1], 
    // delay: 500,       
    // direction: "alternate", // correcto para que vaya y vuelva
    // loop: true,             // opcional: para repetir indefinidamente
    easing: "easeInOutCubic"
  });


  setInterval(() => {
    anime({
      targets: "#Llegamos",
      rotate: [0,-5, 5,0],        
      duration: 500,         
      easing: "easeInOutSine",
      direction: "alternate"
    });
  }, 3000); // cada 3 segundos


}


function categoriaClientesActivar() {
  anime({
    targets: "#bannerClientes",   
    translateX: [-1000, 0],            
    duration: 2500,         
    opacity: [0, 1], 
    easing: "easeInOutBounce"
  });
}





function categoriaAgentes(){
  
  const tl = anime.timeline({
    easing: "easeOutExpo",
    duration: 1000
  });
  
  for (let i = 1; i <= 5; i++) {
    tl.add({
      targets: `#sb${i}`,
      scale: [0.8, 1],
      opacity: [0, 1],
      translateY: [50, 0]
    }, `+=200`); // empieza 200ms después del anterior
  }
  
  
}


anime({
  targets: "#imgPATM",   
  scaleX: [1.18, 1],             
  scaleY: 1,            
  duration: 5000,         
  // loop: true,          
  alternate: true,
  easing: "easeInOutBounce"
});

// anime({
//   targets: '.contClientes',             
//   innerHTML: [400000, 500000],      
//   easing: 'linear',            
//   duration: 90000,           
//   round: 1,                                        
//   loop: false,                   
//   autoplay: true                
// });

// anime({
//   targets: '.contAgentes',             
//   innerHTML: [1000, 5000],      
//   easing: 'linear',            
//   duration: 900000,           
//   round: 1,                                        
//   loop: false,                   
//   autoplay: true                
// });

anime({
  targets: '#contEnvios',             
  innerHTML: [15000,18000],      
  easing: 'linear',            
  duration: 90000,           
  round: 1,                                        
  loop: false,                   
  autoplay: true                
});




function animarSecuencia() {
  anime({
    targets: "#cmSlogJHE",
    rotate: [0, -5, 5, 0],
    duration: 500,
    easing: "easeInOutSine",
    complete: () => {
      anime({
        targets: "#cartaSlog",
        translateY: [
          { value: -25, duration: 300, easing: 'easeOutQuad' },   // Subida rápida
          { value: 0, duration: 400, easing: 'easeOutBounce' }     // Bajada con rebote
        ],
        easing: "easeOutBounce",
        complete: () => {
          // Espera 3 segundos antes de repetir todo
          setTimeout(animarSecuencia, 3000);
        }
      });
    }
  });
}

animarSecuencia(); // Inicia la cadena


let index = 0;
const track = document.getElementById('NombreCatClientes');
const reviews = document.querySelectorAll('.contReview');

function nextSlide() {

  index++;
  track.style.transition = 'transform 0.5s ease';
  track.style.transform = `translateX(-${index * 90}%)`;

  if (index === reviews.length - 1) {
    // Espera que la transición termine
    setTimeout(() => {
      track.style.transition = 'none';
      index = 0;
      track.style.transform = `translateX(0%)`;
    }, 500); 
  }
}

setInterval(nextSlide, 5000); 






// //Cajas que giran
// const envoltorios = document.querySelectorAll('.envoltorio');
// const cajas = document.querySelectorAll('.caja');

// envoltorios.forEach((env, i) => {
//   const left = Math.random() * window.innerWidth;
//   env.style.left = `${left}px`;

//   const rotIni = `${Math.floor(Math.random() * 360)}deg`;
//   const rotFin = `${Math.floor(Math.random() * 360)}deg`;
//   cajas[i].style.setProperty('--rotacionInicial', rotIni);
//   cajas[i].style.setProperty('--rotacionFinal', rotFin);

//   const dur = 3 + Math.random() * 3;
//   env.style.animationDuration = `${dur}s`;
//   cajas[i].style.animationDuration = `${dur}s`;

//   const delay = Math.random() * 3;
//   env.style.animationDelay = `${delay}s`;
//   cajas[i].style.animationDelay = `${delay}s`;
// });


document.getElementById("Review1").addEventListener("click", function() {
  window.location.href = "https://maps.app.goo.gl/piczwk56LbrYUiej6";
});


document.getElementById("Review2").addEventListener("click", function() {
  window.location.href = "https://maps.app.goo.gl/cTuNqPsXRX4GVirt7";
});



document.getElementById("Review3").addEventListener("click", function() {
  window.location.href = "https://maps.app.goo.gl/3sMxfSgDPkpqJ3Nr5";
});


