let log = new Log(document.querySelector('.log'));

let char = new Sorcerer('Gui');

let monster = new LittleMonster();

let imgEl = document.querySelector("#monsterImg")

let imgVictory = document.querySelector("#roundImgVictory")

let imgDefeated = document.querySelector("#roundImgDefeated")
let restart = document.querySelector("#restart")


const stage = new Stage(
    char,
    monster,
    document.querySelector('#char'),
    document.querySelector('#monster'),
    log,
    imgEl
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

function showDefeat (){
    imgDefeated.style.display = "block";
    restart.style.display = "block";

}



stage.start();