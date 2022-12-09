class TorusKnot {
    contructor(_p, _q, _r, _h) {
        this.p = _p;
        this.q = _q;
        // this.x = _x;
        // this.y = _y;
        this.angle = _angle;
        this.r = _r;
        this.h = _h;
        this.vectors = [];
    }
    knot() {
        for (let beta=0;beta < 100;beta++)
        {let phi = this.p * beta;
        let theta = this.q * beta;
        let x = this.r * cos(theta) * (this.h + cos(phi)); 
        let y = this.r * sin(theta) * (this.h + cos(phi)); 
        let z = this.r * sin(phi);
        this.vectors.push(createVector(x, y, z));}
        // beta += 0.01;
        // return this.vectors;
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