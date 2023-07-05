class Character {

    _life = 1;
    maxLife = 1;
    attack= 0;
    defense = 0;

    constructor(name) {
        this.name = name;
    }

    get life () {
        return this._life;
    }

    set life(newLife) {
        this._life = newLife < 0 ? 0 : newLife;
    }
}

class Knight extends Character {
    constructor(name) {
        super(name);
        this.life = 100;
        this.attack = 10;
        this.defense = 6;
        this.maxLife = this.life;
    }
}

class Sorcerer extends Character {
    constructor(name) {
        super(name);
        this.life = 110;
        this.attack = 7;
        this.defense = 5;
        this.maxLife = this.life;
    }
}

class LittleMonster extends Character {
    constructor() {
        super("Little Monster")
        this.life = 60;
        this.attack = 4;
        this.defense = 2;
        this.maxLife = this.life;
    }
    
}

class BigMonster extends Character {
    constructor() {
        super("Big Monster")
        this.life = 180;
        this.attack = 8;
        this.defense = 4;
        this.maxLife = this.life;
    }
}

class Centaur extends Character {
    constructor() {
        super("Centaur Warrior")
        this.life = 250;
        this.attack = 9;
        this.defense = 8;
        this.maxLife = this.life;
    }
}

class FirstBoss extends Character {
    constructor() {
        super("Dark Knight Boss")
        this.life = 300;
        this.attack = 13;
        this.defense = 8;
        this.maxLife = this.life;
    }
}

class Stage {
    constructor(fighter1, fighter2, fighter1El, fighter2El, logObject, imgEl, round, roundEl, pointsAvailable, pointsAvailableEl, showHPEl, showAttackEl, showDefenseEl, pointsAddHPEl, pointsAddAttackEl, pointsAddDefenseEl) {
    this.fighter1 = fighter1;
    this.fighter2 = fighter2;
    this.fighter1El = fighter1El;
    this.fighter2El = fighter2El;
    this.log = logObject;
    this.imgEl = imgEl;
    this.round = round;
    this.roundEl = roundEl;
    this.pointsAvailable = pointsAvailable;
    this.pointsAvailableEl = pointsAvailableEl;
    this.showHPEl = showHPEl;
    this.showAttackEl = showAttackEl;
    this.showDefenseEl = showDefenseEl;
    this.pointsAddHPEl = pointsAddHPEl;
    this.pointsAddAttackEl = pointsAddAttackEl;
    this.pointsAddDefenseEl = pointsAddDefenseEl;
    }

    start(){
        this.update();

        this.fighter1El.querySelector('.attackButton').addEventListener('click', () => this.doAttack(this.fighter1, this.fighter2))
        this.fighter1El.querySelector('.attackButton').addEventListener('click', () => this.doAttack(this.fighter2, this.fighter1))

    }

    update() {
        this.fighter1El.querySelector('.name').innerHTML = `${this.fighter1.name} - ${this.fighter1.life.toFixed(2)} HP`;
        let f1Pct = (this.fighter1.life / this.fighter1.maxLife) * 100;
        this.fighter1El.querySelector('.bar').style.width = `${f1Pct}%`
    
        this.fighter2El.querySelector('.name').innerHTML = `${this.fighter2.name} - ${this.fighter2.life.toFixed(2)} HP`;
        let f2Pct = (this.fighter2.life / this.fighter2.maxLife) * 100;
        this.fighter2El.querySelector('.bar').style.width = `${f2Pct}%`

        this.pointsAvailableEl.innerHTML = pointsAvailable
        this.showHPEl.innerHTML = this.fighter1.maxLife;
        this.showAttackEl.innerHTML = this.fighter1.attack;
        this.showDefenseEl.innerHTML = this.fighter1.defense;

            //Trocar personagem depois de morrer
        if(this.fighter2.life <= 0) {
            this.updateRound()
        }
            //Se o personagem morrer
        
        if(this.fighter1.life <= 0) {
            showDefeat()
        }

            // Colorir vida do lutador 1
        if(this.fighter1.life <= this.fighter1.maxLife && this.fighter1.life <= (50/100 * this.fighter1.maxLife)) {
            this.fighter1El.querySelector('.bar').style.backgroundColor = "red"

        } else {
            this.fighter1El.querySelector('.bar').style.backgroundColor = "green"
        }

            // Colorir vida do lutador 2
        if(this.fighter2.life <= this.fighter2.maxLife && this.fighter2.life <= (50/100 * this.fighter2.maxLife)) {
            this.fighter2El.querySelector('.bar').style.backgroundColor = "red"

        } else {
            this.fighter2El.querySelector('.bar').style.backgroundColor = "green"
        }

            // Adicionar Atributos
        if (pointsAvailable > 0) {
            this.pointsAddHPEl.style.display = "inline";
            this.pointsAddAttackEl.style.display = "inline";
            this.pointsAddDefenseEl.style.display = "inline";
        } else {
            this.pointsAddHPEl.style.display = "none";
            this.pointsAddAttackEl.style.display = "none";
            this.pointsAddDefenseEl.style.display = "none";
        }
 
    }

    updateRound () {
        round++
        showVictory()
        showRound()
        roundEl.innerHTML = round
        pointsAvailable += 2
        this.pointsAvailable = pointsAvailable
        char.life = char.maxLife

        // Controle de Rounds

        if ( round > 1 && round <= 5 ) {
            this.fighter2 = new LittleMonster();
            this.imgEl.src = "/assets/img/littleMonster.png"
        } else if ( round > 5  && round < 10) {
            this.fighter2 = new BigMonster();
            this.imgEl.src= "assets/img/bigMonster.png"
        } else if ( round == 10) {
            this.fighter2 = new FirstBoss();
            this.imgEl.src= "assets/img/warriorBoss.png"
        } else {
            this.fighter2 = new Centaur();
            this.imgEl.src = "assets/img/centaurWarrior.png"
        }
    }

    doAttack(attacking, monster) {
        if(attacking.life <= 0 || monster.life <= 0 ) {
            this.log.addMessage('Morto')
            return;
        }

        let attackFactor = (Math.random() * 2).toFixed(2);
        let defenseFactor = (Math.random() * 2).toFixed(2);

        let actualAttack = attacking.attack * attackFactor;
        let actualDefense = monster.defense * defenseFactor;

        if (actualAttack > actualDefense) {
            monster.life -= actualAttack
            this.log.addMessage((`${attacking.name} causou ${actualAttack.toFixed(2)} de dano em ${monster.name}`))


        }else{
            this.log.addMessage((`${monster.name} conseguiu defender...`))
        }

        

        this.update();
    }

    monsterAttack() {}

}

class Log {
    list = [];
    
    constructor(listEl) {
        this.listEl = listEl;
    }


    addMessage(msg) {
        this.list.push(msg);
        this.render();
    }

    render() {
        this.listEl.scrollTo(0, this.listEl.scrollHeight)
        this.listEl.innerHTML = "";

        for(let i in this.list) {
            this.listEl.innerHTML += `<li> ${this.list[i]} <li>`

        }
    }
}
