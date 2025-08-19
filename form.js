  // Enviar formulario a Supabase
  const form = document.querySelector('.rsvp form');
  const mensajeExito = document.getElementById('mensaje-exito');

    form.addEventListener('submit', async (e) => {
      e.preventDefault();

      const nombre = form.querySelector('input[type="text"]').value.trim();
      const acompanantes = form.querySelector('select[name="acompanantes"]').value;
      const mensaje = form.querySelector('textarea').value.trim();

      if (!nombre || isNaN(acompanantes)) {
        alert('Por favor completa correctamente los campos.');
        return;
      }

      try {
        const res = await fetch('https://csxsauqynxbhztldpevb.supabase.co/rest/v1/rsvp', {
          method: 'POST',
          headers: {
            'apikey': 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImNzeHNhdXF5bnhiaHp0bGRwZXZiIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NTU2MzM2OTUsImV4cCI6MjA3MTIwOTY5NX0.QPSkbHiwXkDCMk5ohICFUEcNfSmoBmsyYVUIrDXt3AY',
            'Authorization': 'Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImNzeHNhdXF5bnhiaHp0bGRwZXZiIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NTU2MzM2OTUsImV4cCI6MjA3MTIwOTY5NX0.QPSkbHiwXkDCMk5ohICFUEcNfSmoBmsyYVUIrDXt3AY',
            'Content-Type': 'application/json',
            'Prefer': 'return=minimal'
          },
          body: JSON.stringify({
            nombre,
            acompanantes: parseInt(acompanantes),
            mensaje
          })
        });

        if (res.ok) {
          const resumen = `
        <strong>¡Gracias por confirmar, ${nombre}!</strong><br><br>
        <u>Resumen de tu confirmación:</u><br>
        👤 <strong>Nombre:</strong> ${nombre}<br>
        👥 <strong>Acompañantes:</strong> ${acompanantes}<br>
        ✉️ <strong>Mensaje:</strong> ${mensaje || "Sin dedicatoria"}<br><br>
        ¡Estamos felices de contar contigo en este día tan especial!
      `;

      mensajeExito.innerHTML = resumen;
      mensajeExito.style.display = 'block';
          form.reset();
        } else {
          const error = await res.json();
          console.error('Error al enviar:', error);
          alert('Hubo un error. Intenta más tarde.');
        }

      } catch (err) {
        console.error('Error inesperado:', err);
        alert('No se pudo enviar tu confirmación. Revisa tu conexión.');
      }
    });
