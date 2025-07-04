// Navbar background scroll
const navbar = document.getElementById('navbar');

window.addEventListener('scroll', () => {
    if (window.scrollY > 100) {
        navbar.classList.add('backdrop-blur', 'shadow-md');
        navbar.classList.remove('bg-transparent');
        navbar.style.backgroundColor = 'rgba(255, 255, 255, 0.95)';
    } else {
        navbar.classList.remove('backdrop-blur', 'shadow-md');
        navbar.classList.add('bg-transparent');
        navbar.style.backgroundColor = 'transparent';
    }
});

// ScrollSpy activo
const sections = document.querySelectorAll('section');
const navLinks = document.querySelectorAll('.nav-link');

window.addEventListener('scroll', () => {
    let current = '';
    sections.forEach(section => {
        const sectionTop = section.offsetTop - 100;
        if (scrollY >= sectionTop) {
            current = section.getAttribute('id');
        }
    });

    navLinks.forEach(link => {
        link.classList.remove('font-bold', 'text-orange-500');
        if (link.getAttribute('href') === `#${current}`) {
            link.classList.add('font-bold', 'text-orange-500');
        }
    });
});

// Función para copiar email y mostrar "¡Copiado!"
export function copiarEmail() {
    const email = "dgagoc@gmail.com";
    const msg = document.getElementById("copiado");

    const mostrarMensaje = () => {
        if (msg) {
            msg.classList.remove("hidden");
            setTimeout(() => msg.classList.add("hidden"), 2000);
        }
    };

    if (navigator.clipboard && navigator.clipboard.writeText) {
        navigator.clipboard.writeText(email)
            .then(mostrarMensaje)
            .catch(err => {
                console.warn("Fallo con clipboard API, usando método alternativo", err);
                copiarConTextarea(email, mostrarMensaje);
            });
    } else {
        copiarConTextarea(email, mostrarMensaje);
    }
}

function copiarConTextarea(texto, callback) {
    const textarea = document.createElement("textarea");
    textarea.value = texto;
    textarea.setAttribute("readonly", "");
    textarea.style.position = "absolute";
    textarea.style.left = "-9999px";
    document.body.appendChild(textarea);

    textarea.select();
    try {
        const exitoso = document.execCommand("copy");
        if (exitoso && typeof callback === "function") callback();
    } catch (err) {
        console.error("Error al copiar con método alternativo:", err);
    }

    document.body.removeChild(textarea);
}

document.addEventListener('DOMContentLoaded', () => {
    // Inicializar AOS
    AOS.init({
        duration: 800,
        easing: 'ease-in-out',
        once: true,
        mirror: false
    });

    // Smooth scroll para navegación interna
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            e.preventDefault();

            const target = document.querySelector(this.getAttribute('href'));
            if (target) {
                target.scrollIntoView({
                    behavior: 'smooth',
                    block: 'start'
                });
            }
        });
    });

    // Evento para copiar email
    const emailDiv = document.getElementById("email");
    if (emailDiv) {
        emailDiv.addEventListener("click", copiarEmail);
    }
});
