let faixasEsquerda = [40, 95, 150, 210, 260, 315];
let imagemDaEstrada;
let imagemDoAtor;
let imagemCarro;
let carros = [];
let carrosImagens = [];
let quantidadeCarros = 1;
let ultimoCarroAdicionado = 0;
let ultimoCarroRemovido;
let boom = 0;
let boomTexto = {texto: "BOOM!", x: 0, y: 0, visivel: false};
let pontuacao = 0; // Variável para a pontuação

function preload() {
  ultimoCarroRemovido = millis();
  imagemDaEstrada = loadImage("imagens/estrada.png");
  imagemDoAtor = loadImage("imagens/ator-1.png");
  imagemCarro = loadImage("imagens/carro-1.png");
  carrosImagens.push(loadImage("imagens/carro-1.png"));
  carrosImagens.push(loadImage("imagens/carro-2.png"));
  carrosImagens.push(loadImage("imagens/carro-3.png"));
}

function setup() {
  createCanvas(500, 400);
  setupCarros(quantidadeCarros);
}

function setupCarros(quantidade) {
  const espacamento = 60;

  for (let fileira = 0; fileira < quantidade; fileira++) {
    for (let i = 0; i < faixasEsquerda.length; i++) {
      let imagem = i % carrosImagens.length;
      let xInicial = width + 50;
      let velocidade = random(1.000, 3.000);

      carros.push({
        faixa: faixasEsquerda[i] + fileira * espacamento,
        velocidade: velocidade,
        x: xInicial,
        image: carrosImagens[imagem],
        lento: false,
      });
    }
  }
}

function mostraCarros() {
  carros.forEach(carro => {
    image(carro.image, carro.x, carro.faixa, 50, 40);
  });
}

function movimentaCarros() {
  carros.forEach(carro => {
    if (!carro.lento) {
      carro.x -= carro.velocidade;
      if (carro.x < -50) {
        carro.x = width + 50;
        carro.velocidade = random(1.000, 3.000);
        let imagemAleatoria = floor(random(carrosImagens.length));
        carro.image = carrosImagens[imagemAleatoria];
      }
    }

    carros.forEach(carroFrente => {
      if (carro !== carroFrente && carro.faixa === carroFrente.faixa) {
        if (carro.x < carroFrente.x + 50 && carro.x + 50 > carroFrente.x) {
          if (carro.velocidade > carroFrente.velocidade) {
            removerCarro(carroFrente);
          }

          setTimeout(() => {
            carro.lento = false;
            carroFrente.lento = false;
          }, 1000);
        }
      }
    });
  });
}

function removerCarro(carro) {
  const carroParaRemover = carros.findIndex(c => c === carro);
  if (carroParaRemover !== -1) {
    boomTexto.texto = "BOOM!";
    boomTexto.x = carro.x;
    boomTexto.y = carro.faixa;
    boomTexto.visivel = true;
    carros.splice(carroParaRemover, 1);
  }
}

function removerCarrosAleatorios() {
  for (let i = 0; i < faixasEsquerda.length; i++) {
    let carrosNaFaixa = carros.filter(carro => carro.faixa === faixasEsquerda[i]);
    if (carrosNaFaixa.length > 1) {
      let paraRemover = random(carrosNaFaixa);
      removerCarro(paraRemover);
    }
  }
}

function draw() {
  background(imagemDaEstrada);
  mostraCarros();
  movimentaCarros();
  let tempoAtual = millis();

  if (boomTexto.visivel) {
    textSize(32);
    fill(255, 0, 0);
    text(boomTexto.texto, boomTexto.x, boomTexto.y);
    if (tempoAtual - boom >= 2000) {
      boomTexto.visivel = false;
      boom = tempoAtual;
    }
  }

  if (tempoAtual - ultimoCarroAdicionado >= random(2200, 4900)) {
    adicionarCarroAleatorio();
    ultimoCarroAdicionado = tempoAtual;
  }

  // Exibe a pontuação no meio da tela
  textSize(32);
  fill(255);
  mostraAtor();
  movimentaAtor();
  verificarColisoes();
  text("Pontuação: " + pontuacao, width / 2 - 80, 40);
}

function adicionarCarroAleatorio() {
  let faixaAleatoria = faixasEsquerda[floor(random(faixasEsquerda.length))];
  let velocidadeAleatoria = random(1.000, 3.000);
  let imagemAleatoria = floor(random(carrosImagens.length));

  carros.push({faixa: faixaAleatoria, velocidade: velocidadeAleatoria, x: width + 50, image: carrosImagens[imagemAleatoria]});
}

function verificarColisoes() {
  for (let carro of carros) {
    let carroEsquerda = carro.x;
    let carroDireita = carro.x + 50;
    let carroCima = carro.faixa;
    let carroBaixo = carro.faixa + 40;

    let atorEsquerda = 100;
    let atorDireita = 100 + 30;
    let atorCima = yAtor;
    let atorBaixo = yAtor + 30;

    if (atorEsquerda < carroDireita &&atorDireita > carroEsquerda && atorCima < carroBaixo &&atorBaixo > carroCima) {
      yAtor = 366;
      pontuacao -= !pontuacao?0:1;
    }
  }
}let faixasEsquerda = [40, 95, 150, 210, 260, 315];
let imagemDaEstrada;
let imagemDoAtor;
let imagemCarro;
let carros = [];
let carrosImagens = [];
let quantidadeCarros = 1;
let ultimoCarroAdicionado = 0;
let ultimoCarroRemovido;
let boom = 0;
let boomTexto = {texto: "BOOM!", x: 0, y: 0, visivel: false};
let pontuacao = 0; // Variável para a pontuação

