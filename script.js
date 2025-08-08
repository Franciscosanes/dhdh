document.addEventListener('DOMContentLoaded', function () {
  // Scroll suave al hacer clic en el botón "Ingresar"
  const boton = document.querySelector('.boton-ingresar');
  const destino = document.getElementById('textura');

  if (boton && destino) {
    boton.addEventListener('click', function (e) {
      e.preventDefault();
      destino.scrollIntoView({ behavior: 'smooth' });
    });
  }

  // Reproducción de audio al hacer clic en cualquier parte del documento
  function PlayAudio() {
    const audio = document.getElementById("musica1");
    audio.play().catch((error) => {
      console.error("Error al intentar reproducir el audio:", error);
    });
  }

  document.body.addEventListener("click", PlayAudio);

  // Cuenta regresiva para el 20 de septiembre de 2025
  function iniciarCuentaRegresiva2() {
    const destino = new Date('2025-09-20T00:00:00').getTime();

    const cuenta = setInterval(() => {
      const ahora = new Date().getTime();
      const diferencia = destino - ahora;

      if (diferencia <= 0) {
        clearInterval(cuenta);
        const contenedor = document.querySelector('.contenido-cuenta');
        if (contenedor) {
          contenedor.innerHTML = '<h2>¡Ya es el gran día!</h2>';
        }
        return;
      }

      const dias = Math.floor(diferencia / (1000 * 60 * 60 * 24));
      const horas = Math.floor((diferencia % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
      const minutos = Math.floor((diferencia % (1000 * 60 * 60)) / (1000 * 60));
      const segundos = Math.floor((diferencia % (1000 * 60)) / 1000);

      document.getElementById('dias2').textContent = dias;
      document.getElementById('horas2').textContent = horas;
      document.getElementById('minutos2').textContent = minutos;
      document.getElementById('segundos2').textContent = segundos;
    }, 1000);
  }

  // Animación del recuadro al hacer scroll
  function animarRecuadroAlHacerScroll() {
    const elementos = document.querySelectorAll('.animado-scroll');

    const observer = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          entry.target.classList.add('mostrar');
          observer.unobserve(entry.target);
        }
      });
    }, { threshold: 0.3 });

    elementos.forEach(el => observer.observe(el));
  }

  // Carrusel de retratos
  function iniciarCarruselRetratos() {
    const imagenes = [
      "gre.jpeg",
      "gre1.jpeg",
      "gre2.jpeg",
      "gre3.jpeg",
      "gre4.jpeg",
      "gre5.jpeg",
      "gre6.jpeg",
      "gre7.jpeg",
    ];

    let indice = 0;
    const imagen = document.getElementById("imagen-carrusel");

    if (!imagen) return;

    setInterval(() => {
      indice = (indice + 1) % imagenes.length;
      imagen.style.opacity = 0;
      setTimeout(() => {
        imagen.src = imagenes[indice];
        imagen.style.opacity = 1;
      }, 300);
    }, 3000);
  }
  
  // Ejecutar funciones
  iniciarCuentaRegresiva2();
  animarRecuadroAlHacerScroll();
  iniciarCarruselRetratos();
});