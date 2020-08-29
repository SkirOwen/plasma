// Matter.use('matter-attractors');

// module aliases
var Engine = Matter.Engine,
    // Render = Matter.Render,
    World = Matter.World,
    Bodies = Matter.Bodies;

var engine;
var world;
var boxes = [];

var ground;

function setup() {
    createCanvas(400, 400);
    engine = Engine.create();
    world = engine.world;
    Engine.run(engine);
    var option = {
        isStatic: true
    }
    ground = Bodies.rectangle(200, height-50, width, 10, option);
    World.add(world, ground);
}

function mousePressed() {
    boxes.push(new Box(mouseX, mouseY, random(10, 40), random(10, 40)));
}

function draw() {
    background(51);
    for (var i = 0; i < boxes.length; i++) {
        boxes[i].show();
    }
    noStroke(255);
    strokeWeight(4);
    rectMode(CENTER);
    rect(ground.position.x, ground.position.y, height, 10);
}