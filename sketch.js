let rpsInstances = []
let rpsArray = ['rock', 'paper', 'scissors']
let hitParticles = []

let rockAmt = 0
let paperAmt = 0
let scissorsAmt = 0
let totalAmount
let size = 30

let sfxPop
let sfxRock, sfxPaper, sfxScissors

let borderSize = 5
let borderTint = 255

let rock, paper, scissors

let shakeIntensity = 0;
let shakeRotationIntensity = 0.02; // Intensity of rotation
let shakeDuration = 0;
let fadeOutRate = 0.1; // Rate at which shake intensity fades out
let centerX, centerY; // Center of the canvas

function windowResized() {
  resizeCanvas(windowWidth, windowHeight);
}

function preload() {
  rock = loadImage('rock.png')

  paper = loadImage('paper.png')

  scissors = loadImage('scissors.png')

  sfxPop = loadSound('pop.mp3')

  sfxRock = loadSound('rock.mp3')
  sfxPaper = loadSound('paper.mp3')
  sfxScissors = loadSound('scissors.mp3')
}

function setup() {
  createCanvas(windowWidth, windowHeight);
  centerX = width / 2;
  centerY = height / 2;
  startSimulation();
}

function draw() {
  if (borderTint >= 255) {
    borderTint = 255;
  }

  background(20);
  push()
  fill(255, borderTint, borderTint)
  noStroke()
  rect(0, 0, width, borderSize)
  rect(0, 0, borderSize, height)
  rect(0, height - borderSize, width, borderSize)
  rect(width - borderSize, 0, borderSize, height)
  pop()

  noStroke()
  fill(255, borderTint, borderTint)
  textSize(20)
  textAlign(LEFT)
  text("Players: " + totalAmount, borderSize + 5, borderSize + 20)
  textAlign(CENTER)
  text("Press Space to reset simulation.", width / 2, height - borderSize + -20)

  borderTint += 20

  // Apply screen shake effect
  if (shakeDuration > 0) {
    let dx = random(-shakeIntensity, shakeIntensity);
    let dy = random(-shakeIntensity, shakeIntensity);
    let rotationAngle = random(-shakeRotationIntensity, shakeRotationIntensity); // Slight rotation
    translate(centerX, centerY); // Translate to the center
    rotate(rotationAngle); // Apply rotation around the center
    translate(-centerX, -centerY); // Translate back to the original position
    translate(dx, dy); // Apply screen shake
    shakeIntensity -= fadeOutRate; // Gradually decrease shake intensity
    if (shakeIntensity < 0) {
      shakeIntensity = 0; // Ensure shake intensity doesn't go negative
    }
    shakeDuration--;
  }
  drawScoreboard();

  for (let i = 0; i < rpsInstances.length; i++) {
    rpsInstances[i].update();
    rpsInstances[i].show();

    for (let j = 0; j < rpsInstances.length; j++) {
      if ((i !== j) && rpsInstances[i].detectFor(rpsInstances[j])) {
        startScreenShake(3, 0.6, 4)
        for (let k = 0; k < 3; k++) {
          hitParticles.push(new hitParticle(rpsInstances[i].position.x, rpsInstances[i].position.y, size / 6))
          rpsInstances[j].tint = 0
          borderTint = 0
        }
        rpsInstances[j].type = rpsInstances[i].type;
        if (rpsInstances[i].type == 'rock') {
          sfxRock.play(0, random(0.9, 1.1), 0.5)
        } else if (rpsInstances[i].type == 'paper') {
          sfxPaper.play(0, random(0.9, 1.1), 0.5)
        } else if (rpsInstances[i].type == 'scissors') {
          sfxScissors.play(0, random(0.9, 1.1), 0.5)
        }
      }
    }
  }

  for (let p = 0; p < hitParticles.length; p++) {
    hitParticles[p].update()
    if (hitParticles[p].isDead()) {
      hitParticles.splice(p, 1)
    }
  }
}

function keyPressed() {
  if (keyCode == 32) {
    rpsInstances.splice(0, rpsInstances.length)
    startSimulation();
  }
}

function startSimulation() {
  totalAmount = round(random(50, 100))
  sfxPop.play(0, 1)
  for (let i = 0; i < totalAmount; i++) {
    rpsInstances.push(new rpsInstance(rpsArray[round(random(0, 2))], random(size-5, size+5)))
  }
}

function drawScoreboard() {
  // Reset counts
  rockCount = 0;
  paperCount = 0;
  scissorsCount = 0;

  // Count the number of each type in rpsInstances
  for (let i = 0; i < rpsInstances.length; i++) {
    if (rpsInstances[i].type === 'rock') {
      rockCount++;
    } else if (rpsInstances[i].type === 'paper') {
      paperCount++;
    } else if (rpsInstances[i].type === 'scissors') {
      scissorsCount++;
    }
  }

  // Display counts as text on the screen
  textSize(20)
  textAlign(CENTER)
  fill(50)
  if (rockCount >= paperCount && rockCount >= scissorsCount) {
    fill(100, 50, 50)
  }
  text(`Rocks: ${rockCount}`, width / 2, height / 2 - 50);
  fill(50)
  if (paperCount >= rockCount && paperCount >= scissorsCount) {
    fill(100, 50, 50)
  }
  text(`Papers: ${paperCount}`, width / 2, height / 2);
  fill(50)
  if (scissorsCount >= rockCount && scissorsCount >= paperCount) {
    fill(100, 50, 50)
  }
  text(`Scissors: ${scissorsCount}`, width / 2, height / 2 + 50);
}

function startScreenShake(intensity, rotationIntensity, duration) {
  shakeIntensity = intensity;
  shakeRotationIntensity = rotationIntensity;
  shakeDuration = duration;
}