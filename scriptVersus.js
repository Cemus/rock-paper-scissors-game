import * as Stats from "./scriptStats.js";

//No load back
window.history.pushState(null, null, window.location.href);
window.onpopstate = function () {
    window.history.go(1);
};

let artifacts = JSON.parse(sessionStorage.getItem('ssArtifacts'));


//Hp

let maxHp = sessionStorage.getItem("maxHp");
if (maxHp == null){
    sessionStorage.setItem("maxHp", 100);
    maxHp = sessionStorage.getItem("maxHp")
}
let Hp = sessionStorage.getItem("Hp")
if (Hp == null){;
    sessionStorage.setItem("Hp", 50);
    Hp = sessionStorage.getItem("Hp");
}

let playerHealthbar = document.getElementById("player-health");
let hpText = document.getElementById("hp");
let hpTextMax = document.getElementById("hpMax");

let dmgRock = document.getElementById("rock-dgt-player");
let dmgPaper = document.getElementById("paper-dgt-player");
let dmgScissors = document.getElementById("scissors-dgt-player");

function rechercheArtifact(artifact){
    let compte = 0;
    if (artifacts != null){
        for (let i=0; i<artifacts.length; i++){
            if (artifacts[i].alt == artifact.alt){
                compte = compte + 1;
            }
        }   
    }
    return compte; 
}

function rechercheProtection(){
    let hp;
    hp = 100;
    let protection = 0;

    protection = protection + 50 * rechercheArtifact(Stats.protect);
    hp = hp + protection;
    sessionStorage.setItem("maxHp", hp);
    calculHp();
}
function rechercheStrikes(){
    let strikes = 2;
    strikes = strikes + 1 * rechercheArtifact(Stats.strike);
    return strikes;
}
function createIntent(strikes, qui){
    if (qui == "player"){
        for (let i = 0; i < strikes; i++){
                const intent = document.createElement("img");
                intent.src = "img/intent/intent.png";
                document.getElementById('strike-display-player').appendChild(intent);     
        }
    }
    else{
        for (let i = 0; i < strikes; i++){
            const intent = document.createElement("img");
            intent.src = "img/intent/intent.png";
            intent.classList.add("intent-o");
            document.getElementById('strike-display-opponent').appendChild(intent);         
        }
    }
}
createIntent(rechercheStrikes(),"player");

function RechercheDamage(dmgType){
    let baseDmg = 10;
    let Dmg = 0;
    switch (dmgType){
        case "rock":
        Dmg = baseDmg + ((baseDmg/2) * rechercheArtifact(Stats.fistboost));    
        return Dmg; 

        case "paper":
        Dmg = baseDmg + ((baseDmg/2) * rechercheArtifact(Stats.palmboost));    
        return Dmg; 

        case "scissors":
        Dmg = baseDmg + ((baseDmg/2) * rechercheArtifact(Stats.kickboost));    
        return Dmg; 
    }
}

dmgRock.innerHTML = RechercheDamage("rock");
dmgPaper.innerHTML = RechercheDamage("paper");
dmgScissors.innerHTML = RechercheDamage("scissors");

sessionStorage.setItem("baseStrRock", RechercheDamage("rock"));
sessionStorage.setItem("baseStrPaper", RechercheDamage("paper"));
sessionStorage.setItem("baseStrScissors", RechercheDamage("scissors"));

rechercheProtection();
function calculHp(){
    maxHp = sessionStorage.getItem("maxHp");
    Hp = sessionStorage.getItem("Hp");
    playerHealthbar.max = maxHp;
    playerHealthbar.value = Hp;
    hpTextMax.innerHTML = playerHealthbar.max;
    hpText.innerHTML = playerHealthbar.value;
}
calculHp();
////////////////////////////////////////////////////////

/* OPPONENT */
let Level = sessionStorage.getItem("Level");
if (Level == null){
    sessionStorage.setItem("Level", 1);
    Level = sessionStorage.getItem("Level")
}
Level = parseInt(Level);



