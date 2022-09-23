/*CARGA DE DATOS*/

let levels = [];
let images,animations = {};

function preload() {

  
    levels = [
        loadJSON("Game/Levels/level1.json")
    ];
    animations = {
        playerWalkRight : new Animation("Game/Assets/Animations/walk/right/", 9),
        playerWalkLeft : new Animation("Game/Assets/Animations/walk/left/", 9),
        playerWalkDown : new Animation("Game/Assets/Animations/walk/down/", 10),
        playerWalkUp : new Animation("Game/Assets/Animations/walk/up/", 9)
    };
    images = {
        grass:loadImage("Game/Assets/Sprites/floor/grass.png"),
        grass2:loadImage("Game/Assets/Sprites/floor/grass2.png"),
        dirt2:loadImage("Game/Assets/Sprites/floor/dirt2.png"),
        dirt1:loadImage("Game/Assets/Sprites/floor/dirt1.png"),
        PressedRotationRight : loadImage("Game/Assets/Sprites/buttons/PressedRotationRight.png"),
        ReleasedRotationRight : loadImage("Game/Assets/Sprites/buttons/ReleasedRotationRight.png"),
        PressedLight : loadImage("Game/Assets/Sprites/buttons/PressedLight.png"),
        ReleasedLight : loadImage("Game/Assets/Sprites/buttons/ReleasedLight.png"),
        PressedRotationLeft : loadImage("Game/Assets/Sprites/buttons/PressedRotationLeft.png"),
        ReleasedRotationLeft : loadImage("Game/Assets/Sprites/buttons/ReleasedRotationLeft.png"),
        PressedFoward : loadImage("Game/Assets/Sprites/buttons/PressedFoward.png"),
        ReleasedFoward : loadImage("Game/Assets/Sprites/buttons/ReleasedFoward.png"),
        PressedJump : loadImage("Game/Assets/Sprites/buttons/PressedJump.png"),
        ReleasedJump : loadImage("Game/Assets/Sprites/buttons/ReleasedJump.png"),
        PressedDelete : loadImage("Game/Assets/Sprites/buttons/PressedDelete.png"),
        ReleasedDelete : loadImage("Game/Assets/Sprites/buttons/ReleasedDelete.png"),
        PressedCoin : loadImage("Game/Assets/Sprites/buttons/PressedCoin.png"),
        ReleasedCoin : loadImage("Game/Assets/Sprites/buttons/ReleasedCoin.png"),
        PressedHome : loadImage("Game/Assets/Sprites/buttons/PressedHome.png"),
        ReleasedHome : loadImage("Game/Assets/Sprites/buttons/ReleasedHome.png"),
        PressedPlay : loadImage("Game/Assets/Sprites/buttons/PressedPlay.png"),
        ReleasedPlay : loadImage("Game/Assets/Sprites/buttons/ReleasedPlay.png"),

        cNone : loadImage("Game/Assets/Sprites/instructions/none.png"),
        cJump : loadImage("Game/Assets/Sprites/instructions/jump.png"),
        cFoward : loadImage("Game/Assets/Sprites/instructions/foward.png"),
        cRotateLeft : loadImage("Game/Assets/Sprites/instructions/rotateLeft.png"),
        cRotateRight : loadImage("Game/Assets/Sprites/instructions/rotateRight.png"),
        cCoin : loadImage("Game/Assets/Sprites/instructions/coin.png"),

        gold : loadImage("Game/Assets/Sprites/gold.png"),

        menuEjemplo : loadImage('Game/Assets/Sprites/buttons/menuEjemplo.PNG'),
        botonEjemplo : loadImage('Game/Assets/Sprites/buttons/botonInicioEjemplo.PNG'),

        gameplayBG : loadImage('Game/Assets/Sprites/background1.png')

    }
}

/*FIN DE CARGA DE DATOS*/

let scale = { w : Math.round (1/3*10)/10, h : Math.round (1/3*10)/10 };
let buttons = [];
let canvas;
let scene;
let mouse_pressed = false;

function setup() {

  var sc = Math.min(windowWidth/1920,windowHeight/1080);

  scale = {
    w : sc,
    h : sc
  }
  resizeCanvas(1920 * sc, 1080 * sc);

  frameRate(60);

  canvas = createCanvas(1920*scale.w,1080*scale.h)//.parent('game');
  scene = new MenuScene(0);
}

function draw() {
  background(100);
  scene.onStep();
  scene.onDraw();

  //DIBUJAR BOTONES
  for(var i = 0; i < buttons.length; i++){
    let btn = buttons[i];
    if (btn.sprites == undefined || btn.sprites.length < 2) continue;
    
    if(mouse_pressed && (mouseX > btn.x*scale.w) && (mouseY > btn.y*scale.h) && (mouseX < (btn.x + btn.w)*scale.w) && (mouseY < (btn.y + btn.h)*scale.h)){
      image(btn.sprites[1],btn.x*scale.w,btn.y*scale.h,btn.w*scale.w,btn.h*scale.h);
    } else {
      image(btn.sprites[0],btn.x*scale.w,btn.y*scale.h,btn.w*scale.w,btn.h*scale.h);
    }
  }

}

function mouseClicked() {

  //Detectar botones.
  for(var i = 0; i < buttons.length; i++){
    let btn = buttons[i];
    if((mouseX > buttons[i].x*scale.w) && (mouseY > buttons[i].y*scale.h) && (mouseX < (buttons[i].x + buttons[i].w)*scale.w) && (mouseY < (buttons[i].y + buttons[i].h)*scale.h)){
      btn.action();
    }
  }

}

function mousePressed() {
  mouse_pressed = true;
}

function mouseReleased() {
  mouse_pressed = false;
}

function windowResized() {

  var sc = Math.min(windowWidth/1920,windowHeight/1080);

  scale = {
    w : sc,
    h : sc
  }
  resizeCanvas(1920 * sc, 1080 * sc);
}
