// Daniel Shiffman
// http://codingtra.in
// http://patreon.com/codingtrain
// Javascript transcription: Chuck England

// 3D Knot
// Video: https://youtu.be/r6YMKr1X0VA

let angle = 0;
let knot;

let vectors = [];
// r(beta) = 0.8 + 1.6 * sin(6 * beta)
// theta(beta) = 2 * beta
// phi(beta) = 0.6 * pi * sin(12 * beta)

//x = r * cos(phi) * cos(theta)
//y = r * cos(phi) * sin(theta)
//z = r * sin(phi)

let beta = 0;

function setup() {
    createCanvas(800, 450, WEBGL);
}

function draw() {
    background('#0B6A88');
    rotateY(angle);
    angle += 0.03;

    let r = 100 * (0.8 + 1.2 * sin(6.0 * beta));
    let theta = 2 * beta;
    let phi = 0.6 * PI * sin(12 * beta);
    let x = r * cos(phi) * cos(theta);
    let y = r * cos(phi) * sin(theta);
    let z = r * sin(phi);
    //stroke(255, r, 255);
    
    vectors.push(createVector(x, y, z));

    beta += 0.01;

    noFill();
    //stroke(255);
    strokeWeight(4);
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