function generationStatsOpponent(level){
    let rdm;
    let rock = 1;
    let paper = 1;
    let scissors = 1;
    let hp = 30;
    let strike = 1;
    let points = level*5;
    for (let i = 0; i < points; i++){
        rdm = Math.floor(Math.random() * (5 - 1 + 1) + 1);
        switch (rdm){
            case 1:
            rock = rock + 1;
            break;
            case 2:
            paper = paper + 1;
            break;
            case 3:
            scissors = scissors + 1;
            break;
            case 4:
            hp = hp + 5;
            break;
            case 5:
            strike = strike + 1;
            break;
        }
    }
    //Sprite
    if (rock > paper && rock > scissors){
        rdm = Math.floor(Math.random() * (2 - 1 + 1) + 1);
        switch (rdm){
            case 1:
            sessionStorage.setItem("opponentSprite", "rock/rock1");
            break;

            case 2:
            sessionStorage.setItem("opponentSprite", "rock/rock2");
            break;
        }

    }
    if (paper > rock && paper > scissors){
        rdm = Math.floor(Math.random() * (2 - 1 + 1) + 1);
        switch (rdm){
            case 1:
            sessionStorage.setItem("opponentSprite", "paper/paper1");
            break;

            case 2:
            sessionStorage.setItem("opponentSprite", "paper/paper2");
            break;
        }

    }
    if (scissors > rock && scissors > paper){
        rdm = Math.floor(Math.random() * (2 - 1 + 1) + 1);
        switch (rdm){
            case 1:
            sessionStorage.setItem("opponentSprite", "scissors/scissors1");
            break;

            case 2:
            sessionStorage.setItem("opponentSprite", "scissors/scissors2");
            break;
        };
    }
    if (scissors == rock || scissors == paper || rock == paper){
        rdm = Math.floor(Math.random() * (2 - 1 + 1) + 1);
        switch (rdm){
            case 1:
            sessionStorage.setItem("opponentSprite", "mixed/mixed1");
            break;

            case 2:
            sessionStorage.setItem("opponentSprite", "mixed/mixed2");
            break;
        };
    }
    if (Level >= 10){
        sessionStorage.setItem("opponentSprite", "boss");       
    }
    sessionStorage.setItem("opponentStrRock", rock);
    sessionStorage.setItem("opponentStrPaper", paper);
    sessionStorage.setItem("opponentStrScissors", scissors);
    sessionStorage.setItem("opponentMaxHp", hp);
    sessionStorage.setItem("opponentHp", sessionStorage.getItem('opponentMaxHp'))
    sessionStorage.setItem("opponentMaxStrikes", Math.ceil(strike/3));
}
generationStatsOpponent(Level);
createIntent(sessionStorage.getItem("opponentMaxStrikes"),"opponent");

let opponentSprite = sessionStorage.getItem("opponentSprite");
let opponentImage = document.getElementById("opponent-image");
opponentImage.src = "img/enemy/"+ opponentSprite + "/stand.gif"
let opponentHealthbar = document.getElementById("opponent-health");
let opponentHpText = document.getElementById('opponentHp');
let opponentHpTextMax = document.getElementById('opponentHpMax');

opponentHealthbar.max = sessionStorage.getItem('opponentMaxHp');
opponentHealthbar.value = sessionStorage.getItem('opponentHp');

opponentHpText.innerHTML = opponentHealthbar.value;
opponentHpTextMax.innerHTML = opponentHealthbar.max;

let opponentDmgRock = document.getElementById("rock-dgt-opponent");
let opponentDmgPaper = document.getElementById("paper-dgt-opponent");
let opponentDmgScissors = document.getElementById("scissors-dgt-opponent");

opponentDmgRock.innerHTML = sessionStorage.getItem("opponentStrRock");
opponentDmgPaper.innerHTML = sessionStorage.getItem("opponentStrPaper");
opponentDmgScissors.innerHTML = sessionStorage.getItem("opponentStrScissors");

//////////////////////////////////////////////////////////////////////////////////////
function Hover(obj){
    obj.style.cursor = "pointer";
}
function Fight(){
    window.location.replace("./battle.html");   
}
let furtherButton = document.getElementById("further");
furtherButton.addEventListener('click',function() {Fight()});
furtherButton.addEventListener('mouseenter',function() {Hover(this)});