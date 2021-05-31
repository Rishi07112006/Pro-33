const Engine = Matter.Engine;
const World = Matter.World;
const Bodies = Matter.Bodies;
const Constraint = Matter.Constraint;

var engine, world;
var particles = [];
var plinkos = [];
var divisions = [];
var particle;

var line;
var divisionHeight = 300;
gameState = "PLAY";
var count = 0;
var score = 0;


function setup() {

  createCanvas(800,700);
  //createSprite(400, 200, 50, 50);
  engine = Engine.create();
  world = engine.world;
  ground = new Ground(width/2,height,width,20);

  for(var i = 0; i<=width; i = i+100) {
    divisions.push(new Division(i,height-divisionHeight/2, 10, divisionHeight));
  }

for(var j = 75; j<=width; j=j+50) {
  plinkos.push(new Plinko(j,75));
}

for(var j = 50; j<=width-10; j=j+50) {
  plinkos.push(new Plinko(j,175));
}

for(var j = 75; j<=width; j=j+50) {
  plinkos.push(new Plinko(j,275));
}

for(var j = 50; j<=width-10; j=j+50) {
  plinkos.push(new Plinko(j,375));
}

}

function draw() {

  background(0);  

  Engine.update(engine);

  textSize(35);
  text("Score : " + score,20,40);

  fill(255);
  textSize(35);
  text("500",5,550);
  text("500",80,550);
  text("500",160,550);
  text("500",240,550);
  text("500",320,550);
  text("500",400,550);
  text("500",480,550);
  text("500",560,550);
  text("500",640,550);
  text("500",720,550);

  ground.display();

  for (var j = 0; j<plinkos.length; j++) {
    plinkos[j].display();
  }

  if(particle != null){
    particle.display();
    if(particle.body.position.y>700){
      if(particle.body.position.x<300){
        score = score + 500;
        particle = null;
        if(count>=5) gameState = "END";
      }
      else if(particle.body.position.x<600 && particle.body.position.x > 301){
        score = score + 100;
        particle = null;
        if(count>=5) gameState = "END";
      }
      else if(particle.position.x < 900 && particle.body.position.y > 601){
        score = score + 200;
        particle = null;
        if(count>=5) gameState = "END";
      }
    }
  }

  if(gameState == "END"){
    background("black");
    fill("red");
    textSize(100);
    text("Game Over", 200, 400);
  }

  for (var n = 0; n<divisions.length; n++) {
    divisions[n].display();
  }

}

function mousePressed(){
  if(gameState !== "END"){
    count++;
    particle = new Particle(mouseX,10,10,10);
  }
}