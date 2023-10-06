// Bolinha
let speedY;
let speedX;
let size = 20;

let base = 6;

// posições bolinha
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
let raqueteOponenteSpeed = 3;

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
  gerarBackground();

  criaBolinha();
  moverBolinha();

  criaRaquete(raquetePlayerX, raquetePlayerY, raquetePlayerSize[0], raquetePlayerSize[1], true);
  criaRaquete(raqueteOponenteX, raqueteOponenteY, raqueteOponenteSize[0], raqueteOponenteSize[1], false);

  ouveRaquete(raquetePlayerY, raquetePlayerSize[1]);
  moveRaqueteOponente();

  textSize(30);

  criaPlacar(true);
  criaPlacar(false);
}

function criaPlacar(player) {
  if (player) {
    fill(50, 102, 168)
    text(pontosPlayer, width / 2 - 60, 30);
  } else {
    fill(168, 50, 50)
    text(pontosOponente, width / 2 + 60, 30);
  }
}

function criaRaquete(x, y, w, h, isPlayer) {
  if (isPlayer) {
    fill(50, 102, 168)
  } else {
    fill(168, 50, 50)
  }
  rect(x, y, w, h);
}

function ouveRaquete(raqueteY, raqueteHeight) {
  movendoInverso = false;

  if (keyIsDown(UP_ARROW) && raqueteY >= 0) {
    raquetePlayerY -= raquetePlayerSpeed;
    movendoInverso = !movendoInverso
  }
  if (keyIsDown(DOWN_ARROW) && raqueteY + raqueteHeight <= height) {
    raquetePlayerY += raquetePlayerSpeed;
    movendoInverso = !movendoInverso
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
  fill(255, 106, 0)
  circle(x, y, size);
}

function moverBolinha() {
  if (x + size >= width || x - size <= 0) { speedX *= -1;}
  if (y + size >= height || y - size <= 0) {speedY *= -1;}

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
  // Colisão com a raquete do jogador
  if (
    x - size <= raqueteX + raqueteWidth &&
    x + size >= raqueteX &&
    y >= raqueteY &&
    y <= raqueteY + raqueteHeight
  ) {
    speedX *= -1;
  }
}


function gerarBackground() {
  fill(12, 15, 36)
  rect(0,0,width,height)

  fill(255)
  rect(0, height/2-1, width, 2);

  fill(255)
  for (let i=0; i < height; i+=61.5) {
    rect(width/2 - 4.5, i, 9, 30)
  }

}
