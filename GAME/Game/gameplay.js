

class GameplayScene {

    target = "main";
    blocks = {
        main : [],
        f1 : [],
        f2 : []
    };
    level;game;
    running = false;
    board = { x:180, y:300 }
    goals_copy = [];

    constructor(_level) {
        this.level = _level;
        this.game = new Game(levels[_level]);
        this.goals_copy = JSON.parse(JSON.stringify(this.game.goals));
        buttons = [];

        buttons.push(new Button(0,0,120,120,() => { //HOME
            scene = new MenuScene();
        },[images.ReleasedHome,images.PressedHome]
        ));

        buttons.push(new Button(1200,960,120,120,() => { //REPRODUCIR
            this.game.goals = JSON.parse(JSON.stringify(this.goals_copy));
            this.running = true;
            this.game.player.resetPos();
            this.game.player.instructions = this.blocks.main.join() + "E";
            this.game.player.fs = {f1 : this.blocks.f1, f2 : this.blocks.f2};
        },[images.ReleasedPlay,images.PressedPlay]
        ));

        buttons.push(new Button(1320,960,120,120,() => { //ELIMINAR
            this.game.goals = JSON.parse(JSON.stringify(this.goals_copy));
            this.running = false;
            this.game.player.resetPos();
            this.blocks[this.target] = [];//{ main : [], f1 : [], f2 : [] };
            this.game.player.instructions = "";
        },[images.ReleasedDelete,images.PressedDelete]));

        //BOTONES DE ACCIÓN
        buttons.push(new Button(0,960,120,120,() => { //AVANZAR
            this.blocks[this.target].push('W');
        },[images.ReleasedFoward,images.PressedFoward]));

        buttons.push(new Button(120,960,120,120,() => { //ROTAR L
            this.blocks[this.target].push('A');
        },[images.ReleasedRotationLeft,images.PressedRotationLeft]));

        buttons.push(new Button(240,960,120,120,() => { //ROTAR R
            this.blocks[this.target].push('D');
        },[images.ReleasedRotationRight,images.PressedRotationRight]));

        buttons.push(new Button(360,960,120,120,() => { //SALTAR
            this.blocks[this.target].push(' ');
        },[images.ReleasedJump,images.PressedJump]));

        buttons.push(new Button(480,960,120,120,() => { //GOAL
            this.blocks[this.target].push('c');
        },[images.ReleasedCoin,images.PressedCoin]));

        buttons.push(new Button(600,960,120,120,() => { //F1
            this.blocks[this.target].push('1');
        },[images.ReleasedCoin,images.PressedCoin]));
        buttons.push(new Button(720,960,120,120,() => { //F2
            this.blocks[this.target].push('2');
        },[images.ReleasedCoin,images.PressedCoin]));

        //TARGETS

        buttons.push(new Button(1440,240/3,475,360,() => { //MAIN
            this.target = "main"
        }));

        buttons.push(new Button(1440,(240/3)*2+360,475,240,() => { //F1
            this.target = "f1"
        }));

        buttons.push(new Button(1440,480+360,475,240,() => { //F2
            this.target = "f2"
        }));

    }

    onStep() {

        if (this.blocks.main.length > 12) this.blocks.main.splice(-1);
        if (this.blocks.f1.length > 8) this.blocks.f1.splice(-1);
        if (this.blocks.f2.length > 8) this.blocks.f2.splice(-1);

        if (this.running) this.game.player.step();
    }

