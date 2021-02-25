var sword, swordI,swordSound;

var fruit, fruitGroup, fruit1, fruit2, fruit3, fruit4;
var monster, monsterGroup, monsterI;

var gameOver, gameOverI, gameOverSound;

var PLAY = 1;
var END = 0;
var gameState = 1;
var score = 0;





function preload(){
  
  swordI = loadImage("sword.png");
  
  swordSound = loadSound("knifeSwooshSound.mp3");
  
  fruit1 = loadImage("fruit1.png");
  
  fruit2 = loadImage("fruit2.png");
  
  fruit3 = loadImage("fruit3.png");
  
  fruit4 = loadImage("fruit4.png");
  
  monsterI = loadAnimation("alien1.png","alien2.png");
  
  gameOverI = loadImage("gameover.png")
  
  gameOverSound = loadSound("gameover.mp3")

  
 
}


function setup(){
  createCanvas(500,500);
  
  
  sword = createSprite(250,250,20,20);
  sword.addImage(swordI);
  sword.scale = 0.6
  
  gameOver = createSprite(250,250,20,20);
  gameOver.addImage(gameOverI);
  
  fruitGroup = new Group();
  monsterGroup = new Group();

}

function draw(){
  background("HoneyDew")
  
  textSize(15)
  textFont("Didot")
  text("Score:  " + score, 350,20);
  
  
  if (gameState === PLAY){
    
    sword.visible = true;
    
    sword.x = World.mouseX;
    sword.y = World.mouseY;
    
    fruit();
    enemy();
    
    gameOver.visible = false;
    
    if(fruitGroup.isTouching(sword)){
      swordSound.play();
      fruitGroup.destroyEach();
      score = score + 2
    }
    
    if(monsterGroup.isTouching(sword)){
      gameState = END;
      gameOverSound.play();
      

    }
    
  }
  
  else if (gameState === END){
    
    gameOver.visible = true
    
    sword.visible = false
    
    fruitGroup.setLifetimeEach(-1);
    monsterGroup.setLifetimeEach(-1);
    
    monsterGroup.setVelocityXEach(0);
    fruitGroup.setVelocityXEach(0);
    
    
    textFont("Didot")
    textSize(20)
    text("Press Space to Reset", 155,300);
    
    if(keyDown("SPACE") && gameState === END){
      score = 0
      gameState = PLAY
      monsterGroup.destroyEach();
      fruitGroup.destroyEach();
    }
    
    
    
  }
                  
  
  drawSprites();
  
  
}




function fruit(){

  if(frameCount % 40 === 0){
    
    position = Math.round(random(1,2));
    var fruit = createSprite(500,200,20,20);
    fruit.scale = 0.2;
    
    if(position == 1){
      fruit.x = 500;
      fruit.velocityX = -(7+(score/4));
    }
    else {
      if(position == 2){
        fruit.x = 0;
        fruit.velocityX = (7+(score/4));
      }
    }
    
    fruit.y = Math.round(random(50,450));

    fruit.setLifeTime = 100;
    
    var rand = Math.round(random(1,4))
    switch (rand){
      case 1: fruit.addImage(fruit1);
              break;
      case 2: fruit.addImage(fruit2);
              break;
      case 3: fruit.addImage(fruit3);
              break;
      case 4: fruit.addImage(fruit4);
              break;
    
      }
    
      fruitGroup.add(fruit)
  }
  
  
}


function enemy(){
  
  if(frameCount % 80 === 0){
    position = Math.round(random(1,2));
    var monster = createSprite(500,200,20,20);
    monster.addAnimation("moving",monsterI);
    monster.setLifeTime = 100;
    monster.y = Math.round(random(100,400));


    if(position == 1){
      monster.x = 500;
      monster.velocityX = -(8+(score/10));
    }
    else {
      if(position == 2){
        monster.x = 0;
        monster.velocityX = (8+(score/10));
      }
    }
    
    monsterGroup.add(monster);
  
  }
  
}

