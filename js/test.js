"use strict"; 
const menu = document.body.querySelector(".menu");
const menuItems = menu.querySelectorAll(".menu-item");
const menuBorder = menu.querySelector(".menu-border");
let activeItem = menu.querySelector(".active");
function clickItem(item, index) {
    menu.style.removeProperty("--timeOut");
    if (activeItem == item) return;
    if (activeItem) {
        activeItem.classList.remove("active");
    }
    item.classList.add("active");
    activeItem = item;
    offsetMenuBorder(activeItem, menuBorder); 
}
function offsetMenuBorder(element, menuBorder) {
    const offsetActiveItem = element.getBoundingClientRect();
    const left = Math.floor(element.offsetLeft - (menuBorder.offsetWidth  - offsetActiveItem.width) / 2) +  "px";
    menuBorder.style.transform = `translate3d(${left}, 0 , 0)`;
}
offsetMenuBorder(activeItem, menuBorder);
menuItems.forEach((item, index) => {
    item.addEventListener("click", () => clickItem(item, index));  
})
window.addEventListener("resize", () => {
    offsetMenuBorder(activeItem, menuBorder);
    menu.style.setProperty("--timeOut", "none");
});   