function preload() {
  ultimoCarroRemovido = millis();
  imagemDaEstrada = loadImage("imagens/estrada.png");
  imagemDoAtor = loadImage("imagens/ator-1.png");
  imagemCarro = loadImage("imagens/carro-1.png");
  carrosImagens.push(loadImage("imagens/carro-1.png"));
  carrosImagens.push(loadImage("imagens/carro-2.png"));
  carrosImagens.push(loadImage("imagens/carro-3.png"));
}

function setup() {
  createCanvas(500, 400);
  setupCarros(quantidadeCarros);
}

function setupCarros(quantidade) {
  const espacamento = 60;

  for (let fileira = 0; fileira < quantidade; fileira++) {
    for (let i = 0; i < faixasEsquerda.length; i++) {
      let imagem = i % carrosImagens.length;
      let xInicial = width + 50;
      let velocidade = random(1.000, 3.000);

      carros.push({
        faixa: faixasEsquerda[i] + fileira * espacamento,
        velocidade: velocidade,
        x: xInicial,
        image: carrosImagens[imagem],
        lento: false,
      });
    }
  }
}

function mostraCarros() {
  carros.forEach(carro => {
    image(carro.image, carro.x, carro.faixa, 50, 40);
  });
}

function movimentaCarros() {
  carros.forEach(carro => {
    if (!carro.lento) {
      carro.x -= carro.velocidade;
      if (carro.x < -50) {
        carro.x = width + 50;
        carro.velocidade = random(1.000, 3.000);
        let imagemAleatoria = floor(random(carrosImagens.length));
        carro.image = carrosImagens[imagemAleatoria];
      }
    }

    carros.forEach(carroFrente => {
      if (carro !== carroFrente && carro.faixa === carroFrente.faixa) {
        if (carro.x < carroFrente.x + 50 && carro.x + 50 > carroFrente.x) {
          if (carro.velocidade > carroFrente.velocidade) {
            removerCarro(carroFrente);
          }

          setTimeout(() => {
            carro.lento = false;
            carroFrente.lento = false;
          }, 1000);
        }
      }
    });
  });
}

function removerCarro(carro) {
  const carroParaRemover = carros.findIndex(c => c === carro);
  if (carroParaRemover !== -1) {
    boomTexto.texto = "BOOM!";
    boomTexto.x = carro.x;
    boomTexto.y = carro.faixa;
    boomTexto.visivel = true;
    carros.splice(carroParaRemover, 1);
  }
}

function removerCarrosAleatorios() {
  for (let i = 0; i < faixasEsquerda.length; i++) {
    let carrosNaFaixa = carros.filter(carro => carro.faixa === faixasEsquerda[i]);
    if (carrosNaFaixa.length > 1) {
      let paraRemover = random(carrosNaFaixa);
      removerCarro(paraRemover);
    }
  }
}

function draw() {
  background(imagemDaEstrada);
  mostraCarros();
  movimentaCarros();
  let tempoAtual = millis();

  if (boomTexto.visivel) {
    textSize(32);
    fill(255, 0, 0);
    text(boomTexto.texto, boomTexto.x, boomTexto.y);
    if (tempoAtual - boom >= 2000) {
      boomTexto.visivel = false;
      boom = tempoAtual;
    }
  }

  if (tempoAtual - ultimoCarroAdicionado >= random(2200, 4900)) {
    adicionarCarroAleatorio();
    ultimoCarroAdicionado = tempoAtual;
  }

  // Exibe a pontuação no meio da tela
  textSize(32);
  fill(255);
  mostraAtor();
  movimentaAtor();
  verificarColisoes();
  text("Pontuação: " + pontuacao, width / 2 - 80, 40);
}

function adicionarCarroAleatorio() {
  let faixaAleatoria = faixasEsquerda[floor(random(faixasEsquerda.length))];
  let velocidadeAleatoria = random(1.000, 3.000);
  let imagemAleatoria = floor(random(carrosImagens.length));

  carros.push({faixa: faixaAleatoria, velocidade: velocidadeAleatoria, x: width + 50, image: carrosImagens[imagemAleatoria]});
}

function verificarColisoes() {
  for (let carro of carros) {
    let carroEsquerda = carro.x;
    let carroDireita = carro.x + 50;
    let carroCima = carro.faixa;
    let carroBaixo = carro.faixa + 40;

    let atorEsquerda = 100;
    let atorDireita = 100 + 30;
    let atorCima = yAtor;
    let atorBaixo = yAtor + 30;

    if (atorEsquerda < carroDireita &&atorDireita > carroEsquerda && atorCima < carroBaixo &&atorBaixo > carroCima) {
      yAtor = 366;
      pontuacao -= !pontuacao?0:1;
    }
  }
}
