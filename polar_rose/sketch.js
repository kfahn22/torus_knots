// Daniel Shiffman
// Mathematical Roses
// Video: https://youtu.be/f5QBExMNB1I
// Based on: https://en.wikipedia.org/wiki/Rose_(mathematics)
// https://thecodingtrain.com/CodingChallenges/055-roses.html

let d = 8;
let n = 5;
let c = 5;
let sliderD;
let sliderN;
let sliderC;

function setup() {
  createCanvas(600, 600);
  sliderD = createSlider(1, 20, 10, 1);
  sliderN = createSlider(1, 20, 2, 1);
  sliderC = createSlider(1, 5, 2, 1);
  sliderD.input(draw);
  sliderN.input(draw);
  sliderC.input(draw);
}

function draw() {
  d = sliderD.value();
  n = sliderN.value();
  c = sliderC.value();
  let k = n / d;
  background('#9253A1');
  push();
  translate(width / 2, height / 2);

  beginShape();
  stroke(255);
  strokeWeight(4);
  noFill();
  for (var a = 0; a < TWO_PI * reduceDenominator(n, d); a += 0.02) {
    let r = 70 * (c + cos(k * a));
    let x = r * cos(a);
    let y = r * sin(a);
    vertex(x, y);
  }
  endShape(CLOSE);
  pop();
  noLoop();
}

function reduceDenominator(numerator, denominator) {
    function rec(a, b) {
        return b ? rec(b, a % b) : a;
    }
    return denominator / rec(numerator, denominator);
}