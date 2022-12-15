// Code based on 3D Knot coding challenge
// Coding Train / Daniel Shiffman
// https://thecodingtrain.com/challenges/87-3d-knots
// https://youtu.be/r6YMKr1X0VA
// Javascript transcription: Chuck England

// Code from challenge: https://editor.p5js.org/codingtrain/sketches/fa1rAWng9

// Equation for Torus knots from
// https://home.adelphi.edu/~stemkoski/knotgallery/

// color for middle #4e598c; #dba159

let a = 0;
//let beta = 0;
let tulips = [];
let nf = 1; // number of flowers

function setup() {
    createCanvas(600, 600, WEBGL);
    angleMode(DEGREES);
    let x = 300;
    let y = 300;
    let c = color(201 ,112, 100, 50);
    for (let i = 0; i < 1; i++) {
        tulips[i].push(new Tulip(x, y, c, a));
    }

}

function draw() {
    background('#a6b07e');
    translate(0, -height/6, 0);
   // rotateY(angle);
    //rotateY(360 / i);
    //angle += 0.01;

    noFill();
    strokeWeight(1);
    push();
    for (i = 0; i < tulips.length; i++) {
        tulips[i].addPetals();  
        tulips[i].show();  
    }
    pop();
  // angle += 0.03;
}