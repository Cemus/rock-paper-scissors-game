import * as Stats from "./scriptStats.js";

let levelTitle = document.getElementById("level");
let level = sessionStorage.getItem("Level");
if (level < 10){
    levelTitle.innerHTML = "Fight n° " + level;
}
else{
    levelTitle.innerHTML = "Last battle!";   
}



let playerHealthbar = document.getElementById("player-health");
let artifactBase = JSON.parse(sessionStorage.getItem('ssArtifacts'));
let artifacts = [];
if (artifactBase != null){
    for (let i = 0; i < artifactBase.length; i++){
        artifacts[i] = artifactBase[i];
    }
}

playerHealthbar.max = sessionStorage.getItem("maxHp");
playerHealthbar.value = sessionStorage.getItem("Hp");
let allcards = Stats.allCards;
let deck = JSON.parse(sessionStorage.getItem('ssDeck'));
let opponentSprite = sessionStorage.getItem("opponentSprite");

//No load back
window.history.pushState(null, null, window.location.href);
window.onpopstate = function () {
    window.history.go(1);
};


//////////////////////////////////////////////////////////////////////////////////

//Sound

//hit
const sndHit1 = new Audio("audio/hit1.wav");
const sndHit2 = new Audio("audio/hit2.wav");
const sndHit3 = new Audio("audio/hit3.wav");

//draw
const sndDraw = new Audio("audio/draw.wav");

function playDrawSound(){
    sndDraw.play();
}

function playHitSound() {
    let i = 0;
    i = Math.floor(Math.random(3));
    switch (i){
        case i = 0:
        sndHit1.play();
        break;

        case i = 1:
        sndHit2.play();
        break;

        case i = 2:
        sndHit3.play();
        break;
    }

}


///////////////////////////////


function resetArtefact(){
    const artifacts = document.querySelectorAll('.artifacts');
    artifacts.forEach(artifact => {
        artifact.remove();
    });   
    generationArtefact()
}

function generationArtefact(){
    if (artifacts != null){
        for (let i=0; i<artifacts.length; i++){
            const artifact = document.createElement("img");
            artifact.classList.add("artifacts");
            artifact.src = artifacts[i].img;
            artifact.title = artifacts[i].description;
            artifact.style.zIndex = 1;
            document.getElementById('artifacts').appendChild(artifact);  
            artifact.addEventListener('mouseenter',function() {hoverDescription(this)});
        }
    }   
}

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
generationArtefact();
function hoverDescription(artifact){
    artifact.style.cursor = "help";
}

function rechercheStrikes(){
    let strikes = 0;
    strikes = strikes + 1 * rechercheArtifact(Stats.strike);
    playerStrikes = playerStrikes + strikes;
}

function rechercheAura(){
    if (rechercheArtifact(Stats.aurarock) > 0){
        player_str_rock = player_str_rock + Math.floor(base_player_str_rock * (rechercheArtifact(Stats.aurarock)*0.5));
    }
    if (rechercheArtifact(Stats.aurapaper) > 0){
        player_str_paper = player_str_paper + Math.floor(base_player_str_paper * (rechercheArtifact(Stats.aurapaper)*0.5));
    }
    if (rechercheArtifact(Stats.aurascissors) > 0){
        player_str_scissors = player_str_scissors + Math.floor(base_player_str_scissors * (rechercheArtifact(Stats.aurascissors)*0.5));
    }
}
////////////////////////////////////////////////////////////////////////////////////////

/// Character ///

var mc = document.getElementById("mc");
var opponent = document.getElementById("opponent");

///////////////////////////////////////////

//Combo
var combo = 0;
document.getElementById("combo-number").innerHTML = combo;



function Combo(){
    if (combo == 0){
        document.getElementById("combo-p").style.display = "none";
    }
    else{
        document.getElementById("combo-number").innerHTML = combo;
        document.getElementById("combo-p").style.display = "flex";   
    }
}

function hitCombo(){
    combo = parseInt(combo) + 1;
    document.getElementById("combo-number").innerHTML = combo;
}

function resetCombo(){
    document.getElementById("combo-number").innerHTML = 0
    combo = 0;
    Combo();
}

Combo();

/////////////////////////////////////////////////////////////////////


//Degats
var degatPlayerbaseLeftValue = 0
var degatOpponentbaseLeftValue = 0

var degatPlayerbaseTopValue = 0
var degatOpponentbaseTopValue = 0

