let imagemCarro;

let carros = [];
let carrosImagens = [];

let quantidadeCarros = 1;

let ultimoCarroAdicionado = 0;
let ultimoCarroRemovido;

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

function adicionarCarroAleatorio() {
    let faixaAleatoria = faixasEsquerda[floor(random(faixasEsquerda.length))];
    let velocidadeAleatoria = random(1.000, 3.000);
    let imagemAleatoria = floor(random(carrosImagens.length));

    carros.push({
        faixa: faixaAleatoria,
        velocidade: velocidadeAleatoria,
        x: width + 50,
        image: carrosImagens[imagemAleatoria]
    });
}
