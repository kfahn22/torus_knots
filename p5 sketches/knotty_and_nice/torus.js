//https://github.com/anuraghazra/CanvasFun/blob/master/LoveHearts/Heart.js

//let colorOptions = ['#9ad5ca', '#acdde7', '3adb9e3', '#a379c9', '#b744b8'];

class TorusKnot {
    constructor(_px, _py, _p, _q, _r, _h, _c) {
        this.beta = 0;
        this.p = _p;
        this.q = _q;
        this.px = _px;
        this.py = _py;
        this.r = _r;
        this.h = _h;
        this.c = _c;
        this.points = [];
        //this.col = _c;
        //this.color = color(random(colorOptions));
    }

    oneKnot() {
        // 630 when angle mode radians
        for (let beta = 0; beta < 361; beta += 1) {
            let phi = 8 * beta;
            let theta = 9 * beta;
            let x = this.r * cos(theta) * (this.h + cos(phi));
            let y = this.r * sin(theta) * (this.h + cos(phi));
            let z = this.r * sin(phi);
            if (this.points.length < 361) {
                this.points[beta] = createVector(x, y, z);
            } else {
                break;
            }
        }
    }

    show() {
       //noFill();
        //strokeWeight(this.c*0.5);
        
        push();
       // translate(this.px, this.py);
        beginShape();
        for (let v of this.points) {
            translate(v.x, v.y, v.z);
            //fill('#b744b8');
            let col = color(this.c);
            fill(col);
            sphere(this.r);
           // vertex(v.x, v.y, v.z);
            // let d = v.mag(); 
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