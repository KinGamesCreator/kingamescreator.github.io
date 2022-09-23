
class Player {
    initPos = {x:0,y:0,z:0};
    x;y;z;
    animX;animY;animZ;
    animation;
    status="idle";
    speed = 0.1;
    instructions = "";
    direction = 0;
    delay = 0;

    fs = { f1 : "", f2 : "" }
    
    constructor(_x,_y,_z) {
        this.initPos.x = _x;
        this.initPos.y = _y;
        this.initPos.z = _z;
        this.x = _x;
        this.y = _y;
        this.z = _z;
        this.animX = this.x;
        this.animY = this.y;
        this.animZ = this.z;
    }

    setPos(_x,_y,_z){
        this.x = _x;
        this.y = _y;
        this.z = _z;
        this.animX = this.x;
        this.animY = this.y;
        this.animZ = this.z;
    }

    resetPos() {
        this.direction = 0;
        this.setPos(this.initPos.x,this.initPos.y,this.initPos.z);
        this.delay = 0;
    }

    resetAnim() {
        animations.playerWalkRight.index = 0;
        animations.playerWalkLeft.index = 0;
        animations.playerWalkUp.index = 0;
        animations.playerWalkDown.index = 0;
    }
    
    stopAnim() {
        animations.playerWalkRight.stop();
        animations.playerWalkLeft.stop();
        animations.playerWalkUp.stop();
        animations.playerWalkDown.stop();
    }

    startAnim() {
        animations.playerWalkRight.start();
        animations.playerWalkLeft.start();
        animations.playerWalkUp.start();
        animations.playerWalkDown.start();
    }

    step() {


        //DELAY
        if (this.delay > 0) {
            this.delay--;
            return;
        }

        //SUBIR Y
        if (this.y > this.animY) {
            this.animY+=this.speed;
            if (this.y < this.animY) this.animY = this.y;
            return;
        }
        
        //AJUSTAR X
        if (this.x < this.animX) {
            this.animX-=this.speed;
            if (this.x > this.animX) this.animX = this.x;
        }
        if (this.x > this.animX) {
            this.animX+=this.speed;
            if (this.x < this.animX) this.animX = this.x;
        }
        
        //AJUSTAR Z
        if (this.z < this.animZ) {
            this.animZ-=this.speed;
            if (this.z > this.animZ) this.animZ = this.z;
        }
        if (this.z > this.animZ) {
            this.animZ+=this.speed;
            if (this.z < this.animZ) this.animZ = this.z;
        }

        //BAJAR Y
        if (this.y < this.animY && this.x == this.animX && this.z == this.animZ) {
            this.animY-=this.speed*2;
            if (this.y > this.animY) this.animY = this.y;
        }

        if (this.z == this.animZ && this.x == this.animX && this.y == this.animY && this.instructions.length > 0) {
            let aux = this.instructions.charAt(0);
            this.instructions = this.instructions.substring(1);
            let nextPos = {x:this.x,y:this.z};

            switch(aux) {
                case 'W': // AVANZAR
                    
                    if (this.direction == 0) nextPos.x++;
                    if (this.direction == 90) nextPos.y--;
                    if (this.direction == 180) nextPos.x--;
                    if (this.direction == 270) nextPos.y++;

                    console.log(`
                    x = ${nextPos.x}
                    y = ${nextPos.y}
                    limits : ${scene.game.scene.length-1} , ${scene.game.scene[0].length-1}
                    `);

                    if (nextPos.x < 0 || nextPos.y < 0 || nextPos.y > scene.game.scene.length-1 || nextPos.x > scene.game.scene[0].length-1) return;

                    if (scene.game.scene[nextPos.y][nextPos.x] != this.animY) return;

                    this.x = nextPos.x;
                    this.z = nextPos.y;
                    this.startAnim();

                break;
                case 'A': //Girar a la derecha.

                    this.direction += 90;
                    if (this.direction == 360) this.direction = 0;
                    this.stopAnim();
                    this.resetAnim();
                    this.delay = 15;

                break;
                case 'D': //Girar a la izquierda.

                    this.direction -= 90;
                    if (this.direction < 0) this.direction = 270;
                    this.stopAnim();
                    this.resetAnim();
                    this.delay = 15;

                break;
                case ' ': //Saltar para avanzar

                    if (this.direction == 0) nextPos.x++;
                    if (this.direction == 90) nextPos.y--;
                    if (this.direction == 180) nextPos.x--;
                    if (this.direction == 270) nextPos.y++;

                    if (nextPos.x < 0 || nextPos.y < 0 || nextPos.y > scene.game.scene.length-1 || nextPos.x > scene.game.scene[0].length-1) return;
                    if (scene.game.scene[nextPos.y][nextPos.x] > this.y+1) return;
                    
                    this.y = scene.game.scene[nextPos.y][nextPos.x];
                    this.x = nextPos.x;
                    this.z = nextPos.y;

                    this.startAnim();

                break;
                case 'E':
                    scene.running = false;
                    this.stopAnim();
                    this.resetAnim();
                break;
                case '1':
                    this.instructions = this.fs.f1 + this.instructions;
                break;
                case '2':
                    this.instructions = this.fs.f2 + this.instructions;
                break;
                case 'c':
                    //Tomar la moneda.
                    this.stopAnim();
                    this.resetAnim();
                    this.delay = 15;

                    for (var i = 0; i < scene.game.goals.length; i++) {
                        if (this.x == scene.game.goals[i].x && this.z == scene.game.goals[i].y)
                        scene.game.goals.splice(i,1);
                    }

                break;
            }
        }

    }

}

class Game {
    status = "stop";
    scene = undefined;
    player = undefined;
    goals = [];
    constructor (level) {
        this.scene = level.scene;
        this.player = new Player(level.player.x,level.player.y,level.player.z);
        this.goals = level.goals;
    }
}

class Scene {
    onDraw(){};
    onStep(){}
}
