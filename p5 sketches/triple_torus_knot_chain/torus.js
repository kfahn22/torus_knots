//https://github.com/anuraghazra/CanvasFun/blob/master/LoveHearts/Heart.js

class TorusKnot {
    constructor(_px, _py, _p, _q, _r, _h) {
        this.beta = 0;
        this.p = _p;
        this.q = _q;
        this.px = _px;
        this.py = _py;
        this.r = _r;
        this.h = _h;
        this.points = [];
    }

    oneKnot() {
        //for (let beta = 0; beta < 10; beta += 0.9) {
        for (let beta = 0; beta < 630; beta += 1) {
            let phi = 8 * (beta * 0.01);
            let theta = 9 * (beta * 0.01);
            let x = this.r * cos(theta) * (this.h + cos(phi));
            let y = this.r * sin(theta) * (this.h + cos(phi));
            let z = this.r * sin(phi);
            if (this.points.length < 630) {
                this.points[beta] = createVector(x, y, z);
            } else {
                break;
            }

            console.log(this.points.length);
        }
    }

    show() {
        noFill();
        strokeWeight(2);

        push();
        translate(this.px, this.py);
        beginShape();
        for (let v of this.points) {
            //let v = this.points[i];
            let d = v.mag(); // flips color at d < 51
            if (d < 51) {
                stroke('#feee8f');
                vertex(v.x, v.y, v.z);
            } else {
                stroke(255, 255, 255, 50);
                vertex(v.x, v.y, v.z);
            }
        }
        endShape();
        pop();
    }
}