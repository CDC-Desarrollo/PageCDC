// Esta es una animacion para los servicios

// const  elementoServicio=document.querySelector(".Servicio")
// console.log(elementoServicio)

// function esVisible(element){
//     const rect = element.getBoundingClientRect();
//     console.log(rect.top >= 0 && rect.bottom <= window.innerHeight)
//     return rect.top >= 0 && rect.bottom <= window.innerHeight;

// }

// window.addEventListener("scroll", () => {
//     if (esVisible(elementoServicio)) {
//       // Reinicia la animación: elimina y añade la clase
//       elementoServicio.classList.remove("animationSlitIn");
//       void elementoServicio.offsetWidth; // Forzar reflujo para reiniciar animación
//       elementoServicio.classList.add("animationSlitIn");
//     }
//   });

window.addEventListener('scroll', () => {
    const menu = document.getElementById('menu');
    const menuTop = menu.getBoundingClientRect().top;



    if (menuTop <= 0) {
      menu.classList.add('scrolled'); // Cambiar el color
    } else {
      menu.classList.remove('scrolled'); // Volver al color original      
    }


    const servicios = document.getElementById('Servicios');
    const rectServicios = servicios.getBoundingClientRect();
    
    // Verifica si el elemento es completamente visible
    const isVisible = rectServicios.top <= window.innerHeight && rectServicios.bottom >= 0;
  
    if (isVisible) {
      // Activa la animación aquí
      // console.log('El elemento está visible en la pantalla.');
      // Aquí podrías añadir la clase que activa la animación, por ejemplo:
      // servicios.classList.add('animar');
    } else {
      // Si no está visible, puedes quitar la animación o hacer algo diferente
      // console.log('El elemento no está visible.');
      // servicios.classList.remove('animar');
    }
  });