function degatBase(){
    let degatP = document.getElementById("dmg-number-player");
    let degatO = document.getElementById("dmg-number-opponent");

    let playerStyle = window.getComputedStyle(degatP);
    let playerStyleTopValue = playerStyle.getPropertyValue("top").replace("px","");
    
    let opponentStyle = window.getComputedStyle(degatO);
    let opponentStyleTopValue = opponentStyle.getPropertyValue("top").replace("px","");

    let playerStyleLeftValue = playerStyle.getPropertyValue("left").replace("px","");
    let opponentStyleLeftValue = opponentStyle.getPropertyValue("left").replace("px","");
    
    degatPlayerbaseLeftValue = playerStyleLeftValue;
    degatOpponentbaseLeftValue = opponentStyleLeftValue;   
    
    degatPlayerbaseTopValue = playerStyleTopValue;
    degatOpponentbaseTopValue = opponentStyleTopValue;
}

degatBase();

function degatBaseTop(degat){
    let degatP = document.getElementById("dmg-number-player");
    let degatO = document.getElementById("dmg-number-opponent");


    let basePlayerTop = degatPlayerbaseTopValue;
    let baseOpponentTop = degatOpponentbaseTopValue;

    if (degat == degatP){
        return basePlayerTop;
    }
    if (degat == degatO){
        return baseOpponentTop;
    }
}
function degatBaseLeft(degat){
    let degatP = document.getElementById("dmg-number-player");
    let degatO = document.getElementById("dmg-number-opponent");
    
    let basePlayerLeft = degatPlayerbaseLeftValue;
    let baseOpponentLeft = degatOpponentbaseLeftValue;

    if (degat == degatP){
        return basePlayerLeft;
    }
    if (degat == degatO){
        return baseOpponentLeft;
    }

}
/////////////////////////////////////////////////////////////////////

///Stats

/// Player ///


//Force
var base_player_str_rock = 10;
if (rechercheArtifact(Stats.fistboost) > 0 ){
    base_player_str_rock = base_player_str_rock + Math.floor(base_player_str_rock/2) * rechercheArtifact(Stats.fistboost);
}
var base_player_str_paper = 10;
if (rechercheArtifact(Stats.palmboost) > 0){
    base_player_str_paper = base_player_str_paper + Math.floor(base_player_str_paper/2) * rechercheArtifact(Stats.palmboost);
}
var base_player_str_scissors = 10;
if (rechercheArtifact(Stats.kickboost) > 0){
    base_player_str_scissors = base_player_str_scissors + Math.floor(base_player_str_scissors/2) * rechercheArtifact(Stats.kickboost);
}

var player_str_rock = base_player_str_rock;
var player_str_paper = base_player_str_paper;
var player_str_scissors = base_player_str_scissors;

function strengthReset(){
    player_str_rock = base_player_str_rock;
    player_str_paper = base_player_str_paper;
    player_str_scissors = base_player_str_scissors;
}



//Strike
var playerStrikes = 2;
rechercheStrikes();

//Draw
var piocheMax = 2;
if (rechercheArtifact(Stats.draw) > 0){
    piocheMax = piocheMax + 1 * rechercheArtifact(Stats.draw);
}
if (piocheMax >= 5){
    piocheMax = 5;
}
///////////////////////////////////////////////////////////////////////

/// Opponent ///

//Force
var opponent_str_rock = sessionStorage.getItem('opponentStrRock');
var opponent_str_paper = sessionStorage.getItem('opponentStrPaper');
var opponent_str_scissors = sessionStorage.getItem('opponentStrScissors');

//PV
var opponent_healthbar = document.getElementById("opponent-health");
opponent_healthbar.max = sessionStorage.getItem('opponentMaxHp');
opponent_healthbar.value = sessionStorage.getItem('opponentHp');


/////////////////////////////////////////////////////////////////////

/// Objets cartes ///

let rock = {
    category: "attack",
    type:"rock",
    img: "img/cards/rock.png",
    intent:"img/intent/intent_rock.png"
};

let rage = {
    category: "attack",
    type:"rage",
    img: "img/cards/rage.png",
    intent:"img/intent/intent_rock.png"
};

let stun = {
    category: "attack",
    type:"stun",
    img: "img/cards/stun.png",
    intent:"img/intent/intent_rock.png"
};

let paper = {
    category: "attack",
    type:"paper",
    img: "img/cards/paper.png",
    intent:"img/intent/intent_paper.png"
};

let eater = {
    category: "attack",
    type:"eater",
    img: "img/cards/eater.png",
    intent:"img/intent/intent_paper.png"
};

let counter = {
    category: "attack",
    type:"counter",
    img: "img/cards/counter.png",
    intent:"img/intent/intent_paper.png"
};


let scissors = {
    category: "attack",
    type:"scissors",
    img: "img/cards/scissors.png",
    intent:"img/intent/intent_scissors.png"
};

