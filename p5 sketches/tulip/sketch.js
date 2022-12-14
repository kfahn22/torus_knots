// Code based on 3D Knot coding challenge
// Coding Train / Daniel Shiffman
// https://thecodingtrain.com/challenges/87-3d-knots
// https://youtu.be/r6YMKr1X0VA
// Javascript transcription: Chuck England

// Code from challenge: https://editor.p5js.org/codingtrain/sketches/fa1rAWng9

// Equation for Torus knots from
// https://home.adelphi.edu/~stemkoski/knotgallery/

let angle = 0;
let tulips = [];
let colorOptions1 = ['#9ad5ca', '#acdde7', '#3adb9e3', '#a379c9'];

function setup() {
    createCanvas(600, 600, WEBGL);
    angleMode(DEGREES);

    for (i = 0; i < 1; i++) {
        // oy = 0.01 * random(i);
        // // x = width * oy;
        // // y = height * oy;
        // x = width * 0.1;
        // y = height * 0.1;
        let c = colorOptions1[i % 4];
        tulips.push(new Tulip(c));
    }
}

function draw() {
    background('#701616');
    translate(0, -height/6, 0);
    rotateY(angle);
    
    angle += 0.01;

    noFill();
    strokeWeight(1);
    push();
    for (i = 0; i < tulips.length; i++) {
        rotateY(angle + i / 90);
        tulips[i].oneKnot();
        tulips[i].show();  
    }
    pop();
}