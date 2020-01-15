let robotarm;
let numSegs = 5;
let segLen = 30;

let button;
let numInput;
let lenInput;

function setup() {
  createCanvas(windowWidth, windowHeight);
  // robotarm.addSegment(50, 0, 90);
  
  let numLabel = createDiv('Bone Nums:');
  numLabel.position(20, 0);
  
  numInput = createInput('5');
  numInput.position(20, 25);
  numInput.input(updateBones);

  let lengthLabel = createDiv('Bone Length:');
  lengthLabel.position(20, 50);
  
  lenInput = createInput('30');
  lenInput.position(20, 75);
  lenInput.input(updateLength);
  
  robotarm = new RobotArm(width / 2, height / 2, numSegs, segLen, 0);
}

function updateBones() {
  numSegs = int(this.value());
  robotarm = new RobotArm(width / 2, height / 2, numSegs, segLen, 0);
}

function updateLength() {
  segLen = int(this.value());
  robotarm = new RobotArm(width / 2, height / 2, numSegs, segLen, 0);
}

function draw() {
  background(255);

  robotarm.update();
  robotarm.show();
}