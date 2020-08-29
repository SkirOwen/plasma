// Matter.use('matter-attractors');

// module aliases
var Engine = Matter.Engine,
    // Render = Matter.Render,
    World = Matter.World,
    Bodies = Matter.Bodies;

var engine;
var world;
var circles = [];
var boundaries = [];

var ground;

function setup() {
    createCanvas(400, 400);
    engine = Engine.create();
    world = engine.world;
    // I'll need to try if this will work or not
    // Engine.run(engine);

    boundaries.push(new Boundary(250, 300, width*0.6, 20, -0.3));
    boundaries.push(new Boundary(150, 200, width*0.6, 20, 0.3));

}

function mouseDragged() {
    circles.push(new Circle(mouseX, mouseY, random(5, 10)));
}

function draw() {
    background(51);
    Engine.update(engine);
    for (var i = 0; i < circles.length; i++) {
        circles[i].show();
        if (circles[i].isOffScreen()) {
            circles[i].removeFromWorld();
            circles.splice(i, 1);
            i--;
        }
    }
    for (var i = 0; i < boundaries.length; i++) {
        boundaries[i].show();
    }
}