let poke = {
    category: "attack",
    type:"poke",
    img: "img/cards/poke.png",
    intent:"img/intent/intent_scissors.png"
};

let flurry = {
    category: "attack",
    type:"flurry",
    img: "img/cards/flurry.png",
    intent:"img/intent/intent_scissors.png"
};

let foresight = {
    category: "special",
    type:"foresight",
    img: "img/cards/foresight.png",
    intent: 0
};

let idea = {
    category: "special",
    type:"idea",
    img: "img/cards/idea.png",
    intent: 0
};

let opportunity = {
    category: "special",
    type:"opportunity",
    img: "img/cards/opportunity.png",
    intent: 0
};

let firstAid = {
    category: "special",
    type:"firstAid",
    img: "img/cards/firstAid.png",
    intent: 0
};

let rockBoost ={
    category: "special",
    type:"rockBoost",
    img: "img/cards/rockBoost.png",
    intent: 0
};

let paperBoost ={
    category: "special",
    type:"paperBoost",
    img: "img/cards/paperBoost.png",
    intent: 0
};

let scissorsBoost ={
    category: "special",
    type:"scissorsBoost",
    img: "img/cards/scissorsBoost.png",
    intent: 0
};

/////////////////////////////////////////////////////////////////////////////



/// Deck ///

// !!!! Ajouter toutes les cartes ici !!!


var playerDefausse = [];


//Shuffle ///

function shuffle(array) {
    let currentIndex = array.length,  randomIndex;
  
    // While there remain elements to shuffle.
    while (currentIndex != 0) {
  
      // Pick a remaining element.
      randomIndex = Math.floor(Math.random() * currentIndex);
      currentIndex--;
  
      // And swap it with the current element.
      [array[currentIndex], array[randomIndex]] = [
        array[randomIndex], array[currentIndex]];
    }
  
    return array;
}

shuffle(deck);


/// Trouver objet ///

function findObjectByKey(allcards, attribute, value) {
    for (var i = 0; i < allcards.length; i++) {
        if (allcards[i][attribute] === value) {
            return allcards[i];
        }
    }
    return null;
}

/// Pioche ///

function compterMain(){
    let decompte = 0;
    const cards = document.querySelectorAll('.cards');
    cards.forEach(card => {
        decompte = decompte +1;
    });
    return decompte;
}

function Defausse(alt){
    const createObjectFromString = (alt) => {
        return eval(`(function () { return ${alt}; })()`);
    }
    playerDefausse.push(createObjectFromString(alt))
}

async function Pioche(nbPioche){
    for (let i=0; i<nbPioche; i++){
        if (compterMain() <= 4){
            if (deck.length == 0){
                const defausseLength = playerDefausse.length;
                for (let i = 0; i < defausseLength; i++){
                    deck.push(playerDefausse[0]);
                    playerDefausse.shift();
                } 
                shuffle(deck);
            }
            const img = document.createElement("img");
            img.src = deck[0].img;
            img.alt = deck[0].type;
            img.classList.add("cards");
            img.addEventListener('click',function() {cardClick(this)});
            img.addEventListener('mouseenter',function() {Hover(this)});
            document.getElementById('deck').appendChild(img);  

            deck.shift(); //Remove du deck 
        }   
    }
}



/// Selection des cartes ///

function Hover(img){
    img.style.cursor = "pointer";
}




/// Clique ///

// Intent //

//Player

var intentMax = playerStrikes; //base 2

function createIntent(intentMax, qui){
    if (qui == "player"){
        for (let i = 0; i < intentMax; i++){
                const intent = document.createElement("img");
                intent.src = "img/intent/intent.png";
                intent.classList.add("intent-p");
                document.getElementById('intent-player').appendChild(intent);     
        }
    }
    else{
        for (let i = 0; i < intentMax; i++){
            const intent = document.createElement("img");
            intent.src = "img/intent/intent.png";
            intent.classList.add("intent-o");
            document.getElementById('intent-opponent').appendChild(intent);         
        }
    }
}



var intentArrayPlayer = [];

function Special(carteSpeciale){
    switch (carteSpeciale){
        case "foresight":
        document.getElementById("intent-opponent").style.display = "initial";
        break;

        case "idea":
        Pioche(2);
        break;

        case "opportunity":
        createIntent(1, "player");
        break;

        case "firstAid":
        playerHealthbar.value = playerHealthbar.value + Math.floor(playerHealthbar.value*25/100);
        break;

        case "rockBoost":
        player_str_rock = player_str_rock + Math.floor(base_player_str_rock * 0.5);
        artifacts.push(Stats.aurarock);
        resetArtefact();
        break;

        case "paperBoost":
        player_str_paper = player_str_paper + Math.floor(base_player_str_paper * 0.5);
        artifacts.push(Stats.aurapaper);
        resetArtefact();
        break;

        case "scissorsBoost":
        player_str_scissors = player_str_scissors + Math.floor(base_player_str_scissors * 0.5);
        artifacts.push(Stats.aurascissors);
        resetArtefact();
        break;
    }
}