    onDraw() {

        strokeWeight(5);
        stroke('rgba(255,255,255,0.8)');
        noFill();

        image(images.gameplayBG,0,0,1920*scale.w,1080*scale.h);

        //DIBUJAR ESCENARIO DETRÁS
        for(var i = 0; i <= this.game.player.z; i++){
            for(var k = 0; k < this.game.scene[i].length; k++){

                var px = k*120+this.board.x; var py = i*60 - this.game.scene[i][k] * 30 + this.board.y;
                if (this.game.scene[i][k] > 0) image(images.grass2, px*scale.w, py*scale.h,120*scale.w,scale.h*60);
                else image(images.grass, px*scale.w, py*scale.h,120*scale.w,scale.h*60);
                if (this.game.scene[i][k] > 0 || i == (this.game.scene[i].length-1)) { image(images.dirt1, px*scale.w, (py+60)*scale.h,120*scale.w,scale.h*30); }
                for (var p = 1; p < this.game.scene[i][k]; p++) { image(images.dirt2, px*scale.w, (py+60+30*p)*scale.h,120*scale.w,scale.h*30); }

                for (var p = 0; p < this.game.goals.length; p++) {
                    if (this.game.goals[p].x == k && this.game.goals[p].y == i)
                    image(images.gold, (px+31)*scale.w, (py-14)*scale.h,58*scale.w,scale.h*55);
                }

            }
        }

        //DIBUJAR JUGADOR
        let _anim;
        switch(this.game.player.direction) {
            case 0: _anim = animations.playerWalkRight; break;
            case 90: _anim = animations.playerWalkUp; break;
            case 180: _anim = animations.playerWalkLeft; break;
            case 270: _anim = animations.playerWalkDown; break;
        }
        _anim.extDraw(
            (this.board.x - 40 + this.game.player.animX*120)*scale.w,
            (this.board.y - 170 + this.game.player.animZ*60 - 30 * this.game.player.animY)*scale.h,
            200*scale.w,200*scale.h
        );

        //DIBUJAR ESCENARIO DELANTE
        for(var i = this.game.player.z+1; i < this.game.scene.length; i++){
            for(var k = 0; k < this.game.scene[i].length; k++){

                var px = k*120+this.board.x; var py = i*60 - this.game.scene[i][k] * 30 + this.board.y;
                if (this.game.scene[i][k] > 0) image(images.grass2, px*scale.w, py*scale.h,120*scale.w,scale.h*60);
                else image(images.grass, px*scale.w, py*scale.h,120*scale.w,scale.h*60);
                if (this.game.scene[i][k] > 0 || i == (this.game.scene[i].length-1)) { image(images.dirt1, px*scale.w, (py+60)*scale.h,120*scale.w,scale.h*30); }
                for (var p = 1; p < this.game.scene[i][k]; p++) { image(images.dirt2, px*scale.w, (py+60+30*p)*scale.h,120*scale.w,scale.h*30); }

            }
        }

        //DIBUJAR INSTRUCCIONES MAIN
        var py = 240/3;var px = 0;
        for (var i = 0; i < 12; i++) {
            if (this.blocks.main.length > i) {
                switch(this.blocks.main[i]) {
                    case 'W':
                        image(images.cFoward,(1440 + px) * scale.w,py * scale.h, 120*scale.w,120*scale.h);
                    break;
                    case 'A':
                        image(images.cRotateLeft,(1440 + px) * scale.w,py * scale.h, 120*scale.w,120*scale.h);
                    break;
                    case 'D':
                        image(images.cRotateRight,(1440 + px) * scale.w,py * scale.h, 120*scale.w,120*scale.h);
                    break;
                    case ' ':
                        image(images.cJump,(1440 + px) * scale.w,py * scale.h, 120*scale.w,120*scale.h);
                    break;
                    case 'c':
                        image(images.cCoin,(1440 + px) * scale.w,py * scale.h, 120*scale.w,120*scale.h);
                    break;
                }
            } else image(images.cNone,(1440 + px) * scale.w,py * scale.h, 120*scale.w,120*scale.h);
            px += 120; if(px > 360) { px = 0; py += 120; }
        }
        if (this.target == "main") rect(1440*scale.w,(240/3)*scale.h,475*scale.w,scale.h*(360));

        //DIBUJAR INSTRUCCIONES F1
        var py = 240/3*2 + 360;var px = 0;
        for (var i = 0; i < 8; i++) {
            if (this.blocks.f1.length > i) {
                switch(this.blocks.f1[i]) {
                    case 'W':
                        image(images.cFoward,(1440 + px) * scale.w,py * scale.h, 120*scale.w,120*scale.h);
                    break;
                    case 'A':
                        image(images.cRotateLeft,(1440 + px) * scale.w,py * scale.h, 120*scale.w,120*scale.h);
                    break;
                    case 'D':
                        image(images.cRotateRight,(1440 + px) * scale.w,py * scale.h, 120*scale.w,120*scale.h);
                    break;
                    case ' ':
                        image(images.cJump,(1440 + px) * scale.w,py * scale.h, 120*scale.w,120*scale.h);
                    break;
                    case 'c':
                        image(images.cCoin,(1440 + px) * scale.w,py * scale.h, 120*scale.w,120*scale.h);
                    break;
                }
            } else image(images.cNone,(1440 + px) * scale.w,py * scale.h, 120*scale.w,120*scale.h);
            px += 120; if(px > 360) { px = 0; py += 120; }
        }
        if (this.target == "f1") rect(1440*scale.w,((240/3)*2+360)*scale.h,475*scale.w,scale.h*(240));

        //DIBUJAR INSTRUCCIONES F2
        var py = 240 + 5*120;var px = 0;
        for (var i = 0; i < 8; i++) {
            if (this.blocks.f2.length > i) {
                switch(this.blocks.f2[i]) {
                    case 'W':
                        image(images.cFoward,(1440 + px) * scale.w,py * scale.h, 120*scale.w,120*scale.h);
                    break;
                    case 'A':
                        image(images.cRotateLeft,(1440 + px) * scale.w,py * scale.h, 120*scale.w,120*scale.h);
                    break;
                    case 'D':
                        image(images.cRotateRight,(1440 + px) * scale.w,py * scale.h, 120*scale.w,120*scale.h);
                    break;
                    case ' ':
                        image(images.cJump,(1440 + px) * scale.w,py * scale.h, 120*scale.w,120*scale.h);
                    break;
                    case 'c':
                        image(images.cCoin,(1440 + px) * scale.w,py * scale.h, 120*scale.w,120*scale.h);
                    break;
                }
            } else image(images.cNone,(1440 + px) * scale.w,py * scale.h, 120*scale.w,120*scale.h);
            px += 120; if(px > 360) { px = 0; py += 120; }
        }
        if (this.target == "f2") rect(1440*scale.w,(240*2+360)*scale.h,475*scale.w,scale.h*(240));

    }

}


