// Esta es una animacion para los servicios

const  elementoServicio=document.querySelector(".Servicio")
console.log(elementoServicio)

function esVisible(element){
    const rect = element.getBoundingClientRect();
    console.log(rect.top >= 0 && rect.bottom <= window.innerHeight)
    return rect.top >= 0 && rect.bottom <= window.innerHeight;

}

window.addEventListener("scroll", () => {
    if (esVisible(elementoServicio)) {
      // Reinicia la animación: elimina y añade la clase
      elementoServicio.classList.remove("animationSlitIn");
      void elementoServicio.offsetWidth; // Forzar reflujo para reiniciar animación
      elementoServicio.classList.add("animationSlitIn");
    }
  });