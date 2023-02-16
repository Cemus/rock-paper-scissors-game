///Artefact //
export let aureole ={
    img: "img/artifacts/aureole.png",
    description: "Aureole : Revives you with 1/3 of your maximum health points.",
    title: "Aureole :",
    desc : "Revives you with 1/3 HP",
    alt: "aureole",
};
export let apple ={
    img: "img/artifacts/apple.png",
    description: "Apple : Gives 10% health points after a battle.",
    title: "Apple :",
    desc : "10% HP after battle",
    alt: "apple",
};
export let bandage ={
    img: "img/artifacts/bandage.png",
    description: "Bandage : Gives 10% health points after a battle.",
    title: "Bandage :",
    desc : "10% HP after battle",
    alt: "bandage",
};
export let draw ={
    img: "img/artifacts/draw.png",
    description: "Draw : Gives one more card at the beginning of each round.",
    title: "Draw :",
    desc : "Draw + 1",
    alt: "draw",
};
export let protect ={
    img: "img/artifacts/protec.png",
    description: "Protection : Gives + 50 maximum health points.",
    title: "Protection :",
    desc : "+50 HP",
    alt: "protect",
};
export let strike ={
    img: "img/artifacts/strike.png",
    description: "Strike + 1 : Gives one more strike.",
    title: "Strike + 1 :",
    desc : "+1 strike",
    alt: "strike",
};
export let nunchaku ={
    img: "img/artifacts/combo.png",
    description: "Nunchaku : The combo meter doesn't reset after each round.",
    title: "Nunchaku :",
    desc : "Combo meter doesn't reset",
    alt: "nunchaku",
};
export let kickboost ={
    img: "img/artifacts/kickboost.png",
    description: "Kick training : Your scissors based attacks inflict more damage.",
    title: "Kick training :",
    desc : "Scissors damage +",
    alt: "kickboost",
};
export let palmboost ={
    img: "img/artifacts/palmboost.png",
    description: "Palm training : Your paper based attacks inflict more damage.",
    title: "Palm training :",
    desc : "Paper damage +",
    alt: "palmboost",
};
export let fistboost ={
    img: "img/artifacts/rockboost1.png",
    description: "Fist training : Your rock based attacks inflict more damage.",
    title: "Fist training :",
    desc : "Rock damage +",
    alt: "fistboost",
};
export let aurarock ={
    img: "img/artifacts/aurarock.png",
    description: "Rock aura : Rock attacks up",
    alt: "aurarock",
    
};
export let aurapaper ={
    img: "img/artifacts/aurapaper.png",
    description: "Paper aura : Paper attacks up",
    alt: "aurapaper",
};
export let aurascissors ={
    img: "img/artifacts/aurascissors.png",
    description: "Scissors aura : Scissors attacks up",
    alt: "aurascissors",
};


//Cards

export let rock = {
    category: "attack",
    type:"rock",
    img: "img/cards/rock.png",
    intent:"img/Intent/intent_rock.png",
    description: "Rock : Rock attack",
};

export let rage = {
    category: "attack",
    type:"rage",
    img: "img/cards/rage.png",
    intent:"img/Intent/intent_rock.png",
    description: "Rage punch : Hits with a strong attack",
};

export let stun = {
    category: "attack",
    type:"stun",
    img: "img/cards/stun.png",
    intent:"img/Intent/intent_rock.png",
    description: "Stunning blow : Cancel opponent's strike",
};

export let paper = {
    category: "attack",
    type:"paper",
    img: "img/cards/paper.png",
    intent:"img/Intent/intent_paper.png",
    description: "Paper : Paper attack",
};

export let eater = {
    category: "attack",
    type:"eater",
    img: "img/cards/eater.png",
    intent:"img/Intent/intent_paper.png",
    description: "Punch eater : Heals from a rock attack",
};

export let counter = {
    category: "attack",
    type:"counter",
    img: "img/cards/counter.png",
    intent:"img/Intent/intent_paper.png",
    description: "Palm counter : Uses rock's strength to strike",
};


export let scissors = {
    category: "attack",
    type:"scissors",
    img: "img/cards/scissors.png",
    intent:"img/Intent/intent_scissors.png",
    description: "Scissors : Scissors attack",
};

export let poke = {
    category: "attack",
    type:"poke",
    img: "img/cards/poke.png",
    intent:"img/Intent/intent_scissors.png",
    description: "Poke : Weak kick that hits on draw",
};

export let flurry = {
    category: "attack",
    type:"flurry",
    img: "img/cards/flurry.png",
    intent:"img/Intent/intent_scissors.png",
    description: "Flurry kick : One kick per combo",
};

export let foresight = {
    category: "special",
    type:"foresight",
    img: "img/cards/foresight.png",
    intent:"img/Intent/intent_paper.png",
    description: "Foresight : Shows opponent's intents",
};

export let idea = {
    category: "special",
    type:"idea",
    img: "img/cards/idea.png",
    intent:"img/Intent/intent_scissors.png",
    description: "Idea : Draws two cards",
};

export let opportunity = {
    category: "special",
    type:"opportunity",
    img: "img/cards/opportunity.png",
    intent:"img/Intent/intent_rock.png",
    description: "Opportunity : Allows an extra attack",
};


export let rockBoost ={
    category: "special",
    type:"rockBoost",
    img: "img/cards/rockBoost.png",
    intent:"img/Intent/intent_rock.png",
    description: "Rock boost : Rock attacks up for the turn",
};

export let paperBoost ={
    category: "special",
    type:"paperBoost",
    img: "img/cards/paperBoost.png",
    intent:"img/Intent/intent_paper.png",
    description: "Paper boost : Paper attacks up for the turn",
};

export let scissorsBoost ={
    category: "special",
    type:"scissorsBoost",
    img: "img/cards/scissorsBoost.png",
    intent:"img/Intent/intent_scissors.png",
    description: "Scissors boost : Scissors attacks up for the turn",
};

//////////////////////////////////////////////////////////////////////////

///Stats



let ssAllCards = [];
let ssAllArtifacts = [];

ssAllCards.push(rock, stun, rage, paper,counter, eater, scissors, flurry, poke, foresight, idea, opportunity, rockBoost, paperBoost, scissorsBoost);
ssAllArtifacts.push(aureole,draw,protect,strike,nunchaku,fistboost,palmboost,kickboost);

export let allArtifacts = [aureole,draw,protect,strike,nunchaku,fistboost,palmboost,kickboost];
export let allCards = [rock, stun, rage, paper,counter, eater, scissors, flurry, poke, foresight, idea, opportunity, rockBoost, paperBoost, scissorsBoost];
 









