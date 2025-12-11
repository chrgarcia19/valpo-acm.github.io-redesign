const hamburgerMenu = document.querySelector('.mobile-nav-button');
const menu = document.querySelector('.mobile-menu-container');
const menuIcon = document.getElementById("menu-icon")
let menuOpen = false;

hamburgerMenu.addEventListener("click", () => {
    if (!menuOpen){
        menu.style.display = "none";
        menuIcon.classList.remove("bi-x-lg");
        menuIcon.classList.add("bi-list");
        menuOpen = true;
    } else { 
        menu.style.display = "flex";
        menuIcon.classList.remove("bi-list");
        menuIcon.classList.add("bi-x-lg");
        menuOpen = false;
    }
});