function Intent(alt, img){
    const intents = document.querySelectorAll('.intent-p');

    try {
    intents.forEach(intent => {
        let image = findObjectByKey(allcards, "type", alt);
        if (intent.classList[1] == undefined){
            if (image.category == "special"){
                Special(alt);
            }
            intent.src = image.intent;
            intent.classList.add("used") //ajoute une classe à l'intent
            intentArrayPlayer.push(alt);
            Defausse(img.alt)
            img.remove();
            throw 'Break';
        }

    })
    } catch (e) {
        if (e !== 'Break') throw e;
    }
}

function intentClear(){
    const intentsPlayer = document.querySelectorAll('.intent-p');
    const intentsOpponent = document.querySelectorAll('.intent-o');

    intentsPlayer.forEach(intent => {
        intent.remove();
    })
    createIntent(intentMax,"player");
    intentsOpponent.forEach(intent => {
        intent.src = "img/intent/intent.png";
        intent.classList.remove("used");
    })
}

var opIntentMax = sessionStorage.getItem("opponentMaxStrikes");

var intentArrayOpponent = [];

createIntent(opIntentMax, "opponent");


//Génération des intents opponent


function intentOpponent(){
    const intents = document.querySelectorAll('.intent-o');

    try {
    intents.forEach(intent => {
        if (intent.classList[1] == undefined){
            let rdmNumber = Math.floor(Math.random() * 3);
            switch(rdmNumber){
                case 0: //Rock
                intent.src = "img/intent/intent_rock.png";
                intentArrayOpponent.push("rock");
                break;

                case 1: //Paper
                intent.src = "img/intent/intent_paper.png";
                intentArrayOpponent.push("paper");
                break;    

                case 2: //Scissors
                intent.src = "img/intent/intent_scissors.png";
                intentArrayOpponent.push("scissors");
                break;              
            }
            intent.classList.add("used") //ajoute une classe à l'intent
            throw 'Break';
        }
    })
    } catch (e) {
        if (e !== 'Break') throw e;
    }
}

function randomizedOpponentAction(opIntentMax){
    let modifiedIntent;
    let proba = (Math.floor(Math.random() * 3)); //probabilité de faire moins de coups de prévu
    if (proba == 0){
        modifiedIntent = opIntentMax - 1;        
    }
    else{
        modifiedIntent = opIntentMax;
    }
    for (let i=0; i < modifiedIntent;i++){
        intentOpponent();
    }
}

randomizedOpponentAction(opIntentMax);



// Carte jouée //

function cardClick(img){
    if (img.classList[1] == undefined){
        const cards = document.querySelectorAll('.cards');

        cards.forEach(card => {
          card.style.bottom = "15%";
          if (card.classList[1] != undefined){
            card.classList.remove("up");
          }

        });

        img.style.bottom = "20%";
        img.classList.add("up");
    }
    else {
        Intent(img.alt, img);
    }

}

/// Declic général ///

document.addEventListener('click', function (event) {
    if (!event.target.matches('.cards')){
        const cards = document.querySelectorAll('.cards');

        cards.forEach(card => {
          card.style.bottom = "15%";
          if (!(card.classList[1] == undefined)){
            card.classList.remove("up");
          }
        });
    }
})


//Phase de fight
async function delay (ms) {
    return new Promise((resolve,reject) => setTimeout(resolve,ms));
}

//Tour de jeu

