function Hover(obj){
    obj.style.cursor = "pointer";
}

function newGame(){
    sessionStorage.clear();
    window.location.href="./index.html";
}

let Phrase = document.getElementById("levelPhrase");
let level = sessionStorage.getItem("Level");
if (level >= 10){
    Phrase.innerHTML = "You lost during the ultimate battle.";    
}
else{
Phrase.innerHTML = "You lost in the " + level + "th battle.";
}


let furtherButton = document.getElementById("further");
furtherButton.addEventListener('click',function() {newGame()});
furtherButton.addEventListener('mouseenter',function() {Hover(this)});