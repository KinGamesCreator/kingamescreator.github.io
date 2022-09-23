class MenuScene {

  constructor() {
    buttons = [];
      //CREAR BOTON
    /*  buttons.push(
        new Button(
          0, //Posición X
          960, //Posición Y
          120, //Anchura
          120, //Altura
          () => { //Función que va a ejecutar al ser presionado
              this.blocks.push('W');
          },
          [images.ReleasedFoward,images.PressedFoward] //SPRITES (Released, Pressed)
        )
      );*/
      buttons.push(
        new Button(
          960-99,
          540-22,
          198,
          43,
          () => {
            scene = new GameplayScene(0);
          },
          [
            images.botonEjemplo,images.botonEjemplo
          ]

        )
      )
      buttons.push(
        new Button(
          960-99,
          540+22,
          198,
          43,
          () => {
            
          },
          [
            images.botonEjemplo,images.botonEjemplo
          ]

        )
      )
      

  }
  onStep() { //SE EJECUTA CADA FRAME
    
  }
  
  onDraw() { //SE EJECUTA CADA FRAME (SE USA SOLO PARA DIBUJAR)
    
    
      imageMode(CENTER);
      image(images.menuEjemplo, 960*scale.w, 540*scale.h);
      imageMode(CORNER);

      /*imageMode(CENTER);
      image(images.botonEjemplo, 960*scale.w, 540*scale.h);
      imageMode(CORNER);*/
    }
  

}