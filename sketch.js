
var monkey, monkey_run, monkey_stop;
var banana ,bananaImage, obstacleImage;
var FoodGroup, obstacleGroup;
var score;
var ground,groundImage;
var invisibleGround;
var score = 0;
var gameState = "play";
var obstaclesGroup;
var points=0;
var bananaImage;
var bananaGroup;

function preload(){
  
  
  monkey_run =loadAnimation("sprite_0.png","sprite_1.png","sprite_2.png","sprite_3.png","sprite_4.png","sprite_5.png","sprite_6.png","sprite_7.png","sprite_8.png");
  monkeyStop = ("sprite_0.png");
  
  bananaImage = loadImage("banana.png");
  obstacleImage = loadImage("obstacle.png");
  groundImage = loadImage("ground.jpg");
  
  bananaImage = loadImage("banana.png");
}



function setup() {
  createCanvas(600,400);
  ground = createSprite(200,740,400,10);
  fill("red");
  ground.x = ground.width/2;

  monkey = createSprite(44,200,20,200);
  monkey.addAnimation("monkey",monkey_run);
  monkey.scale = 0.1;
 
  monkey.addAnimation("monkeyStop",monkeyStop);
  
  invisibleGround = createSprite(200,345,400,10);
  invisibleGround.visible = false;
  
  obstaclesGroup = createGroup();
   

  bananaGroup = createGroup();
 
}

function draw() {
  background("green");
  
  if(gameState==="play"){
       score = score + Math.round(getFrameRate()/60);
     ground.velocityX = -10;
  
    if(ground.x<230){
   ground.x = ground.width/2;
  }
    
      monkey.velocityY = monkey.velocityY+1;
  
    if(keyDown("space")){
    monkey.velocityY = -13 ; 
  }
    
    monkey.velocityY= monkey.velocityY+0.5 ;
    
    monkey.collide(invisibleGround);
  obstacles();
    bananaG();
    
    if(bananaGroup.isTouching(monkey)){
    
    points= points+1;
    bananaGroup.destroyEach();
    }
  
    switch(score){
      case 100: monkey.scale = 0.12;
               break;
      case 200: monkey.scale = 0.14;   
                break;     
      case 300: monkey.scale = 0.16;
                break;
      case 400: monkey.scale = 0.20;
    }

    
    if(monkey.isTouching(obstaclesGroup)){
        monkey.scale = 0.10;
    }
  }

  
  fill("darkblue");
  textSize(20);
  text("Survival Time: "+score,40,30);
  
  drawSprites();
}

function obstacles(){

   if(frameCount % 80 === 0){

  var obstacle = createSprite(400,326,10,10);
    obstacle.addImage("obstacle",obstacleImage);
     obstacle.scale = 0.1;
     obstacle.velocityX = -(10+score/100);
     obstacle.lifetime = 100;

     obstaclesGroup.add(obstacle);
      
   }
}

function bananaG (){
  if(frameCount % 80 === 0){
        var banana = createSprite(400,230,10,10);
        banana.addImage(bananaImage);
        banana.velocityX= -(10+score/100);
        banana.scale=0.09;
        bananaGroup.add(banana);
  }


}
