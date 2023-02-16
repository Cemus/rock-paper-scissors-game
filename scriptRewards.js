
import * as Stats from "./scriptStats.js";

//No load back
window.history.pushState(null, null, window.location.href);
window.onpopstate = function () {
    window.history.go(1);
};

let maxHp = sessionStorage.getItem("maxHp");
if (maxHp == null){
    sessionStorage.setItem("maxHp", 100);
    maxHp = sessionStorage.getItem("maxHp")
}
let Hp = sessionStorage.getItem("Hp")
if (Hp == null){;
    sessionStorage.setItem("Hp", 100);
    Hp = sessionStorage.getItem("Hp");
}

let ssDeck = JSON.parse(sessionStorage.getItem('ssDeck'));
let deck = JSON.parse(sessionStorage.getItem('ssDeck'));
if (deck == null){
    ssDeck =[];
    ssDeck.push(Stats.rock,Stats.rock,Stats.paper,Stats.paper,Stats.scissors,Stats.scissors);
    sessionStorage.setItem("ssDeck", JSON.stringify(ssDeck));
    deck = JSON.parse(sessionStorage.getItem('ssDeck'));
}

let ssArtifacts = JSON.parse(sessionStorage.getItem('ssArtifacts'));
let artifacts = JSON.parse(sessionStorage.getItem('ssArtifacts'));


let allArtifacts = Stats.allArtifacts;
let allCards = Stats.allCards;






//Health
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

let playerHealthbar = document.getElementById("player-health");
let hpText = document.getElementById("hp");
let hpTextMax = document.getElementById("hpMax");

function calculHp(){
    maxHp = sessionStorage.getItem("maxHp");
    Hp = sessionStorage.getItem("Hp");
    playerHealthbar.max = maxHp;
    playerHealthbar.value = Hp;
    hpTextMax.innerHTML = playerHealthbar.max;
    hpText.innerHTML = playerHealthbar.value;
}

calculHp();



function rechercheProtection(){
    let hp;
    hp = 100;
    let protection = 0;

    protection = protection + 50 * rechercheArtifact(Stats.protect);
    hp = hp + protection;
    sessionStorage.setItem("maxHp", hp);
    calculHp();
}

function hoverDescription(artifact){
    artifact.style.cursor = "help";
}
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
            artifact.alt = artifacts[i].alt;
            artifact.style.zIndex = 1;
            document.getElementById('artifacts-list').appendChild(artifact);  
            artifact.addEventListener('mouseenter',function() {hoverDescription(this)});
        }   
    }
}
generationArtefact()

function Hover(obj){
    obj.style.cursor = "pointer";
}

let pageCards = 0;

function displayCards(page){
    const everyCards = document.querySelectorAll('.cards');
    const buttonNext = document.querySelectorAll('.button-page-next');
    const buttonBefore = document.querySelectorAll('.button-page-previous');
    everyCards.forEach(card => {
        card.remove();
    });  
    buttonNext.forEach(button => {
        button.remove();
    });   
    buttonBefore.forEach(button => {
        button.remove();
    });  

    const maxPage = deck.length - (6 * page);
    const _i = 6*page;

        if (page != 0){  
            createButton("previous");
        }
        for (let i=_i; i < _i + 6; i++){
            if (i < deck.length ){
                const img = document.createElement("img");
                img.src = deck[i].img;
                img.alt = deck[i].type;
                img.title = deck[i].description;
                img.classList.add("cards");
                /*img.addEventListener('click',function() {cardClick(this)});
                img.addEventListener('mouseenter',function() {Hover(this)});*/
                document.getElementById('cards-list').appendChild(img);  
                img.addEventListener('mouseenter',function() {hoverDescription(this)});
            }
        }    
        if (maxPage > 6 ){  
            createButton("next");
        }

}

function changePage(plusmoins){
    if (plusmoins == "next"){
        pageCards = pageCards + 1;
        displayCards(pageCards);
    }
    if (plusmoins == "previous"){
        pageCards = pageCards - 1;
        displayCards(pageCards);
    }
}

function createButton(plusmoins){
    if (plusmoins == "next"){
        const btn = document.createElement("button");  
        const text = document.createTextNode(">");
        btn.classList.add("button-page-next");
        document.getElementById('cards-list').appendChild(btn);  
        document.getElementsByClassName('button-page-next')[0].appendChild(text);
        btn.addEventListener('click',function() {changePage("next")});
        btn.addEventListener('mouseenter',function() {Hover(this)});
    }
    else{
        const btn = document.createElement("button");  
        const text = document.createTextNode("<");
        btn.classList.add("button-page-previous");
        document.getElementById('cards-list').appendChild(btn);  
        document.getElementsByClassName('button-page-previous')[0].appendChild(text);
        btn.addEventListener('click',function() {changePage("previous")});
        btn.addEventListener('mouseenter',function() {Hover(this)});       
    }

}

displayCards(pageCards);

//////////////////////////////////////////
let randomArtifactSet = [];
randomSet("artifact");

let randomCardSet = [];
randomSet("card");

