var game;
var background;
var character;
var box;
var dialog;
var mayorTalk;
var mayorTalk2;

function Character(){
    tCharacter = new Sprite(game, "rpg_sprite_walk.png", 192, 128);
    tCharacter.loadAnimation(192, 128, 24, 32);
    tCharacter.generateAnimationCycles();
    tCharacter.renameCycles(new Array("down", "up", "left", "right"));
    tCharacter.setAnimationSpeed(500);
    tCharacter.hasWeapon = false;
    tCharacter.items = new Array();
    tCharacter.items[0] = "Weapon";

    tCharacter.setSpeed(0);
    tCharacter.setPosition(180, 300);
    tCharacter.pauseAnimation();
    tCharacter.setCurrentCycle("down");

    tCharacter.checkKeys = function(){

        if (keysDown[K_A]){
            this.changeXby(-2);
            this.setMoveAngle(270);
            this.setCurrentCycle("left");
        }
        if (keysDown[K_D]){
            this.changeXby(2);
            this.setMoveAngle(90);
            this.setCurrentCycle("right");
        }                
        if (keysDown[K_W]){
            this.changeYby(-2);
            this.setMoveAngle(0);
            this.setCurrentCycle("up");
        }                
        if (keysDown[K_S]){
            this.changeYby(2);
            this.setMoveAngle(180);
            this.setCurrentCycle("down");
        }                
        
        if (keysDown[K_SPACE]){ /* Talk to people, attack stuff, inspect stuff */
            this.setSpeed(0);
            //this.pauseAnimation();
            this.setCurrentCycle("down");
            if (this.x > mayor.x - mayor.width && this.x < mayor.x + mayor.width && this.y > mayor.y - mayor.height && this.y < mayor.y + mayor.height&& this.hasWeapon == false){
                mayorTalk = new GameButton("MAYOR: Hello my friend! What are you up to now these days?");
                mayorTalk.setPosition(20, 600);
                mayorTalk.setSize(600, 100);
                this.setSpeed(0);
                this.hasWeapon = true;
                //this.playAnimation();
            }
            if (this.x > 620 && this.x < 650 && this.y > 50 && this.y < 70 && this.hasWeapon == false){
                dialog = new GameButton("YOU: I feel like this place looks too treacherous without some sort of offensive mechanism...! Maybe I shall seek out the mayor of this village. Hopefully he can help me out.");
                dialog.setPosition(20, 600);
                dialog.setSize(600, 100);
                this.setSpeed(0);
                //this.playAnimation();
            }
            if (this.x > 620 && this.x < 650 && this.y > 50 && this.y < 70 && this.hasWeapon == true){
                game.stop(); //enter dungeon
                document.location.href ="gameLevel2.html";
            }
        }
    }

    tCharacter.checkBounds = function(){
        if (this.x < 12){
            this.setPosition(12, this.y);
            this.setSpeed(0);
        }
        if (this.x > 788){
            this.setPosition(788, this.y);
            this.setSpeed(0);
        }
        if (this.y < 12){
            this.setPosition(this.x, 12);
            this.setSpeed(0);
        }
        if (this.y > 588){
            this.setPosition(this.x, 588);
            this.setSpeed(0);
        }
    }

    return tCharacter;
}

function Mayor(){
    tMayor = new Sprite(game, "mayor.gif", 27, 36);
    tMayor.setSpeed(0);
    tMayor.setPosition(400, 400);

    return tMayor;
}

function init(){
    game = new Scene();
    mayor = new Mayor();
    character = new Character();
    background = new Sprite(game, "background1.png", 800, 600);
    background.setSpeed(0,0);
    background.setPosition(400, 300);
    box = new GameButton("");
    box.setPosition(20, 600);
    box.setSize(600, 100);
    game.start();
} // end init

function checkButtons(){
    if (mayorTalk.isClicked()){
        mayorTalk2 = new GameButton("You chat with the mayor for a while, and he gives you a new weapon. Soon, after realizing he has an errand to run, he heads off.");
        mayorTalk2.setPosition(20, 600);
        mayorTalk2.setSize(600, 100);
        mayor.hide();
    }
}

function update(){
    game.clear();
    background.update();
    mayor.update();
    character.checkKeys();
    character.checkBounds();
    character.update();
    checkButtons();
    //dialog.update();
} // end update