async function affichageDegat(degat,valeur,posneg){
    let player = document.getElementById("dmg-number-player");
    let opponent = document.getElementById("dmg-number-opponent");

    let style = window.getComputedStyle(degat);
    let styleLeftValue = style.getPropertyValue("left").replace("px","");
    let styleTopValue = style.getPropertyValue("top").replace("px","");
    const baseLeftValue = degatBaseLeft(degat);
    const baseTopValue = degatBaseTop(degat);


    styleLeftValue = baseLeftValue;
    styleTopValue = baseTopValue;
    degat.style.left = styleLeftValue + "px";
    degat.style.top = styleTopValue + "px";
 

    const rdm_x = Math.floor(Math.random() * (-2 - -4 + 1)) + -6
    const rdm_y = Math.floor(Math.random() * (6 - 0 + 1)) + 0


    let signe = "";

    if (posneg == "positif"){
        signe = "+ ";
        degat.style.color = "green";  
    }
    else{
        signe = "- "; 
        degat.style.color = "red";     
    }

    degat.innerHTML = signe + valeur;
    degat.style.opacity = 1;


    while (degat.style.opacity > 0){
        await delay(30);
        if (degat == player){
            degat.style.left = (Number(Math.floor(styleLeftValue)) + rdm_x + "px");        
        }
        else if (degat == opponent){
            degat.style.left = (Number(Math.floor(styleLeftValue)) - rdm_x + "px");
         
        }
        degat.style.top = (Number(Math.floor(styleTopValue)) - rdm_y + "px");  
        
        styleLeftValue = style.getPropertyValue("left").replace("px","");
        styleTopValue = style.getPropertyValue("top").replace("px","");

        degat.style.opacity = degat.style.opacity - 0.05;


    }
}

async function CalculDegat(vainqueur, playerAttack, opponentAttack, comboCounter, numeroIntent){
    let dgt_p = document.getElementById("dmg-number-player");
    let dgt_o = document.getElementById("dmg-number-opponent");
    let mc = document.getElementById("mc");
    let playerStr;
    let opponentStr;
    switch(opponentAttack){
        case undefined:
        opponentStr = 0;
        break;
        case "rock":
        opponentStr = opponent_str_rock;
        break;

        case "paper":
        opponentStr = opponent_str_paper;    
        break;
        
        case "scissors":
        opponentStr = opponent_str_scissors;    
        break;        
    }
    switch(playerAttack){
        case "rock":
        case "stun":
        case "opportunity":
        case "rockBoost":
        playerStr = player_str_rock;
        break;

        case "rage":
        playerStr = player_str_rock + Math.floor(player_str_rock/2);
        break;

        case "paper":
        case "eater":
        case "foresight":
        case "paperBoost":
        playerStr = player_str_paper;    
        break;

        case "counter":
        playerStr = Math.floor(player_str_paper) + parseInt(opponentStr);    
        break;
        
        case "scissors":
        case "idea":
        case "scissorsBoost":
        playerStr = player_str_scissors;    
        break;     

        case "flurry":
        playerStr = Math.floor(player_str_scissors*0.5);    
        break;

        case "poke":
        playerStr = Math.floor(player_str_scissors*0.25);    
        break;  
    }

    if (vainqueur == "opponent"){
        playHitSound();
        playerHealthbar.value = playerHealthbar.value - opponentStr;
        affichageDegat(dgt_p, opponentStr, "negatif");
        resetCombo();
    }

    if (vainqueur == "mc"){
        if (playerAttack == "eater"){
            playHitSound();
            if ((opponentStr != 0)){
                playerHealthbar.value = playerHealthbar.value + opponentStr;  
                affichageDegat(dgt_p, opponentStr, "positif");
            }
            opponent_healthbar.value = opponent_healthbar.value - playerStr; 
            affichageDegat(dgt_o, playerStr, "negatif");
            if (opponent_healthbar.value < 0){
                opponent_healthbar.value = 0;
            }
            hitCombo();
        }
        if (playerAttack == "stun"){
            playHitSound();
            opponent_healthbar.value = opponent_healthbar.value - playerStr; 
            affichageDegat(dgt_o, playerStr, "negatif");
            if (opponent_healthbar.value < 0){
                opponent_healthbar.value = 0;
            }
            intentArrayOpponent[numeroIntent+1] = undefined;

            const intents = document.querySelectorAll('.intent-o');
            if (intents[numeroIntent+1] != undefined){
                intents[numeroIntent+1].src = "img/intent/intent.png";
            }
            hitCombo();
        }
        if (playerAttack == "flurry"){
            if (comboCounter == 0){
                playHitSound();
                mc.src = "img/mc/fkick1.png";
                opponent_healthbar.value = opponent_healthbar.value - playerStr; 
                affichageDegat(dgt_o, playerStr, "negatif");
                if (opponent_healthbar.value < 0){
                    opponent_healthbar.value = 0;
                }
                hitCombo();
            }
            else {
                for (let i = 0; i < comboCounter; i++){
                    await delay(10);
                    if (i == 0){
                        playHitSound();
                        mc.src = "img/mc/fkick1.png";
                    }
                    if (i % 2 == 0){
                        playHitSound();
                        mc.src = "img/mc/fkick2.png";
                    }
                    if (!(i % 2 == 0)){
                        playHitSound();
                        mc.src = "img/mc/fkick3.png";
                    }
    
                    opponent_healthbar.value = opponent_healthbar.value - playerStr;  
                    affichageDegat(dgt_o, playerStr, "negatif");
                    if (opponent_healthbar.value < 0){
                        opponent_healthbar.value = 0;
                    }      
                    hitCombo();  
                }
            }



        }
        else if (playerAttack == "rock" || playerAttack == "paper" || playerAttack == "scissors" || playerAttack == "rage" || playerAttack == "poke" || playerAttack == "counter" || playerAttack == "scissorsBoost" || playerAttack == "paperBoost" || playerAttack == "rockBoost" || playerAttack == "idea" || playerAttack == "opportunity" || playerAttack == "foresight"){
            playHitSound();
            opponent_healthbar.value = opponent_healthbar.value - playerStr;
            affichageDegat(dgt_o, playerStr, "negatif");
            if (opponent_healthbar.value < 0){
                opponent_healthbar.value = 0;
            }
            hitCombo();
        }

    }
    if (vainqueur == "draw"){
        playDrawSound();
        if (playerAttack == "poke"){ 
            opponent_healthbar.value = opponent_healthbar.value - playerStr;
            affichageDegat(dgt_o, playerStr, "negatif");
            if (opponent_healthbar.value < 0){
                opponent_healthbar.value = 0;
            }
            hitCombo();
        }
        else{
            resetCombo();
        }
    }
    Combo();
}

