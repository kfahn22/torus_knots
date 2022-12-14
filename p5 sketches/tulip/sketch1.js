// Code based on 3D Knot coding challenge
// Coding Train / Daniel Shiffman
// https://thecodingtrain.com/challenges/87-3d-knots
// https://youtu.be/r6YMKr1X0VA
// Javascript transcription: Chuck England

// Code from challenge: https://editor.p5js.org/codingtrain/sketches/fa1rAWng9

// Equation for Torus knots from
// https://home.adelphi.edu/~stemkoski/knotgallery/

// Here are some common parameter settings
// (3,2) = trefoil torus knot,
// (5,2) Cinquefoil/Solomon's torus knot
// (4,3) 
// (11,6) 
// (8,9)
let angle = 0;
let beta = 0;
let vectors = [];
let j = 0; // determines symmetry
let k = 8;
let l = 1.; // 0.6
let m = 1.;
let p = 9; //9
let q = 8; //8
let r;
let s1 = 5;
let h2 = 6;
let sc = 4; // determines scale
let pi = 1;

function setup() {
    createCanvas(windowWidth, windowHeight, WEBGL);
}

function draw() {
    background('#701616');
    rotateY(angle);
    angle += 0.01;

    // r for more general knot
    r = sc * (j + s1 * sin(k * beta));

    // phi and theta for general knot
    let phi = l * pi * (p * beta);
    //let phi = l * PI * sin(p * beta);
    let theta = m * pi * sin(q * beta);
    //let theta = q * beta;
    x = r * cos(theta) * (h2 + cos(phi));
    y = -r * sin(theta) * (h2 + cos(phi));
    z = r * sin(phi);
    //z = - sin(phi); //results in a plane
    vectors.push(createVector(x, y, z));

    beta += 0.01;

    noFill();
    strokeWeight(1);
    
    for (let k = 0; k < 4; k += 1) {
        push();
        rotateY(PI / k);
        beginShape();
        for (let i = 0; i < vectors.length; i++) {
            let v = vectors[i];
            let d = v.mag();
            stroke(255, 255, 0);
            vertex(v.x, v.y, v.z);
        }
        endShape();
        pop();
        push();
        rotateY(PI / (k+2));
        beginShape();
        for (let i = 0; i < vectors.length; i++) {
            let v = vectors[i];
            let d = v.mag();
            stroke(255, 255, 0);
            vertex(v.x, v.y, v.z);
        }
        endShape();
        pop();
    }
    // push();
    // rotateY(PI/2);
    // beginShape();
    // for (let i = 0; i < vectors.length; i++) {
    //     let v = vectors[i];
    //     let d = v.mag();
    //     stroke(255, 255, 0);
    //     vertex(v.x, v.y, v.z);
    // }
    // endShape();
    // pop();
}