class Tulip {
    constructor(_x, _y, _p, _q, _angle, _r, _h) {
        this.x = _x;
        this.y = _y;
        this.p = _p;
        this.q = _q;
        this.angle = _angle;
        this.r = _r;
        this.h = _h;
        this.vectors = [];

    }
    show(_angle) {
        noFill();
        strokeWeight(2);
        push();
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