//////////////////////////////////// FIN DU COMBAT ////////////////////////////////////
async function endFight(winner){     
        moveAll(mc,opponent,"0",winner);
        let end = document.getElementById("endfight");
        let endText = document.getElementById("endfight-text");
        setTimeout(() => {
            end.style.display = "initial"
            document.getElementById("intent-opponent").style.display = "none";
            document.getElementById("intent-player").style.display = "none";
            document.getElementById("combo-p").style.display = "none";
            if (winner == "player"){
                mc.src = "img/mc/stand.gif";
                opponent.src = "img/enemy/"+ opponentSprite + "/ko.png";
                endText.innerHTML = "You defeated your opponent!"

            }
            else{
                mc.src = "img/mc/ko.png";
                opponent.src = "img/enemy/"+ opponentSprite + "/stand.gif";     
                endText.innerHTML = "You were defeated..."       
            }


        },400);
        
        setTimeout(() => {
            if (winner == "player"){
                sessionStorage.setItem("Hp", playerHealthbar.value)
                let level = sessionStorage.getItem("Level");
                level = parseInt(level) + 1;
                sessionStorage.setItem("Level", level);
                window.location.href="./rewards.html";
            }
            else{
                window.location.href="./lose.html";
            }
        },2000);
}

/////////////////////////////////////////////////////////////////////////////////

