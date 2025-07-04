
  function handleNavbarScroll() {
    const navbar = document.querySelector(".navbar");
    const socials = document.getElementById("floatingSocials");
    const scrollPosition = window.scrollY;

    if (scrollPosition > 50) {
      navbar?.classList.add("sticky-active");
      socials?.classList.remove("d-none");
    } else {
      navbar?.classList.remove("sticky-active");
      socials?.classList.add("d-none");
    }
  }

  window.addEventListener("scroll", handleNavbarScroll);
  window.addEventListener("load", handleNavbarScroll); 
  window.addEventListener("resize", handleNavbarScroll); 
//   dropdown css
  document.querySelectorAll('.dropdown-hover').forEach(function (dropdown) {
    dropdown.addEventListener('mouseenter', function () {
      const menu = this.querySelector('.dropdown-menu');
      menu.classList.add('show');
    });
    dropdown.addEventListener('mouseleave', function () {
      const menu = this.querySelector('.dropdown-menu');
      menu.classList.remove('show');
    });
  });