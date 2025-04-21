document.addEventListener(`DOMContentLoaded`, () => {
    const menubtn = document.getElementById(`menubtn`);
    const navmenu = document.getElementById(`navmenu`);

    // Toggle menu cuando se hace clic en el botón
    menubtn.addEventListener(`click`, () => {
        navmenu.classList.toggle(`active`);
        menubtn.classList.toggle('active');
        menubtn.textContent = menubtn.classList.contains('active') ? '✖' : '☰';
    });

    // Cerrar menú cuando se hace clic en un enlace
    const navLinks = document.querySelectorAll(`#navmenu a`);
    navLinks.forEach((link) => {
        link.addEventListener(`click`, function() {
            navmenu.classList.remove(`active`);
        });
    });

    // Cerrar menú cuando se hace scroll
    window.addEventListener('scroll', function() {
        if (navmenu.classList.contains(`active`)) {
            navmenu.classList.remove(`active`);
            menubtn.classList.toggle('active');
            menubtn.textContent = menubtn.classList.contains('active') ? '✖' : '☰';
        }
    });

    // Cerrar menú cuando se hace clic fuera del menú
    document.addEventListener(`click`, function(event) {
        const isClickInsideMenu = navmenu.contains(event.target);
        const isClickOnMenuBtn = menubtn.contains(event.target);

        if (!isClickInsideMenu && !isClickOnMenuBtn && navmenu.classList.contains(`active`)) {
            navmenu.classList.remove(`active`);
        }
    });
});