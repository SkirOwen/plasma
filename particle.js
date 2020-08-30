function Particle(x, y, r, fixed, q) {
    var option = {
        friction: 0,
        frictionAir: 0.1,
        restitution: 0.6,
        isStatic: fixed,
        charge: q,
        plugin: {
            wrap: {
                min: {
                    x: 0,
                    y: 0
                },
                max: {
                    x: width,
                    y: height
                }
            },
            attractors: [
                function(bodyA, bodyB) {
                // var distance = ((bodyA.position.x - bodyB.position.x) ** 2 + (bodyA.position.y - bodyB.position.y) ** 2);
                // var forceAngle = atan2((bodyB.position.y - bodyA.position.y) / (bodyB.position.x - bodyA.position.x));
                //     var force = {
                //         x: (bodyA.charge * bodyB.charge) / distance * cos(forceAngle) * 1e-6,
                //         y: (bodyA.charge * bodyB.charge) / distance * sin(forceAngle) * 1e-6,
                //     };
                //     var force = {
                //         x: (bodyA.charge * bodyB.charge) * (bodyA.position.x - bodyB.position.x) * 1e-6,
                //         y: (bodyA.charge * bodyB.charge) * (bodyA.position.y - bodyB.position.y) * 1e-6,
                //     };
                    var bToA = Matter.Vector.sub(bodyB.position, bodyA.position),
                        distanceSq = Matter.Vector.magnitudeSquared(bToA) || 0.0001,
                        normal = Matter.Vector.normalise(bToA),
                        magnitude = 0.1 * (bodyA.charge * bodyB.charge / distanceSq),
                        force = Matter.Vector.mult(normal, magnitude);

                    // Apply force to both bodies
                    Body.applyForce(bodyA, bodyA.position, Matter.Vector.neg(force));
                    Body.applyForce(bodyB, bodyB.position, (force));
                    // console.log(forceAngle);
                }
            ]
        }
    }
    this.body = Bodies.circle(x, y, r, option);
    this.r = r;
    World.add(world, this.body);

    this.isOffScreen = function () {
        var pos = this.body.position;
        // do that for each sides, in the end
        return (pos.y > height + 100);
    }

    this.removeFromWorld = function () {
        World.remove(world, this.body);
    }

    this.show = function () {
        var pos = this.body.position;
        var angle = this.body.angle;

        push();
        translate(pos.x, pos.y);
        rotate(angle);
        rectMode(CENTER);
        strokeWeight(1);
        stroke(255);
        // fill(127);
        if (this.body.charge < 0) {
            fill("#58C4DD");
        } else {
            fill("#FC6255");
        }
        ellipse(0, 0, this.r*2);
        line(0, 0, this.r, 0);
        fill(255, 0, 0);
        line(0,0, this.body.accelerationX * 500, 500* this.body.accelerationY)
        pop();
    }
}