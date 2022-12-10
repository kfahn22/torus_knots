//https://github.com/anuraghazra/CanvasFun/blob/master/LoveHearts/Heart.js

class TorusKnot {
    contructor(x=0, y=0, _p, _q, _r, _h) {
        this.p = _p;
        this.q = _q;
        this.x = x;
        this.y = y;
        this.angle = _angle;
        this.r = _r;
        this.h = _h;
        this.vectors = [];
    }
    // oneCycle() {
    //     this.sc += 0.005;
    //     for (let a = 0; a < PI; a += 0.01) {
    //         const r = this.sc * pow(sin(a), 7) * pow(e, 2 * a)
    //         const x = r * cos(a);
    //         const y = -r * abs(sin(a));
    //         if (this.beat) {
    //             this.pulse = map(cos(a), 0, this.pulseRadius, 0.5, -1);
    //         }

    //         if (this.vectors.length < 500) {
    //             this.vectors.push(createVector(x, y));
    //         }
    //     }
    // }
    oneKnot() {
        for (let beta = 0; beta < PI; beta += 0.01) {
            let phi = this.p * beta;
            let theta = this.q * beta;
            const x = this.r * cos(theta) * (this.h + cos(phi));
            const y = this.r * sin(theta) * (this.h + cos(phi));
            const z = this.r * sin(phi);
            if (this.vectors.length < 500) {
                this.vectors.push(createVector(x, y, z));
            }
        }
    }
    show(angle) {
        push();
        noFill();
        strokeWeight(2);
        translate(angle + 0.01, angle + 0.01);
        beginShape();
        for (let i = 0; i < this.vectors.length; i++) {
            let v = this.vectors[i];
            stroke('#feee8f');
            vertex(v.x, v.y, v.z);
        }
        endShape();
        pop();
    }
}