function Combat(mc, opponent){
    let arrayUtilise; //array utilisé dans le loop
    if (intentArrayPlayer.length >= intentArrayOpponent.length){
        arrayUtilise = intentArrayPlayer.length;
    }
    else{
        arrayUtilise = intentArrayOpponent.length;        
    }


    
    async function Battle () {
        for (let i=0;i<arrayUtilise;i++){
            await delay(500);
            mc.src = "img/mc/stand.gif";
            opponent.src = "img/enemy/"+ opponentSprite + "/stand.gif";
            await delay(500);
            switch(intentArrayPlayer[i]){
                case undefined:
                    switch (intentArrayOpponent[i]){
                        case undefined:
                        break
                        case "rock":   
                        mc.src = "img/mc/hurt.png";
                        opponent.src = "img/enemy/"+ opponentSprite + "/rock.png";
                        CalculDegat("opponent", intentArrayPlayer[i], intentArrayOpponent[i]);
                        break;     
                        
                        case "paper":
                        mc.src = "img/mc/hurt.png";
                        opponent.src = "img/enemy/"+ opponentSprite + "/paper.png";       
                        CalculDegat("opponent", intentArrayPlayer[i], intentArrayOpponent[i]);         
                        break;
        
                        case "scissors":
                        mc.src = "img/mc/hurt.png";
                        opponent.src = "img/enemy/"+ opponentSprite + "/scissors.png";     
                        CalculDegat("opponent", intentArrayPlayer[i], intentArrayOpponent[i]);     
                        break;
                             
                    }
                    break;
                case "rock":
                case "opportunity":
                case "rockBoost":
                case "rage":
                case "stun":
                switch (intentArrayOpponent[i]){
                    case undefined:
                    CalculDegat("mc", intentArrayPlayer[i], intentArrayOpponent[i],combo,i);
                    mc.src = "img/mc/rock.png";
                    opponent.src = "img/enemy/"+ opponentSprite + "/hurt.png";
                    break
                    case "rock":   
                    CalculDegat("draw", intentArrayPlayer[i], intentArrayOpponent[i]);
                    mc.src = "img/mc/rock.png";
                    opponent.src = "img/enemy/"+ opponentSprite + "/rock.png";
                    break;     
                    
                    case "paper":
                    CalculDegat("opponent", intentArrayPlayer[i], intentArrayOpponent[i]);
                    mc.src = "img/mc/hurt.png";
                    opponent.src = "img/enemy/"+ opponentSprite + "/paper.png";                
                    break;
    
                    case "scissors":
                    CalculDegat("mc", intentArrayPlayer[i], intentArrayOpponent[i],combo, i);
                    mc.src = "img/mc/rock.png";
                    opponent.src = "img/enemy/"+ opponentSprite + "/hurt.png";          
                    break;
                         
                }
                break;
    
                case "paper":
                case "foresight":
                case "paperBoost":
                case "eater":           
                case "counter":         
                switch (intentArrayOpponent[i]){
                    case undefined:
                    CalculDegat("mc", intentArrayPlayer[i], intentArrayOpponent[i]);
                    mc.src = "img/mc/paper.png";
                    opponent.src = "img/enemy/"+ opponentSprite + "/hurt.png";
                    break
                    case "rock":  
                    CalculDegat("mc", intentArrayPlayer[i], intentArrayOpponent[i]); 
                    mc.src = "img/mc/paper.png";
                    opponent.src = "img/enemy/"+ opponentSprite + "/hurt.png";
                    break;     
                    
                    case "paper":
                    CalculDegat("draw", intentArrayPlayer[i], intentArrayOpponent[i]);
                    mc.src = "img/mc/paper.png";
                    opponent.src = "img/enemy/"+ opponentSprite + "/paper.png";                
                    break;
    
                    case "scissors":
                    CalculDegat("opponent", intentArrayPlayer[i], intentArrayOpponent[i]);
                    mc.src = "img/mc/hurt.png";
                    opponent.src = "img/enemy/"+ opponentSprite + "/scissors.png";          
                    break;
                         
                }
                break;
    
                case "scissors":
                case "idea":
                case "scissorsBoost":
                case "poke":
                case "flurry":
                switch (intentArrayOpponent[i]){
                    case undefined:
                    mc.src = "img/mc/scissors.png";
                    opponent.src = "img/enemy/"+ opponentSprite + "/hurt.png";
                    CalculDegat("mc", intentArrayPlayer[i], intentArrayOpponent[i],combo);
                    break
                    case "rock":   
                    CalculDegat("opponent", intentArrayPlayer[i], intentArrayOpponent[i]);
                    mc.src = "img/mc/hurt.png";
                    opponent.src = "img/enemy/"+ opponentSprite + "/rock.png";
                    break;     
                    
                    case "paper":
                    mc.src = "img/mc/scissors.png";
                    opponent.src = "img/enemy/"+ opponentSprite + "/hurt.png";      
                    CalculDegat("mc", intentArrayPlayer[i], intentArrayOpponent[i],combo);          
                    break;
    
                    case "scissors":
                    CalculDegat("draw", intentArrayPlayer[i], intentArrayOpponent[i]);
                    mc.src = "img/mc/scissors.png";
                    opponent.src = "img/enemy/"+ opponentSprite + "/scissors.png";          
                    break;
                         
                }
                break;
            }
            if (playerHealthbar.value <= 0 || opponent_healthbar.value <= 0){
                await delay(1000)
                if (opponent_healthbar.value <= 0){
                    endFight("player");
                    return;
                }
                else if (playerHealthbar.value <= 0){
                    if (rechercheArtifact(Stats.aureole) > 0){
                        for (let i = 0; i < artifacts.length; i++){
                            if (artifacts[i].alt == Stats.aureole.alt){
                                artifacts.splice(i,1);
                                resetArtefact();
                            }
                        }
                        for (let i = 0; i < artifactBase.length; i++){
                            if (artifactBase[i].alt == Stats.aureole.alt){
                                artifactBase.splice(i,1);
                                sessionStorage.setItem("ssArtifacts", JSON.stringify(artifactBase));
                            }
                        }
                        playerHealthbar.value = Math.floor(playerHealthbar.max/3);
                    }
                    else{
                        endFight("opponent");
                        return;
                    }
                }
            }
        }
        await delay(1000)
        positionInitial(mc, opponent);
        await delay(1000)
    }

    Battle();




}
async function moveAll (mc,opponent,position,winner) {

    let mcStyle = window.getComputedStyle(mc);
    let mcLeftValue = mcStyle.getPropertyValue("left").replace("px","");
    const baseLeftValue = mcLeftValue;

    let opponentStyle = window.getComputedStyle(opponent);
    let opponentLeftValue = opponentStyle.getPropertyValue("left").replace("px","");
    
    let pixel = 6;

    if (winner =="noone"){
        if (position == "start"){
            //tenter un "while < à une certaine valeur" genre "arena/2"
            while(mcLeftValue < (baseLeftValue/1.5)){
                await delay(10);
                mc.style.left = (Number(Math.floor(mcLeftValue)) + pixel + "px");
                opponent.style.left = (Number(Math.floor(opponentLeftValue)) - pixel + "px");

                mcStyle = window.getComputedStyle(mc);
                opponentStyle = window.getComputedStyle(opponent);

                mcLeftValue = mcStyle.getPropertyValue("left").replace("px","");
                opponentLeftValue = opponentStyle.getPropertyValue("left").replace("px","");

            }

        }
        if (position == "end"){
            while(mcLeftValue > (baseLeftValue*1.5)){
                await delay(10);
                mc.style.left = (Number(Math.floor(mcLeftValue)) - pixel + "px");
                opponent.style.left = (Number(Math.floor(opponentLeftValue)) + pixel + "px");
        
                mcStyle = window.getComputedStyle(mc);
                opponentStyle = window.getComputedStyle(opponent);
        
                mcLeftValue = mcStyle.getPropertyValue("left").replace("px","");
                opponentLeftValue = opponentStyle.getPropertyValue("left").replace("px","");
            }
        }
    }
    else{
        if (winner == "player"){
            while(mcLeftValue > (baseLeftValue*1.5)){
                await delay(10);
                mc.src = "img/mc/run.png";
                mc.style.left = (Number(Math.floor(mcLeftValue)) - pixel + "px");
    
                mcStyle = window.getComputedStyle(mc);
    
                mcLeftValue = mcStyle.getPropertyValue("left").replace("px","");
            }
        }
        else if (winner == "opponent"){
            //Bug ici
            while(opponentLeftValue < 0){
                await delay(10);
                opponent.src = "img/enemy/"+ opponentSprite + "/run.png";
                opponent.style.left = (Number(Math.floor(opponentLeftValue)) + pixel + "px");
    
                opponentStyle = window.getComputedStyle(opponent);
    
                opponentLeftValue = opponentStyle.getPropertyValue("left").replace("px","");
            }        
        }
    }
}
///RESET LES INTENTS ET LES ARRAYS///
async function positionInitial(mc, opponent){
    mc.src = "img/mc/run.png";
    opponent.src = "img/enemy/"+ opponentSprite + "/run.png";
    
    moveAll(mc,opponent, "end","noone");

    setTimeout(() => {
        mc.src = "img/mc/stand.gif";
        opponent.src = "img/enemy/"+ opponentSprite + "/stand.gif";
    },400);

    setTimeout(() => {
        drawTurn();
    },1000);

    
}

