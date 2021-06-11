var PLAY=0;
var END=1;
var pikachu_running,pikachu;
var obstacle,obstacleImage;
var background, backgroundImg,moon,moonImg;
var invisibleGround,cloudImg;
var sun,sunImg;
var obstacleGroup,cloudGroup;
var pokeball;
var gameState=PLAY
var score,gameover,gameoverImg;
var jumpSound,dieSound

function preload(){
pikachu_running=loadAnimation("Running-Pikachu-GIF.gif")
  
  obstacleImage=loadImage("pokeball.png")
  backgroundImg=loadImage("background101.jfif")
  
  cloudImg=loadImage("cloud1.png")
  
  sunImg=loadImage("sun.png")
  
  gameoverImg=loadImage("Game_Over.png")
  
  jumpSound=loadSound("Jumping-sound-effect.mp3")
  
  dieSound=loadSound("die sound.mp3")
}

function setup() {
  createCanvas(displayWidth,displayHeight)
 
  
  score=0
  
  background=createSprite(0,0,800,400)
  background.addImage(backgroundImg)
  background.scale=10
  
  pikachu=createSprite(80,340,10,10)
  pikachu.addAnimation("running",pikachu_running)
  pikachu.scale=0.29
  
  invisibleGround=createSprite(10,400,1000,10)
  invisibleGround.shapeColor="lightGreen"
  
  sun=createSprite(450,70,10,10)
  sun.addImage(sunImg)
  sun.scale=0.05;
  
  gameover=createSprite(600,200,10,10)
  gameover.addImage(gameoverImg)
  gameover.scale=0.1
  
  
  obstacleGroup=new Group();
  cloudGroup=new Group();

}  

function draw() {
 invisibleGround.visible=false 
    pikachu.collide(invisibleGround)
  obstacleGroup.debug=true

    console.log(gameState)
  if(gameState === PLAY){
    background.velocityX=-3;
    
    pikachu.visible=true 
    gameover.visible=false

    sun.visible=true
    
     if (background.x < 0){
      background.x = background.width/2;
    }
    
     if(keyDown("space")&& pikachu.y >= 335) {
    pikachu.velocityY=-18;
       jumpSound.play();
     }
    
     pikachu.velocityY=pikachu.velocityY + 0.8
    
    if(pikachu.isTouching(obstacleGroup)){
            
    dieSound.play();
    gameState=END
       
    }
}
  else if(gameState === END){
   obstacleGroup.setVelocityXEach(0)    
    obstacleGroup.destroyEach()
    obstacleGroup.visible=false
    pikachu.visible=false
    obstacleGroup.setLifetimeEach(-1)
    cloudGroup.setVelocityXEach(0); 
    sun.visible=false
    score =0
   gameover.visible=true

    
    if(mousePressedOver(gameover)){
      gameState=PLAY;
    }
  }
  
  spawnClouds();
  spawnObstacles();
 drawSprites();
   textSize(24)
  text("Score: "+ score, 200,50);
     score = score + Math.round(getFrameRate()/60);
}

function spawnClouds(){
 if(World.frameCount % 100===0){
   var cloud =createSprite(1000,100,10,10)
   cloud.addImage(cloudImg)
   cloud.scale=0.1
   cloud.velocityX=-5
   cloud.y=random(50,150);
   cloud.lifetime=180;
   cloudGroup.add(cloud)
  }
}

function spawnObstacles(){
  if(World.frameCount % 60 ===0){
    var obstacle=createSprite(1000,10,10,10)
    obstacle.scale=0.15
    obstacle.addImage(obstacleImage)
    obstacle.velocityX=-15     
obstacle.y=random(300,350)
   obstacle.lifetime=150     
    obstacleGroup.add(obstacle)
    }
}