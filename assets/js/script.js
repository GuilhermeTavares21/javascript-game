let log = new Log(document.querySelector('.log')); 

let char = new Sorcerer("Gui");

let monster = new LittleMonster();

//Round

let round = 1;
let roundEl = document.querySelector("#round")

//Atributos

let pointsAvailable = 0;
let pointsAvailableEl = document.querySelector("#pointsAvailable")

let pointsAddHPEl = document.querySelector(".addHP")
let pointsAddAttackEl = document.querySelector(".addAttack")
let pointsAddDefenseEl = document.querySelector(".addDefense")

pointsAddAttackEl.addEventListener("click", addAttack)
pointsAddHPEl.addEventListener("click", addHP)
pointsAddDefenseEl.addEventListener("click", addDefense)

let showHPEl = document.querySelector('#showHP')
let showAttackEl = document.querySelector('#showAttack')
let showDefenseEl = document.querySelector('#showDefense')

    // Adicionar Atributos

function addAttack () {
    if (pointsAvailable > 0){
    pointsAvailable -= 1
    char.attack += 2
    stage.update()
    }
}
function addHP () {
    if (pointsAvailable > 0){
    pointsAvailable -= 1
    char.maxLife += 40
    stage.update()
    }
}
function addDefense () {
    if (pointsAvailable > 0){
    pointsAvailable -= 1
    char.defense += 1
    stage.update()
    }
}


//Imagens

let imgEl = document.querySelector("#monsterImg")

let imgVictory = document.querySelector("#roundImgVictory")

let imgDefeated = document.querySelector("#roundImgDefeated")
let restart = document.querySelector("#restart")
let roundCounter = document.querySelector(".roundCounter")


const stage = new Stage(
    char,
    monster,
    document.querySelector('#char'),
    document.querySelector('#monster'),
    log,
    imgEl,
    round,
    roundEl,
    pointsAvailable,
    pointsAvailableEl,
    showHPEl,
    showAttackEl,
    showDefenseEl,
    pointsAddHPEl,
    pointsAddAttackEl,
    pointsAddDefenseEl
);

function noShowVictory () {
    imgVictory.style.display = "none";
}

function showVictory (){
    imgVictory.style.display = "block";
    setTimeout(noShowVictory, 2000);
}

function noShowDefeat () {
    imgDefeated.style.display = "none";
}

function noShowRound () {
    roundCounter.style.display = "none";
}

function showDefeat (){
    imgDefeated.style.display = "block";
    restart.style.display = "block";
    roundCounter.style.display = "block";

}

function showRound () {
    roundCounter.style.display = "block";
    setTimeout (noShowRound, 2000);
}



stage.start();