var monkey , monkey_running
var banana ,bananaImage, obstacle, obstacleImage
var FoodGroup, obstacleGroup
var survivalTime = 0
var score = 0
var invisibleGround
var END = 0
var PLAY = 1
var gameState = PLAY

function preload(){
  
  monkey_running =            loadAnimation("sprite_0.png","sprite_1.png","sprite_2.png","sprite_3.png","sprite_4.png","sprite_5.png","sprite_6.png","sprite_7.png","sprite_8.png");
  
  bananaImage = loadImage("banana.png");
  obstacleImage = loadImage("obstacle.png");
 
}



function setup() {
  
  createCanvas(600,600);
  
  
  monkey = createSprite(100,400,200,200);
  monkey.scale=0.15;
  monkey.addAnimation("monkey", monkey_running);
  

  ground = createSprite(300,460,1500,20);
  ground.velocityX=-4;
  
  invisibleGround = createSprite(300,465,1500,20);
  invisibleGround.visible = false;
  
  bananaGroup = new Group();
  obstacleGroup = new Group();

  
}


function draw() {
  background("white");
  
  stroke("black");
  textSize(15);
  text("Survival Time "+survivalTime,50,50);
  
  stroke("black");
  textSize(15);
  text("Score  "+score,500,50);
  
  
  
  monkey.velocityY = monkey.velocityY + 0.8;
  monkey.collide(invisibleGround);
  
  ground.x=ground.width/2;
  
  if (gameState === PLAY) {
    
  if (keyDown("space")) {
    monkey.velocityY = -12; 
  }
  
  bananas();
    
  obstacles();
    
  if (monkey.isTouching(bananaGroup)) {
    bananaGroup.destroyEach();  
    score+=1;
  }
    
    survivalTime=Math.round(frameCount/frameRate());
}

  if (monkey.isTouching(obstacleGroup)) {
    gameState = END;
  }
  
  if (gameState === END) {
    
   bananaGroup.setVelocityXEach(0);
   obstacleGroup.setVelocityXEach(0);
    
   bananaGroup.setLifetimeEach(-1);
   obstacleGroup.setLifetimeEach(-1); 
    
  
  }
  
  drawSprites();
}

function bananas() {
  
  if (frameCount % 100 === 0) {
    banana = createSprite(610,Math.round(random(150,300)),1,1);
    banana.addImage("banana",bananaImage);
    banana.scale=0.1;
    banana.velocityX = -8;  
    banana.lifetime = 80;
    bananaGroup.add(banana);
  }
  
}

function obstacles() {
  
  if (frameCount % 250 === 0) {
    obstacle = createSprite(610,412,1,1);
    obstacle.velocityX = -8;
    obstacle.addImage("obstacle",obstacleImage);
    obstacle.scale = 0.2;
    obstacle.lifetime = 85;
    obstacleGroup.add(obstacle);
  }
}


