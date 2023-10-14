let faixasEsquerda = [40, 95, 150];
let imagemDaEstrada;
let imagemDoAtor;
let imagemCarro;
let carros = [];
let quantidadeCarros = 3;

function preload() {
  imagemDaEstrada = loadImage("imagens/estrada.png");
  imagemDoAtor = loadImage("imagens/ator-1.png");
  imagemCarro = loadImage("imagens/carro-1.png");
}

function setup() {
  createCanvas(500, 400);
  setupCarros(quantidadeCarros);
}

function setupCarros(quantidade) {
  for (let i = 0; i < quantidade; i++) {
    carros.push({
      faixa: faixasEsquerda[i],
      velocidade: random(1, 2),
      x: random(600, 700)
    });
  }
}

function mostraCarros() {
  carros.forEach(carro => {
    image(imagemCarro, carro.x, carro.faixa, 50, 40);
  });
}

function movimentaCarros() {
  carros.forEach(carro => {
    carro.x -= carro.velocidade;
    if (carro.x < -50) {
      carro.x = width + 50;
      carro.velocidade = random(1.000, 3.000)
    }
  });
}


function draw() {
  background(imagemDaEstrada);
  mostraAtor();
  movimentaAtor();
  mostraCarros();
  movimentaCarros();
}
