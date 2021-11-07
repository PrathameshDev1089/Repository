var towerImg, tower;
var doorImg, door, doorsGroup;
var climberImg, climber, climbersGroup;
var ghost, ghostImg;
var invisibleBlockGroup, invisibleBlock;
var gameState = "play"

function preload(){
  towerImg = loadImage("tower.png");
  doorImg = loadImage("door.png");
  climberImg = loadImage("climber.png");
  ghostImg = loadImage("ghost-standing.png");
  spookySound = loadSound("spooky.wav");
}

function setup() {
  createCanvas(600, 600);
  tower = createSprite(300,300);
  tower.addImage("tower",towerImg);
  tower.velocityY = 1;
  
  ghost = createSprite(300,300,20,20);
  ghost.addImage("ghost",ghostImg);
  ghost.scale = 0.3;

  climbersGroup = new Group();
  invisibleBlockGroup = new Group();
  doorsGroup = new Group();
}

function draw() {
  background(200);

  if(gameState === "play"){
  
  ghost.velocityY = ghost.velocityY + 1
  if(keyDown("space")){
  ghost.velocityY = -1;
  }

  if(keyDown("left")){
    ghost.x = ghost.x + -20;
  }

  if(keyDown("right")){
    ghost.x = ghost.x + 20;
  }




  
  if(tower.y > 400){
      tower.y = 300
    }

    if(invisibleBlockGroup.isTouching(ghost) || ghost.y>600){
      ghost.destroy();
      gameState === "end";
    }

    if(climbersGroup.isTouching(ghost)){
      ghost.velocityY = 0;
    }

    spawnDoor();
    drawSprites();
  }

  

  if(gameState === "end"){
    textSize(30);
    text("Game Over",300,300)
    }

    
   
  }



 function spawnDoor(){
   if(frameCount % 230 === 0){
     door = createSprite(Math.round(random(150,450)),0);
     door.addImage("door",doorImg);
     door.velocityY = 1;
     door.lifetime = 400;

     climber = createSprite(door.x,door.y - -64);
     climber.addImage("climber",climberImg);
     climber.velocityY = 1;
     climber.lifetime = 400;
     climber.scale = 0.7;

     invisibleBlock = createSprite(climber.x,climber.y);
     invisibleBlock.velocityY = 1;
     invisibleBlock.lifetime = 400;
     invisibleBlock.visible = true;
     invisibleBlock.width = climber.width;
     invisibleBlock.height = 2

     ghost.depth = door.depth;
     ghost.depth += 1;

     climbersGroup.add(climber);
     invisibleBlockGroup.add(invisibleBlock);
     doorsGroup.add(door);

   }
 }