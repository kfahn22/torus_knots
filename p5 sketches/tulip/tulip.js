class Tulip {
    constructor(_x, _y, _c, _a) {
        this.petal = new Petal(_c);
        this.x = _x;
        this.y = _y;
        this.c = _c;
        this.num = 18;
        this.a = _a;
        //this.petals = [];
    }
    // addPetals() {
    //     for (i = 0; i < 1; i++) {
    //         this.petals.push(new Petal(this.c));
    //     }
    // }

    show() {
        //rotateY(this.a);
        translate(0, this.y, 0);
        rotateY(this.a);
        noFill();
        strokeWeight(1);
        push();
        this.petal.oneKnot();
        this.petal.show(this.a, this.num);
        // for (i = 0; i < this.petals.length; i++) {
        //     this.petals[i].oneKnot();
        //     this.petals[i].show(this.a, this.num);
        // }
        pop();
        this.a += 0.03;
    }
}