function preload() {
    levels = [
        loadJSON("Game/Levels/level1.json")
    ];
}

function gameplaySetup() {
    running = false;
    buttons = [];

    //CARGAR JUEGO
    game = new Game(levels[0]);
    images = {
        grass:loadImage("Game/Assets/Textures/grass.png"),
        dirt2:loadImage("Game/Assets/Textures/dirt2.png"),
        dirt1:loadImage("Game/Assets/Textures/dirt1.png")
    }

    //BOTONES
    buttons.push(new Button(0,120,120,120,() => {
        running = !running
        if (animations.playerWalkRight.isPlaying) {
            animations.playerWalkRight.stop();
        } else {
            animations.playerWalkRight.play();
        }
    }));

  }
  
  function gameplayStep() {

  }

  function gameplayDraw() {
    //Graficar el escenario
    for(var i = 0; i< game.scene.length; i++){
        for(var k = 0; k< game.scene[i].length; k++){
            var px = k*120+board.x;
            var py = i*60 - game.scene[i][k] * 30 + board.y;
            image(images.grass, px*scale.w, py*scale.h,120*scale.w,scale.h*60);
            if (game.scene[i][k] > 0 || i == (game.scene[i].length-1)) {
                image(images.dirt1, px*scale.w, (py+60)*scale.h,120*scale.w,scale.h*30);
            }
            for (var p = 1; p < game.scene[i][k]; p++) {
                image(images.dirt2, px*scale.w, (py+60+30*p)*scale.h,120*scale.w,scale.h*30);
            }

        }
    }

    //Dibujar jugador.

    if(animations.playerWalkRight != undefined) animations.playerWalkRight.extDraw((board.x + game.player.x)*scale.w,(board.y+game.player.y)*scale.h,120,120);

  }
  