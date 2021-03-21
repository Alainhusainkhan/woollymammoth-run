//the game is about us saving the Woollymammoth from getting hit by the comet and to get him back to his family.

//when yo press left arrow it goes back,when you press right arrow it goes in front,when you press up arrow it goes up,and when you press the bottom arrow it goes down.

//declaring variable for creating characters for the game.
var woollymammoth,woollymammothimage 
var comet,cometimage,cometgroup
var forest,forestimage
var gamestate="play"
var score=0
var woollymammoth_sound
var gameOver_sound

function preload()
{
//loading images for woollymammoth,comet,and forest.
woollymammothimage=loadImage("elepant_trasparent.png")
cometimage=loadImage("comet_trasparent (1).png")
forestimage=loadImage("forest.jpg")

//loading sounds effects for the game.
woollymammoth_sound=loadSound("Elefant.mp3")
gameOver_sound=loadSound("gameover.mp3")
}

function setup()
{
//creating canvas.
createCanvas(600,500)
  
//creating forest.
forest=createSprite(300,250)
forest.addImage(forestimage) 
//forest.scale=0.4
forest.x=forest.width/2
forest.velocityX=-2
  
//creating woollymammoth.
woollymammoth=createSprite(100,300,10,10)
woollymammoth.addImage(woollymammothimage)
woollymammoth.scale=0.3
  
//creating group for comet.
cometgroup=new Group()

//woollymammoth.debug=true
//adjusting the collider size.
woollymammoth.setCollider("rectangle",0,0,500,500)

}

function draw()
{

//game is in playstate.
if(gamestate==="play")
{

//playing the sound for woollymammoth.
woollymammoth_sound.play()

//updating the score
score=score+Math.round(getFrameRate()/60)
  
//reseting background to create infinite space for the background.
if(forest.x<0){
forest.x=forest.width/2
}

//make the woollymammoth go forward.
if(keyDown("right_arrow"))
{
  woollymammoth.x=woollymammoth.x+3 
}

//making the woollymammoth go backward.
if(keyDown("left_arrow"))
{
 woollymammoth.x=woollymammoth.x-3 
}
  
//making the woollymammoth go up.
if(keyDown("up_arrow"))
{
  woollymammoth.y=woollymammoth.y-3 
}

//making the woollymammoth go down.
if(keyDown("down_arrow"))
{
  woollymammoth.y=woollymammoth.y+3 
}

//calling the function.
spawncomet()

//game is over once woollymammoth touches the comet.
if(woollymammoth.isTouching(cometgroup))
{
 
//playing the gameover sound.
gameOver_sound.play()

//making the game end.
gamestate="end"
  
//destorying comet and woollymammoth.
woollymammoth.destroy()
cometgroup.destroyEach()
}
  
drawSprites()

textSize(15)
fill("white")
text("score="+score,20,20)
} 

//once the game ends printing gameover on the screen.
if(gamestate==="end")
{
textSize(40)
fill("black")
text("GameOver",200,200)
}
  
}

function spawncomet()
{
  
//spacing between comets.
if(frameCount%200===0)
{
  
//creating comet.
comet=createSprite(800,200)
comet.addImage(cometimage)
comet.velocityX=-(3+score/100)

//making c omet appear randomly in vertical direction.
comet.y=Math.round(random(50,300))
    
//comet.debug=true

//adjusting collider size.
comet.setCollider("rectangle",0,0,200,200)
//giving lifetime for the comet.
comet.lifetime=600

//adding all the comets to comet group.
cometgroup.add(comet)
  }
}
