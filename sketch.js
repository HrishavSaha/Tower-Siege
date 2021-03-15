const Engine = Matter.Engine;
const World= Matter.World;
const Bodies = Matter.Bodies;
const Constraint = Matter.Constraint;

var engine, world;

var bg;

function preload(){
  getTime();
}

function setup() {
  createCanvas(800,400);
  engine = Engine.create();
  world = engine.world;

  ground = new Ground(400,390,800,20);
  stand = new Ground(500,350,300,10);

  box1 = new Box(500,310,50,50);
  box2 = new Box(450,310,50,50);
  box3 = new Box(550,310,50,50);
  box4 = new Box(525,260,50,50);
  box5 = new Box(475,260,50,50);
  box6 = new Box(500,210,50,50);

  polygon = new Polygon(200,200,30);

  slingshot = new Slingshot(polygon.body,{x:200, y:200});
}

function draw() {
  if(bg === 1){
    background("white");
  }else{
    background("black");
  }
  Engine.update(engine);
  ground.display();
  stand.display();

  box1.display();
  box2.display();
  box3.display();
  box4.display();
  box5.display();
  box6.display();

  polygon.display();
  
  slingshot.display();
}

function mouseDragged(){
  Matter.Body.setPosition(polygon.body, {x: mouseX , y: mouseY});
}


function mouseReleased(){
  slingshot.fly();
}

function keyPressed(){
  if(keyCode === 32){
    Matter.Body.setPosition(polygon.body,{x:200,y:200});
    slingshot.attach(polygon.body);
  }
}

async function getTime(){
  var response = await fetch("http://worldtimeapi.org/api/timezone/Asia/Kolkata");
  var responseJSON = await response.json();
  console.log(responseJSON.datetime);

  var datetime = responseJSON.datetime;
  var hour = datetime.slice(10,13);
  if(hour>=06 && hour<=19){
    bg = 1;
  }else{
    bg = 2;
  }
}