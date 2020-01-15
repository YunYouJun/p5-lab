function setup() {
  createCanvas(windowWidth, windowHeight);
}

function draw() {
  background(0);
}

let chain = null;

function setup() {
  createCanvas(windowWidth, windowHeight);
  chain = new Bone(width / 2, height / 2, 0, 100,
    new Bone(100, 0, 0, 90,
      new Bone(90, 0, 0, 80,
        new Bone(80, 0, 0, 70)
      )
    ) 
  );
  chain.updateIK([300, 50]);
}

function windowResized() {
    resizeCanvas(windowWidth, windowHeight);
}

function draw() {
  clear();
  chain.draw();
}

function mouseMoved() {
  for (let i = 0; i < 5; i++) {
    chain.updateIK([mouseX, mouseY]);
  }
}

// convenience methods for transforming points
// because P5.js doesn't have matrix classes :'(
function rotatePoint(point, angle) {
  const [x, y] = point;
  return [
    x*Math.cos(angle) - y*Math.sin(angle),
    x*Math.sin(angle) + y*Math.cos(angle)
  ];
}

function translatePoint(point, h, v) {
  const [x, y] = point;
  return [x+h, y+v];
}

function angle(point) {
  const [x, y] = point;
  return Math.atan2(y, x);
}