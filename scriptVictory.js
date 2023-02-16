function Hover(obj){
    obj.style.cursor = "pointer";
}

function newGame(){
    sessionStorage.clear();
    window.location.href="./rewards.html";
}

let furtherButton = document.getElementById("further");
furtherButton.addEventListener('click',function() {newGame()});
furtherButton.addEventListener('mouseenter',function() {Hover(this)});