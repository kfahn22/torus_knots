let x, y, z;

class Petal {
    constructor(_c) {
        this.col = _c;
        this.j = 0; // determines symmetry
        this.k = 8; 
        this.l = 0.01; // 0.6
        this.m = 0.3;
        this.p = 9; //9
        this.q = 8; //8
        this.s1 = 5;
        this.h2 = 4;
        this.sc = 5; // determines scale
        this.pi = 180; // angle mode is degrees
        this.points = [];
    }

    // https://github.com/anuraghazra/CanvasFun/blob/master/LoveHearts/Heart.js
    // Reference for this function
    // We need to loop through torus knot before creating object
    oneKnot() {
        for (let beta = 0; beta < 361; beta += 1) {
            let r = this.sc * (this.j + this.s1 * sin(this.k * beta));
            let phi = this.l * this.pi * (this.p * beta);
            let theta = this.m * this.pi * sin(this.q * beta);
            x = r * cos(theta) * (this.h2 + cos(phi));
            y = -r * sin(theta) * (this.h2 + cos(phi));
            z = r * sin(phi);
            if (this.points.length < 361) {
                this.points[beta] = createVector(x, y, z);
            } else {
                break;
            }
        }
    }

    show(angle, num) {
        rotateY(angle);
       // let num = 18;
        for (let k = 1; k < num; k += 1) {
            push();
            let m = map(k, 1, num, 360, 20);
            rotateY(m);
            beginShape();
            for (let v of this.points) {
                let c = color(245, 100, 118, 50);
                stroke(c);
                vertex(v.x, v.y, v.z);
            }
            endShape();
            pop();
        }
    }
}