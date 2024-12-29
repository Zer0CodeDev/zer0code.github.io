// Efecto de escritura para el título
document.addEventListener('DOMContentLoaded', function() {
    const text = document.querySelector('.typing-effect');
    const originalText = text.textContent;
    text.textContent = '';
    
    let i = 0;
    function typeWriter() {
        if (i < originalText.length) {
            text.textContent += originalText.charAt(i);
            i++;
            setTimeout(typeWriter, 100);
        }
    }
    
    typeWriter();
    createLightEffect();
});

// Smooth scroll para los enlaces de navegación
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();
        document.querySelector(this.getAttribute('href')).scrollIntoView({
            behavior: 'smooth'
        });
    });
});

// Animación de aparición al scroll
const observerOptions = {
    threshold: 0.1
};

const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.classList.add('visible');
        }
    });
}, observerOptions);

document.querySelectorAll('section').forEach((section) => {
    observer.observe(section);
});

// Manejo del formulario de contacto con webhook de Discord
document.getElementById('contact-form').addEventListener('submit', async function(e) {
    e.preventDefault();
    
    const nombre = this.querySelector('input[type="text"]').value;
    const email = this.querySelector('input[type="email"]').value;
    const mensaje = this.querySelector('textarea').value;
    
    const webhookURL = 'https://discord.com/api/webhooks/1323014278667833375/KXaXVW_rM0s3hKh6Vzt4Ujigo1tjG6GkxsP9kqM6-4CWkfOb0m99zT0YxMXBMo4ugPae';
    
    const data = {
        content: `🔔 Nuevo mensaje de contacto:\n\n👤 Nombre: ${nombre}\n📧 Email: ${email}\n💬 Mensaje: ${mensaje}`,
        username: 'Contact Form Bot',
        avatar_url: 'https://i.imgur.com/4M34hi2.png' // Puedes cambiar esto por la URL de un avatar personalizado
    };

    try {
        const response = await fetch(webhookURL, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(data)
        });

        if (response.ok) {
            alert('¡Mensaje enviado con éxito!');
            this.reset();
        } else {
            throw new Error('Error al enviar el mensaje');
        }
    } catch (error) {
        alert('Lo siento, hubo un error al enviar el mensaje. Por favor, intenta de nuevo.');
        console.error('Error:', error);
    }
});

// Añadir efecto de destellos
function createLightEffect() {
    const body = document.body;
    const numberOfLights = 50;

    for (let i = 0; i < numberOfLights; i++) {
        const light = document.createElement('div');
        light.className = 'light-effect';
        
        // Posición aleatoria
        light.style.left = Math.random() * window.innerWidth + 'px';
        light.style.top = Math.random() * window.innerHeight + 'px';
        
        // Tamaño aleatorio
        const size = Math.random() * 3;
        light.style.width = size + 'px';
        light.style.height = size + 'px';
        
        // Duración de animación aleatoria
        light.style.animationDuration = (Math.random() * 3 + 1) + 's';
        
        body.appendChild(light);
    }
}

// Recrear destellos al cambiar el tamaño de la ventana
window.addEventListener('resize', function() {
    const lights = document.querySelectorAll('.light-effect');
    lights.forEach(light => light.remove());
    createLightEffect();
});
