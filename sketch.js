Matter.use(
    'matter-attractors', // PLUGIN_NAME
    'matter-wrap',
);
p5.disableFriendlyErrors = true;
// module aliases
var Engine = Matter.Engine,
    // Render = Matter.Render,
    World = Matter.World,
    Bodies = Matter.Bodies,
    Constraint = Matter.Constraint,
    Mouse = Matter.Mouse,
    Body = Matter.Body,
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
    //TODO: create a lattice to deposit charges
    for (var y = 100; y < 300; y +=20) {
        for (var x = 100; x < 300; x += 20) {

            var fixed = false;
            // if (!prev) {
            //     fixed = true;
            // }
            var p = new Particle(x, y, 5, fixed, -1);
            // var p2 = new Particle(200, 150, 10);
            particles.push(p);

            // if (prev) {
            //     var option = {
            //         bodyA: p.body,
            //         bodyB: prev.body,
            //         length: 20,
            //         stiffness: 0.4,
            //     }
            //     var constraint = Constraint.create(option);
            //     World.add(world, constraint);
            // }
            prev = p;
        }
    }
    particles.push(new Particle(250, 250, 20 , true, 17));
    particles.push(new Particle(125, 125, 20 , true, 17));

    // disable attractor for boundaries :/
    boundaries.push(new Boundary(250, height, width, 20, 0, 0));
    boundaries.push(new Boundary(0, height-300, width+150, 100, PI/2, 10));
    boundaries.push(new Boundary(500, height-300, width+150, 100, -PI/2,10));
    boundaries.push(new Boundary(250, height-500, width, 20, 0, 0));


    var canvasmouse = Mouse.create(canvas.elt);
    canvasmouse.pixelRatio = pixelDensity();
    var option = {
        mouse: canvasmouse,
    }
    mConstraint = MouseConstraint.create(engine, option);
    World.add(world, mConstraint);
}

function mousePressed() {
    for (var i = 0; i < 1; i++) {
        particles.push(new Particle(mouseX, mouseY, 5, false, -1));
    }
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