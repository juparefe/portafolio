let menu = document.querySelector(".menu");
const item_menu = document.querySelectorAll(".item_menu");
let img_menu = document.getElementById("img_menu");
let btn_menu = document.getElementById("btn_menu");

function toggleMenu() {
    if(img_menu.src.match("times")){
        menu.classList.remove("active");
        img_menu.src = "../assets/bars-solid.svg";
    } else {
        menu.classList.add("active");
        img_menu.src = "../assets/times-solid.svg";
    }   
}

btn_menu.addEventListener('click',toggleMenu);

item_menu.forEach( 
    function(item) { 
      item.addEventListener("click", toggleMenu);
    }
  )