function randomSet(item){
    switch (item){
        case "artifact":
        for (let i = 0; i < 3; i++){
            randomArtifactSet.push(allArtifacts[Math.floor(Math.random()*allArtifacts.length)]);
        }
        break

        case "card":
        for (let i = 0; i < 3; i++){
            randomCardSet.push(allCards[Math.floor(Math.random()*allCards.length)]);
        }
        break
    }
}


function generationRandomSet(articard){
    switch (articard){
        case "artifact":
            for (let i=0; i < 3; i++){
                const container = document.createElement("div");
                const artifact = document.createElement("img");
                const title = document.createElement("p");
                const desc = document.createElement("p");
                container.classList.add("bonus-container");
                artifact.classList.add("bonus");
                title.classList.add("bonus-title");
                desc.classList.add("bonus-desc");
                artifact.src = randomArtifactSet[i].img;
                artifact.title = randomArtifactSet[i].description;
                artifact.alt = randomArtifactSet[i].alt;
                title.innerHTML = randomArtifactSet[i].title;
                desc.innerHTML = randomArtifactSet[i].desc;
                artifact.style.zIndex = 1;
                document.getElementById('actions').appendChild(container); 
                document.getElementsByClassName("bonus-container")[i].appendChild(artifact);
                document.getElementsByClassName("bonus-container")[i].appendChild(title);
                document.getElementsByClassName("bonus-container")[i].appendChild(desc);
                artifact.addEventListener('mouseenter',function() {Hover(this)})
                artifact.addEventListener('click',function() {bonusChoice(artifact.alt,"artifact")})
            } 
            break;
    
        case "card":
            for (let i=0; i < 3; i++){
                const card = document.createElement("img");
                card.classList.add("card");
                card.src = randomCardSet[i].img;
                card.alt = randomCardSet[i].type;
                card.style.zIndex = 1;
                document.getElementById('actions').appendChild(card);  
                card.addEventListener('mouseenter',function() {Hover(this)})
                card.addEventListener('click',function() {bonusChoice(card.alt,"card")})
            } 
            break;
    }
  
}


let actionSelect = document.querySelectorAll('.action');
actionSelect.forEach(action => {
    action.addEventListener('click',function() {Actions(action,action.classList[1])});
    action.addEventListener('mouseenter',function() {Hover(this)});
});

let furtherButton = document.getElementById("further");
furtherButton.addEventListener('click',function() {Fight()});
furtherButton.addEventListener('mouseenter',function() {Hover(this)});

function findObjectByKey(allCards, attribute, value) {
    for (let i = 0; i < allCards.length; i++) {
        if (allCards[i][attribute] === value) {
            return allCards[i];
        }
    }
    return null;
}
function bonusChoice(alt, element){
    if (element == "artifact"){
        let obj = findObjectByKey(allArtifacts, "alt", alt);
        if (artifacts == null){
            ssArtifacts = [];
            ssArtifacts.push(obj);
            sessionStorage.setItem("ssArtifacts", JSON.stringify(ssArtifacts));
            artifacts = JSON.parse(sessionStorage.getItem('ssArtifacts'));
        }
        else{
        ssArtifacts.push(obj);
        sessionStorage.setItem("ssArtifacts", JSON.stringify(ssArtifacts));
        artifacts = JSON.parse(sessionStorage.getItem('ssArtifacts'));
        }
        resetArtefact();

        let menu = document.getElementById("actions");
        menu.remove();
        const menuText =  document.querySelectorAll(".action-menu-text");
        menuText.forEach(text => {
        text.innerHTML = "You equipped the artifact!"  
        let further = document.getElementById("further");   
        further.style.display = "initial";    

        rechercheProtection();
        });
    }
    else if (element == "card"){
        let obj = findObjectByKey(allCards, "type", alt);
        ssDeck.push(obj);
        sessionStorage.setItem("ssDeck", JSON.stringify(ssDeck));
        deck = JSON.parse(sessionStorage.getItem('ssDeck'));
        displayCards(pageCards);

        let menu = document.getElementById("actions");
        menu.remove();    
        const menuText =  document.querySelectorAll(".action-menu-text");
        menuText.forEach(text => {
        text.innerHTML = "The card was added to your deck!"         
        });
        let further = document.getElementById("further");   
        further.style.display = "initial";  
        
    }

}

function Actions(carte, classlist){
    const menuText =  document.querySelectorAll(".action-menu-text");
    switch (classlist){
        case "learn":
            menuText.forEach(text => {
            text.innerHTML = "Choose a card :";           
            });
            actionSelect.forEach(action => {
                action.remove();
            });
            generationRandomSet("card");
            break;

        case "rest":
            menuText.forEach(text => {
                text.innerHTML = "You have rested well!" ;           
                });
            actionSelect.forEach(action => {
                action.remove();
            });
            let hp = parseInt(Hp);
            let mhp = parseInt(maxHp);
            hp = hp + (mhp / 2);
            sessionStorage.setItem("Hp", parseInt(hp));
            calculHp();
            let further = document.getElementById("further");   
            further.style.display = "initial";  
            break;

        case "treasure":
            menuText.forEach(text => {
                text.innerHTML = "Choose an artifact :" ;           
                });
            actionSelect.forEach(action => {
                action.remove();
            });
            generationRandomSet("artifact");
            break;
    }
}

function Fight(){
    window.location.replace("./versus.html");   
}


