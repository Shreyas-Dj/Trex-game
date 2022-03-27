var ground
var trex ,trex_running;
var START=0
var PLAY=1
var END=2
var gameState=0
function preload(){
  trex_running=loadAnimation("trex1 (1).png" ,"trex3 (1).png" ,"trex4 (1).png")
  trex_collided=loadAnimation("trex_collided.png")
  trex_start=loadAnimation("trex1.png")
  ground_image=loadImage("ground2.png")
  cloud_image=loadImage("cloud.png")
  cactus_1=loadImage("obstacle1.png")
  cactus_2=loadImage("obstacle2.png")
  cactus_3=loadImage("obstacle3.png")
  cactus_4=loadImage("obstacle4.png")
  cactus_5=loadImage("obstacle5.png")
  cactus_6=loadImage("obstacle6.png")
  game_over=loadImage("gameOver.png")
  restart_button=loadImage("restart.png")
  jump=loadSound("jump.mp3")
  checkpoint=loadSound("checkpoint.mp3")
  die=loadSound("die.mp3")

}

function setup(){
  createCanvas(windowWidth,windowHeight)
  
  //create a trex sprite
 trex=createSprite(50,height-170,20,50)
 trex.addAnimation("trex_started",trex_start)
 trex.addAnimation("trexrunning",trex_running)
 trex.addAnimation("collided",trex_collided)

 trex.scale=0.6
 trex.debug=false
 trex.setCollider("rectangle",0,0,90,90)

 ground=createSprite(width/2,height-150,width,20)
 ground.addImage(ground_image)

 groundground=createSprite(width/2,height-140,width,10)
 groundground.visible=false

gameOver=createSprite(width/2,height/2,50,50)
gameOver.addImage(game_over)
gameOver.scale=0.8

restart=createSprite(width/2,height/2+50,40,40)
restart.addImage(restart_button)
restart.scale=0.55

 console.info("information")
 console.warn("warning")
 console.error("error")

 rand=Math.round(random(1,100))
console.log("Shreyas"+" Djeya"+rand)

obstacles = new Group()
clouds = new Group()

score=0
}

function draw(){
  background("lightgrey")
  drawSprites()  

  console.log(trex.y)

  trex.collide(groundground)
  textSize(20)
  text("score:"+score,width-100,50)

  if(gameState===0){
    ground.velocityX=0

    if(keyDown("space")){
      gameState=1
    }

    gameOver.visible=false
    restart.visible=false
  }


  else if(gameState===1){

    score=score+Math.round(getFrameRate()/60)

    trex.changeAnimation("trexrunning")
  
    if(touches.length>0||keyDown("space")&&trex.y>=756){
      trex.velocityY=-18
      jump.play()
      touches=[]
    }

    trex.velocityY+=0.8

    ground.velocityX=-(4+score/100)

    if(ground.x<750){
      ground.x=ground.width/2
    }

    if(score%500===0&&score>0){
      checkpoint.play()
    }
  
    spawnClouds()
    spawnCacti()

    if(obstacles.isTouching(trex)){
      gameState=2
      die.play()
     }
    gameOver.visible=false
     restart.visible=false
  }


  else if(gameState===2){
    ground.velocityX=0
    clouds.setVelocityXEach(0)
    obstacles.setVelocityXEach(0)
    gameOver.visible=true
    restart.visible=true
    clouds.setLifetimeEach(-1)
    obstacles.setLifetimeEach(-1)
    trex.changeAnimation("collided")
    trex.velocityY=0
    if(mousePressedOver(restart)){
      reset()
    }
  }

}
function reset(){
  gameState=1
  obstacles.destroyEach()
  clouds.destroyEach()
  score=0
}
function spawnClouds(){
  if(frameCount%70===0){
    cloud=createSprite(width,80,80,20)
    cloud.addImage(cloud_image)
    cloud.scale=0.8
    cloud.velocityX=-3
    cloud.y=Math.round(random(100,300))
    cloud.depth=trex.depth
    trex.depth+=1
    cloud.lifetime=width/cloud.velocityX
    clouds.add(cloud)
  }
  
}
function spawnCacti(){
  if(frameCount%80===0){
    cactus=createSprite(width,height-175,20,40)
    cactus.velocityX=-(4+score/100)
    cactus.addImage(cactus_1)
    cactus.scale=0.7
    cactus.lifetime=width/cactus.velocityX
    store=Math.round(random(1,6))
    cactus.debug=false
    cactus.setCollider("rectangle",0,0,100,90)
    switch(store){
      case 1:
        cactus.addImage(cactus_1)
        break
      case 2:
        cactus.addImage(cactus_2)
        break
      case 3:
        cactus.addImage(cactus_3)
        break
      case 4:
        cactus.addImage(cactus_4)
        break
      case 5:
        cactus.addImage(cactus_5)
        break
      case 6:
        cactus.addImage(cactus_6)
        break
      default:break
    }

    obstacles.add(cactus)

  }
}