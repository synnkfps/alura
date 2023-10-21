//ator
let yAtor = 366;

function mostraAtor(){
  image(imagemDoAtor, 100, yAtor, 30, 30);
}

function movimentaAtor() {
  if (yAtor <= 10) {
    pontuacao += 1;
    yAtor = 366
  }
  if (keyIsDown(UP_ARROW) && yAtor > 0) {
    yAtor -= 3;
  }
  if (keyIsDown(DOWN_ARROW) && yAtor+30<height) {
    yAtor += 3;
  }
}
