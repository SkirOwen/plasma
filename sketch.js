Matter.use(
    'matter-attractors' // PLUGIN_NAME
);

// module aliases
var Engine = Matter.Engine,
    // Render = Matter.Render,
    World = Matter.World,
    Bodies = Matter.Bodies,
    Constraint = Matter.Constraint,
    Mouse = Matter.Mouse,
    MouseConstraint = Matter.MouseConstraint;

var engine;
var world;
var particles = [];
var boundaries = [];

var ground;

function setup() {
    var canvas = createCanvas(500, 500);
    engine = Engine.create();
    world = engine.world;
    world.gravity.scale = 0;
    // I'll need to try if this will work or not
    // Engine.run(engine);

    var prev = null;
    for (var x = 200; x < 400; x += 20) {

        var fixed = false;
        if (!prev) {
            fixed = true;
        }
        var p = new Particle(x, 100, 10, fixed, -1);
        // var p2 = new Particle(200, 150, 10);
        particles.push(p);

        if (prev) {
            var option = {
                bodyA: p.body,
                bodyB: prev.body,
                length: 20,
                stiffness: 0.4,
            }
            var constraint = Constraint.create(option);
            World.add(world, constraint);
        }
        prev = p;
    }

    boundaries.push(new Boundary(200, height, width, 30, 0));

    var canvasmouse = Mouse.create(canvas.elt);
    canvasmouse.pixelRatio = pixelDensity();
    var option = {
        mouse: canvasmouse,
    }
    mConstraint = MouseConstraint.create(engine, option);
    World.add(world, mConstraint);
}

function mouseDragged() {
    // circles.push(new Circle(mouseX, mouseY, random(5, 10)));
}

function draw() {
    background(51);
    Engine.update(engine);
    for (var i = 0; i < boundaries.length; i++) {
        boundaries[i].show();
    }
    for (var i = 0; i < particles.length; i++) {
        particles[i].show();
    }

    if (mConstraint.body) {
        var pos = mConstraint.body.position;
        var offset = mConstraint.constraint.pointB;
        var m = mConstraint.mouse.position;
        stroke(0, 255, 0);
        line(pos.x + offset.x, pos.y + offset.y, m.x, m.y);
    }
    // line(particles[0].body.position.x, particles[0].body.position.y,
    //      particles[1].body.position.x, particles[1].body.position.y);
}