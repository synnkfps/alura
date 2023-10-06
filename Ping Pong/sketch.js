// Bolinha
let speedY;
let speedX;
let size = 20;

let base = 6;

let x;
let y;

let movendoInverso = false;

// Raquetes
let raquetePlayerX = 30;
let raquetePlayerY;
let raquetePlayerSize = [10, 105];
let raquetePlayerSpeed = 5;

let raqueteOponenteX = 560;
let raqueteOponenteY;
let raqueteOponenteSize = [10, 105];
let raqueteOponenteSpeed = 5;

// Placar
let pontosPlayer = 0;
let pontosOponente = 0;

function setup() {
  createCanvas(600, 400);

  x = width / 2;
  y = height / 2;

  speedY = random([-base, base]);
  speedX = random([-base, base]);

  raquetePlayerY = random(0 + raquetePlayerSize[0], height - raquetePlayerSize[1]);
  raqueteOponenteY = random(0 + raqueteOponenteSize[0], height - raqueteOponenteSize[1]);
}

function draw() {
  background(0);
  gerarBackground()
  
  fill(255, 106, 0)
  criaBolinha();
  moverBolinha();

  fill(50, 102, 168)
  criaRaquete(raquetePlayerX, raquetePlayerY, raquetePlayerSize[0], raquetePlayerSize[1]);
  fill(168, 50, 50)
  criaRaquete(raqueteOponenteX, raqueteOponenteY, raqueteOponenteSize[0], raqueteOponenteSize[1]);

  ouveRaquete(raquetePlayerY, raquetePlayerSize[1]);
  moveRaqueteOponente();

  textSize(30);
  fill(50, 102, 168)
  text(pontosPlayer, width / 2 - 60, 30);
  fill(168, 50, 50)
  text(pontosOponente, width / 2 + 60, 30);
  
}

function criaRaquete(x, y, w, h) {
  rect(x, y, w, h);
}

function ouveRaquete(raqueteY, raqueteHeight) {
  if (keyIsDown(UP_ARROW) && raqueteY >= 0) {
    raquetePlayerY -= raquetePlayerSpeed;
    movendoInverso = !movendoInverso
  } else {
    movendoInverso = false;
  }
  if (keyIsDown(DOWN_ARROW) && raqueteY + raqueteHeight <= height) {
    raquetePlayerY += raquetePlayerSpeed;
    movendoInverso = !movendoInverso
  } else {
    movendoInverso = false;
  }
}

function moveRaqueteOponente() {
  if (raqueteOponenteY + raqueteOponenteSize[1] / 2 < y) {
    raqueteOponenteY += raqueteOponenteSpeed;
  } else {
    raqueteOponenteY -= raqueteOponenteSpeed;
  }
}

function criaBolinha() {
  circle(x, y, size);
}

function moverBolinha() {
  if (x + size >= width || x - size <= 0) speedX *= -1;
  if (y + size >= height || y - size <= 0) speedY *= -1;

  if (x - size <= 0) {
    pontosOponente += 1;
  }
  if (x + size >= width) {
    pontosPlayer += 1;
  }

  x += speedX;
  y += speedY;

  colidiu(raquetePlayerX, raquetePlayerY, raquetePlayerSize[0], raquetePlayerSize[1]);
  colidiu(raqueteOponenteX, raqueteOponenteY, raqueteOponenteSize[0], raqueteOponenteSize[1]);
}

function resetBolinha() {
  x = width / 2;
  y = height / 2;
  speedY = random([-base, base]);
  speedX = random([-base, base]);
}

function colidiu(raqueteX, raqueteY, raqueteWidth, raqueteHeight) {
  if (x - size < raqueteX + raqueteWidth && 
      x + size > raqueteX && 
      y - size < raqueteY + raqueteHeight && 
      y + size > raqueteY) {
    if (movendoInverso) speedY *= -1
    speedX *= -1;
  }
}

function gerarBackground() {
  fill(87, 87, 87)
  for (let i=0; i < height; i+=90) {
    rect(width/2, i, 9, 30)
  }
}
