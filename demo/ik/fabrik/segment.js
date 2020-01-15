class Segment {
    constructor(x, y, len, angle, id) {
        this.from = createVector(x, y);
        this.len = len;
        this.angle = angle;
        this.id = id;
        this.parent = null;
        this.reCalculate();
    }

    createParent(len, angle, id) {
        let parent = new Segment(0, 0, len, angle, id);
        this.parent = parent;
        parent.follow(this.from.x, this.from.y);
        return parent;
    }

    reCalculate() {
        let dx = cos(this.angle) * this.len;
        let dy = sin(this.angle) * this.len;
        this.to = createVector(this.from.x + dx, this.from.y + dy);
    }

    follow(tx, ty) {
        let target = createVector(tx, ty);
        let dir = p5.Vector.sub(target, this.from);
        this.angle = dir.heading();
        dir.setMag(this.len);

        this.from = p5.Vector.sub(target, dir);
    }

    update() {
        this.reCalculate();
    }

    show() {
        colorMode(HSB);
        let clr = color(map(this.id, 0, numSegs - 1, 0, 255), 255, 255);
        colorMode(RGB);
        stroke(clr);
        strokeWeight(4);
        line(this.from.x, this.from.y, this.to.x, this.to.y);

        noStroke();
        fill(51);
        strokeWeight(2);
        ellipse(this.from.x, this.from.y, 2, 2);
        ellipse(this.to.x, this.to.y, 2, 2);
    }
}