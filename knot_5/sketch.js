// Daniel Shiffman
// http://codingtra.in
// http://patreon.com/codingtrain
// Javascript transcription: Chuck England

// 3D Knot
// Video: https://youtu.be/r6YMKr1X0VA

let angle = 0;
let knot;
let vectors = [];

// knot 5 equations from Paul Bourke
// r(beta) = 1.2 + 0.6 * sin(0.5*PI + 6 * beta)
// theta(beta) = 4 * beta
// phi(beta) = 0.2 * PI * sin(6 * beta)

//x = r * cos(phi) * cos(theta)
//y = r * cos(phi) * sin(theta)
//z = r * sin(phi)

let beta = 0;

function setup() {
    knot = createCanvas(800, 450, WEBGL);
}

function draw() {
    background('#0B6A88');
    //texture(knot);
    rotateY(angle);
    angle += 0.03;

    let r = 100 * (1.2 + 0.6 * sin(0.5*PI + 6.0 * beta));
    let theta = 4 * beta;
    let phi = 0.2 * PI * sin(6 * beta);
    let x = r * cos(phi) * cos(theta);
    let y = r * cos(phi) * sin(theta);
    let z = r * sin(phi);
    
    vectors.push(createVector(x, y, z));

    beta += 0.01;

    noFill();
    //stroke(255);
    strokeWeight(8);
    beginShape();
    for (let i = 0; i < vectors.length; i++) {
        let v = vectors[i];
        let d = v.mag();
        let m = map(v.mag(), min(d), max(d), 0, 255);
        //console.log(d);
        stroke(255, d, 255);
        vertex(v.x, v.y, v.z);
    }
    endShape();
}
