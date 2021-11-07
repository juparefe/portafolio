//Modo Nocturno
var btn_night = document.querySelector("#btn_night");
var night_mode_icon = document.getElementById("night_mode_icon");
var night_mode = localStorage.getItem("night_mode");

//Para poner el modo con el que se cerro la pagina Nocturno - Diurno
window.onload = function() {
    if (night_mode.match("noche")) {
        btn_night.click();
    }
    
  };

//Funcion de nodo nocturno
btn_night.addEventListener('click', () =>{
    document.body.classList.toggle('dark');
    btn_night.classList.toggle('active');
    if (night_mode_icon.src.match("moon")) {
        night_mode_icon.src = "./assets/sun-regular.svg";
        night_mode = "dia";
        localStorage.setItem("night_mode", night_mode);
    }else{
        night_mode_icon.src = "./assets/moon-regular.svg"
        night_mode = "noche";
        localStorage.setItem("night_mode", night_mode);
    }
})

//Tarjetas de Proyectos
const cards = Array.from(document.querySelectorAll('.card'));
const descriptions = Array.from(document.querySelectorAll('.container'));
const buttons = Array.from(document.querySelectorAll('.btn_card'));

cards.forEach((card, index) => {
    card.addEventListener("touchstart", function () {
        descriptions[index].style.display = "flex";
    });
});
buttons.forEach((button, index) => {
    button.addEventListener("touchend", function () {
        descriptions[index].style.display = "none";
    });
});

//Mostrar y ocultar el formulario de contacto
const switch_button = document.getElementById("switch-button");
const form = document.querySelector(".form");
let checked = false;

switch_button.addEventListener("click",function () {
    if (!checked) {
        checked = true;
        form.style.display = "flex";
    } else {
        checked = false;
        form.style.display = "none";
    }
})