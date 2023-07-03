let personagem;
let personagemFinal;
let grama;
let estrela;
let arvore;
let inimigo;
let victory;
let tamanho = 64;
let tamanhoInimigo = 64;
let andarX = 0;
let andarY = 0;
let velocidade = 1;
let restart;
let objetivoAlcancado = false;
let estrelaVisivel = true;

let arvoresCoordenadas = [];

let inimigosCoordenadas = [];

function preload() {
  personagem = loadImage("pngegg (2).png");
  personagemFinal = loadImage("pngwing.com (1).png");
  grama = loadImage("192a69c27bfabec5741a863928a51fb7.webp");
  estrela = loadImage("18-181204_triforce-triforce-8-bit.png");
  arvore = loadImage("kisspng-tree-pine-clip-art-8-bit-5ac8256fa9ba03.4300982115230662236952.png");
  inimigo = loadImage("Ganon-ALTTP-Sprite.png");
  victory = loadImage("istockphoto-1148824291-612x612.jpg");
}

function setup() {
  createCanvas(576, 576);

  // Gerar coordenadas aleatórias para as árvores
  for (let i = 0; i < 20; i++) {
    let x = floor(random(9)) * tamanho;
    let y = floor(random(9)) * tamanho;
    arvoresCoordenadas.push({ x: x, y: y });
  }

  // Gerar coordenadas aleatórias para os inimigos
  for (let i = 0; i < 6; i++) {
    let x = floor(random(9)) * tamanho;
    let y = floor(random(9)) * tamanho;
    inimigosCoordenadas.push({ x: x, y: y });
  }
}

function draw() {
  if (andarX < 0) {
    andarX = 0;
  }
  if (andarY < 0) {
    andarY = 0;
  }
  if (andarY > tamanho * 8) {
    andarY = 512;
  }
  if (andarX > tamanho * 8) {
    andarX = tamanho * 8;
  }

  background(220);
  for (let contador = 0; contador < 9; contador++) {
    for (let j = 0; j < 9; j++) {
      image(grama, tamanho * contador, tamanho * j, tamanho, tamanho);
    }
  }

  // Desenhar as árvores
  for (let i = 0; i < arvoresCoordenadas.length; i++) {
    image(arvore, arvoresCoordenadas[i].x, arvoresCoordenadas[i].y, tamanho, tamanho);
  }

  // Mover e desenhar os inimigos
  for (let i = 0; i < inimigosCoordenadas.length; i++) {
    let inimigoAtual = inimigosCoordenadas[i];
    let direcaoX = random([-1, 0, 1]);
    let direcaoY = random([-1, 0, 1]);
    inimigoAtual.x += direcaoX * velocidade;
    inimigoAtual.y += direcaoY * velocidade;

    // Verificar colisão com o personagem
    if (dist(andarX, andarY, inimigoAtual.x, inimigoAtual.y) < tamanho) {
      noLoop();
      image(victory, 160, 160, 256, 256);
      objetivoAlcancado = true;
      estrelaVisivel = false;

      restart = createButton("Reiniciar");
      restart.mousePressed(reset);
    }

    // Verificar bordas e alterar direção do inimigo
    if (inimigoAtual.x > width - tamanho || inimigoAtual.x < 0) {
      inimigoAtual.x -= direcaoX * velocidade;
    }
    if (inimigoAtual.y > height - tamanho || inimigoAtual.y < 0) {
      inimigoAtual.y -= direcaoY * velocidade;
    }

    image(inimigo, inimigoAtual.x, inimigoAtual.y, tamanhoInimigo, tamanhoInimigo);
  }

  if (andarX === tamanho * 8 && andarY === tamanho * 8) {
    image(victory, 160, 160, 256, 256);
    objetivoAlcancado = true;
    estrelaVisivel = false;

    restart = createButton("Reiniciar");
    restart.mousePressed(reset);
    noLoop();
  }

  if (!objetivoAlcancado) {
    if (dist(andarX, andarY, 510, 510) < tamanho) {
      image(victory, 160, 160, 256, 256);
      objetivoAlcancado = true;
      estrelaVisivel = false;
      restart = createButton("Reiniciar");
      restart.mousePressed(reset);
      noLoop();
    } else {
      image(personagem, andarX, andarY, tamanho, tamanho);
    }
  } else {
    image(personagemFinal, andarX, andarY, tamanho, tamanho);
  }

  if (estrelaVisivel) {
    image(estrela, 510, 510, tamanho, tamanho);
  }
}

function reset() {
  andarX = 0;
  andarY = 0;
  objetivoAlcancado = false;
  estrelaVisivel = true;
  restart.remove();
  loop();
}

function keyPressed() {
  if (keyIsDown(UP_ARROW)) {
    andarY -= velocidade * tamanho;
  }
  if (keyIsDown(DOWN_ARROW)) {
    andarY += velocidade * tamanho;
  }

  if (keyIsDown(LEFT_ARROW)) {
    andarX -= velocidade * tamanho;
  }

  if (keyIsDown(RIGHT_ARROW)) {
    andarX += velocidade * tamanho;
  }
}