

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

    // https://github.com/anuraghazra/CanvasFun/blob/master/LoveHearts/Heart.js
    // Reference for this function
    // We need to loop through one torus knot before creating object
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
        }
    }

    show() {
        noFill();
        strokeWeight(2);
        
        push();
        translate(this.px, this.py);
        beginShape();
        for (let v of this.points) {
            let d = v.mag(); 
            stroke(d*360, 255, 255);
            // if (d < 30) {
            //     stroke('#ebf9ff');
            //     vertex(v.x, v.y, v.z);
            // }
            //  else if (d < 60) {
            //     stroke('#feee8f');
            //     vertex(v.x, v.y, v.z);
            // }
            // else  {
            //     stroke('#54b098');
            //     vertex(v.x, v.y, v.z);
            // }
        }
        endShape();
        pop();
    }
}