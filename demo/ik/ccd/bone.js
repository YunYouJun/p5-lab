class Bone {
  constructor(x, y, angle, length, child) {
    this.x = x;
    this.y = y;
    this.length = length;
    this.angle = angle;
    this.child = child;
  }

  draw() {
    push();
    translate(this.x, this.y);
    rotate(this.angle);
    strokeWeight(this.length / 5);
    
    colorMode(HSB);
    let clr = color(map(abs(this.angle % (2*PI)), 0, 2*PI, 0, 255), 255, 255);
    colorMode(RGB);
    
    stroke(clr);
    line(0, 0, this.length, 0);
    this.child && this.child.draw();
    pop();
  }

  // takes in: a target point in the parent coordinate space
  // returns:  the endpoint of the chain, in that same parent
  //           coordinate space
  updateIK(target) {
    // convert from parent to local coordinates
    const localTarget = rotatePoint(translatePoint(target, -this.x, -this.y), -this.angle);

    let endPoint;
    if (this.child) {
      endPoint = this.child.updateIK(localTarget);
    } else {
      // base case:  the end point is the end of the current bone
      endPoint = [this.length, 0];
    }

    // point towards the endpoint
    const shiftAngle = angle(localTarget) - angle(endPoint);
    this.angle += shiftAngle;

    // convert back to parent coordinate space
    return translatePoint(rotatePoint(endPoint, this.angle), this.x, this.y);
  }
}