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

//Slider de frases
const slider = document.querySelector(".slider"),
cards = Array.from(document.querySelectorAll(".card_phrase"));

let isDragging = false,
    startPos = 0,
    currentTranslate = 0,
    prevTranslate = 0,
    animationId = 0,
    currentIndex = 0;

cards.forEach((card, index) =>{
    //Touch
    card.addEventListener("touchstart", touchStart(index));
    card.addEventListener("touchend", touchEnd);
    card.addEventListener("touchmove", touchMove);

    //Mouse
    card.addEventListener("mousedown", touchStart(index));
    card.addEventListener("mouseup", touchEnd);
    card.addEventListener("mouseleave", touchEnd);
    card.addEventListener("mousemove", touchMove);
});

// make responsive to viewport changes
window.addEventListener('resize', setPositionByIndex);

//Deshabilitar context menu
window.oncontextmenu = function (event) {
    event.preventDefault()
    event.stopPropagation()
    return false
}

function getPositionX(event){
    return event.type.includes("mouse") ? event.pageX : event.touches[0].clientX;
}

function touchStart(index) {
    return function(event) {
        currentIndex = index;
        startPos = getPositionX(event);
        isDragging = true
        animationId = requestAnimationFrame(animation)
        slider.classList.add('grabbing')
    }
};

function touchMove(event) {
    if (isDragging) {
        const currentPosition = getPositionX(event);
        currentTranslate = prevTranslate + currentPosition - startPos;
    }
};

function touchEnd() {
    cancelAnimationFrame(animationId);
    isDragging = false;
    const movedBy = currentTranslate - prevTranslate

    // if moved enough negative then snap to next slide if there is one
    if (movedBy < -50 && currentIndex < (cards.length / 3) - 1) currentIndex += 1

    // if moved enough positive then snap to previous slide if there is one
    if (movedBy > 50 && currentIndex > 0) currentIndex -= 1

    setPositionByIndex()
    slider.classList.remove('grabbing')
};

function animation() {
    setSliderPosition();
    if (isDragging) {
        requestAnimationFrame(animation);
    }
}

function setPositionByIndex() {
    currentTranslate = currentIndex * -(window.innerWidth / 10);
    prevTranslate = currentTranslate;
    setSliderPosition();
}

function setSliderPosition() {
    slider.style.transform = `translateX(${currentTranslate}px)`;
}