function faceToFace(mc, opponent){
    mc.src = "img/mc/run.png";
    opponent.src = "img/enemy/"+ opponentSprite + "/run.png";
    
    moveAll(mc,opponent,"start","noone");

    setTimeout(() => {
        mc.src = "img/mc/stand.gif";
        opponent.src = "img/enemy/"+ opponentSprite + "/stand.gif";
    },400);

    setTimeout(() => {
        Combat(mc, opponent);
    },1000);

    
}

document.addEventListener('click', function (event) {
    if (event.target.matches('#button-fight')){
        tourDeJeu(this);
    }
})

function tourDeJeu(){
    document.getElementById("button-fight").style.display = "none";
    document.getElementById("intent-opponent").style.display = "initial";

    let mc = document.getElementById("mc");
    let opponent = document.getElementById("opponent");

    faceToFace(mc, opponent);
    const cards = document.querySelectorAll('.cards');

    cards.forEach(card => {
        Defausse(card.alt)
        card.remove();
    });
}

async function drawTurn(){
    let mc = document.getElementById("mc");
    let opponent = document.getElementById("opponent");
    document.getElementById("intent-opponent").style.display = "none";


    mc.src = "img/mc/stand.gif";
    opponent.src = "img/enemy/"+ opponentSprite + "/stand.gif";

    intentArrayOpponent = [];
    intentArrayPlayer = [];


    if (rechercheArtifact(Stats.nunchaku) == 0){
        resetCombo();
    }
    strengthReset();
    rechercheAura();
    intentClear();
    randomizedOpponentAction(opIntentMax);

    for (let i = 0; i < piocheMax; i++){
        await delay(120);
        Pioche(1);
    }
    document.getElementById("button-fight").style.display = "initial";


}

drawTurn()

