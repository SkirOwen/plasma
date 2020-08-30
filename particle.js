function Particle(x, y, r, fixed, q) {
    var option = {
        friction: 0,
        frictionAir: 0,
        restitution: 0.6,
        isStatic: fixed,
        charge: q,
        // plugin: {
        //     attractors: [
        //         function(bodyA, bodyB) {
        //             var force = {
        //                 x: (),
        //                 y: (),
        //             };
        //
        //             // Apply force to both bodies
        //         }
        //     ]
        // }
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
        fill(127);
        ellipse(0, 0, this.r*2);
        line(0, 0, this.r, 0);
        pop();
    }
}