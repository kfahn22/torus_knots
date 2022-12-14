class Tulip {
    constructor(_x, _y, _c) {
        this.x = _x;
        this.y = _y;
        this.col = _c;
        this.j = 0; // determines symmetry
        this.k = 8;
        this.l = 1.; // 0.6
        this.m = 1.;
        this.p = 9; //9
        this.q = 8; //8
        this.s1 = 5;
        this.h2 = 6;
        this.sc = 5; // determines scale
        this.pi = 1;
        this.points = [];
    }

    // https://github.com/anuraghazra/CanvasFun/blob/master/LoveHearts/Heart.js
    // Reference for this function
    // We need to loop through torus knot before creating object
    oneKnot() {
        // 630 when angle mode radians
        for (let beta = 0; beta < 361; beta += 1) {
    
            // r for more general knot
            let r = this.sc * (this.j + this.s1 * sin(this.k * beta));

            // phi and theta for general knot
            let phi = this.l * this.pi * (this.p * beta);
            let theta = this.m * this.pi * sin(this.q * beta);
            let x = r * cos(theta) * (this.h2 + cos(phi));
            let y = -r * sin(theta) * (this.h2 + cos(phi));
            let z = r * sin(phi);
            if (this.points.length < 361) {
                this.points[beta] = createVector(x, y, z);
                console.log(this.points.length);
            } else {
                break;
            }
        }
    }

    show() {
        for (let k = 0; k < 4; k += 1) {
            push();
            //rotateY(PI/k);
            //translate(this.x, this.y, 0);
           // rotateY(PI / k);
            beginShape();
            for (let v of this.points) {
                //translate(v.x, v.y, v.z);
                //let col = color(this.c);
                stroke(255,255,0);
                vertex(v.x, v.y, v.z)

            }
            endShape();
            pop();
        //     push();
        //    // translate(this.x, this.y, 0);
        //     rotateY(PI / (k + 2));
        //     beginShape();
        //     for (let v of this.points) {
        //         //translate(v.x, v.y, v.z);
        //         //let v = points[i];
        //         stroke(255, 255, 0);
        //         vertex(v.x, v.y, v.z);
        //     }
        //     endShape();
        //     pop();
        }
    }
}