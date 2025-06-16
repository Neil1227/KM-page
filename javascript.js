document.addEventListener("scroll", () => {
    const sections = document.querySelectorAll("section");
    const navLinks = document.querySelectorAll(".navbar-nav .nav-link");

    let currentSection = "";

    sections.forEach(section => {
        const sectionTop = section.offsetTop - 70; // Adjust offset for navbar height
        if (window.scrollY >= sectionTop) {
            currentSection = section.getAttribute("id");
        }
    });

    navLinks.forEach(link => {
        link.classList.remove("active");
        if (link.getAttribute("href").includes(currentSection)) {
            link.classList.add("active");
        }
    });
});
// Parallax effect for the background
window.addEventListener('scroll', function () {
    let scrollPosition = window.pageYOffset;
    let background = document.querySelector('body');
    background.style.backgroundPosition = 'center ' + (scrollPosition * 0.3) + 'px';
});
