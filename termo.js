let listaPalavras = [
  ["LIVRO", "Um objeto de leitura com páginas"],
  ["FESTA", "Celebração com música e dança"],
  ["NUVEM", "Massa de vapor d'água no céu"],
  ["PODER", "Capacidade de influenciar ou controlar"],
  ["VENTO", "Movimento natural do ar"],
  ["CANTO", "Melodia vocal ou sons harmoniosos"],
  ["VERDE", "Cor associada à natureza"],
  ["PEDRA", "Mineral duro encontrado na terra"],
  ["NOITE", "Período após o pôr do sol"],
  ["PIANO", "Instrumento musical de teclas"],
  ["AMIGO", "Pessoa com quem se tem afeto"],
  ["CALMA", "Estado de tranquilidade ou serenidade"],
  ["RISCO", "Possibilidade de perigo ou perda"],
  ["MUNDO", "O planeta Terra e sua humanidade"],
  ["FARDO", "Carga pesada ou responsabilidade"],
  ["BRAVO", "Corajoso ou irado"],
  ["SONHO", "Sequência de imagens durante o sono"],
  ["CAMPO", "Área aberta de terra"],
  ["LINHA", "Traço reto ou sequência de pontos"],
  ["FORTE", "Resistente ou robusto"],
  ["FLORA", "Conjunto de plantas de uma região"],
  ["ROCHA", "Formação sólida e mineral"],
  ["PLANO", "Projeto ou intenção organizada"],
  ["SOLAR", "Relativo ao sol ou à energia do sol"],
  ["FOCOS", "Pontos de concentração de luz ou atenção"],
  ["CARRO", "Veículo motorizado com rodas"],
  ["VIDRO", "Material transparente e frágil"],
  ["PORTO", "Local seguro para embarcações"],
  ["SALTO", "Ação de pular para cima ou para frente"],
];

let indexSorteio = Math.floor(Math.random() * listaPalavras.length);
let palavraSorteada = listaPalavras[indexSorteio][0];

// parâmetros
let numTentativas;
let tentativa;
let tentativas;
let mapaTentativas; // 0 = posição correte / 1 = posição errada / 2 = não existe
let l;
let mensagem;
let janelaModalInfo, janelaModalDica, fimDeJogo;

let tv, infoIcon, dicaIcon, infoTela, dicaTela;
let fonte;

function preload() {
  tv = loadImage("imagens/tv.png");
  infoIcon = loadImage("imagens/info.png");
  dicaIcon = loadImage("imagens/dica.png");
  infoTela = loadImage("imagens/telainfo.png");
  dicaTela = loadImage("imagens/teladica.png");

  fonte = loadFont("fonte/PixelifySans-Regular.ttf");
}

function setup() {
  createCanvas(800, 600);
  rectMode(CENTER);

  textFont(fonte);
  textAlign(CENTER, CENTER);

  l = 50;

  iniciarParametros();
}

function draw() {
  //background(0, 0, 30);
  image(tv, 0, 0);

  noStroke();

  fill(255);
  for (let i = 4; i >= numTentativas; i--) {
    for (let j = 0; j < 5; j++) {
      rect(width / 2 - 2 * l + j * l, height / 2 - 2 * l + i * l, l - 5, l - 5);
    }
  }

  for (let i = 0; i < numTentativas; i++) {
    for (let j = 0; j < 5; j++) {
      let elemento = mapaTentativas[i][j];
      switch (elemento) {
        case 0:
          fill(0, 168, 150);
          break;
        case 1:
          fill(228, 214, 167);
          break;
        case 2:
          fill(200);
          break;
      }
      rect(width / 2 - 2 * l + j * l, height / 2 - 2 * l + i * l, l - 5, l - 5);
    }
  }

  for (let i = 0; i < numTentativas; i++) {
    mostrarLetras(tentativas[i], i);
  }

  mostrarLetras(tentativa, numTentativas);

  fill(255);
  textSize(25);
  text(mensagem, width / 2, 470);

  push();
  imageMode(CENTER);
  let iconOffset1 = sin(radians(frameCount * 2)) * 5;
  image(
    infoIcon,
    176.5,
    260,
    infoIcon.width + iconOffset1,
    infoIcon.height + iconOffset1
  );

  let iconOffset2 = cos(radians(frameCount * 2)) * 5;
  image(
    dicaIcon,
    623.5,
    260,
    dicaIcon.width + iconOffset2,
    dicaIcon.height + iconOffset2
  );
  pop();

  telaAjuda();
  telaDica();
}

// Enter = 13
// Backspace = 8
function keyPressed() {
  if (!fimDeJogo && !janelaModalInfo && !janelaModalDica) {
    if (key >= "a" && key <= "z" && tentativa.length < 5) {
      mensagem = "";
      tentativa.push(key.toUpperCase());
      console.log(tentativa);
    }

    if (key == "Enter") {
      if (tentativa.length < 5)
        mensagem = "A PALAVRA DEVE TER 5 (CINCO) LETRAS.";
      else {
        //
        numTentativas++;

        let palavra = transformarArrayEmString(tentativa);
        tentativas.push(palavra);

        let resultado = verificarPalavra(palavra);
        verificarFimDeJogo(resultado);

        tentativa = [];
      }
    }

    if (key == "Backspace" && tentativa.length > 0) {
      tentativa.pop();
      console.log(tentativa);
    }
  }
}

function verificarFimDeJogo(resultado) {
  if (resultado) {
    fimDeJogo = true;
    mensagem = "PARABÉNS!";
    document.getElementById(
      "fimdejogo"
    ).innerHTML = `<p id="fim" class="pixelify-sans-text">AEEE, CONSEGUIMOS!!! OBRIGADE PELA AJUDA!!!</p>`;
    //noLoop();
  } else if (numTentativas > 4) {
    fimDeJogo = true;
    mensagem = "POXA! ACABARAM TODAS AS SUAS CHANCES!";
    document.getElementById(
      "fimdejogo"
    ).innerHTML = `<p id="fim" class="pixelify-sans-text">POXA, NÃO CONSEGUIMOS! MAS TUDO BEM, PODEMOS TENTAR DE NOVO!</p>`;
    //noLoop();
  }
}

function transformarArrayEmString(lista) {
  let palavra = "";
  for (let i = 0; i < lista.length; i++) {
    palavra += tentativa[i];
  }
  return palavra;
}

function mostrarLetras(lista, linha) {
  //
  fill(0, 0, 30);
  textSize(25);
  for (let i = 0; i < lista.length; i++) {
    text(lista[i], width / 2 - 2 * l + i * l, height / 2 - 2 * l + linha * l);
  }
}

function verificarPalavra(palavra) {
  if (palavra === palavraSorteada) {
    mapaTentativas.push([0, 0, 0, 0, 0]);
    return true;
  } else {
    //numTentativas++;
    let mapa = [];
    for (let i = 0; i < 5; i++) {
      let caractere = palavra[i];
      let indexSorteada = palavraSorteada.indexOf(caractere);

      switch (indexSorteada) {
        case -1:
          mapa.push(2);
          break;
        case i:
          mapa.push(0);
          break;
        default:
          mapa.push(1);
          break;
      }
      //if (indexSorteada == i) mapaTentativa.push(0);
    }
    mapaTentativas.push(mapa);
    //tentativa = [];

    return false;
  }
}

function mouseClicked() {
  if (
    mouseX > 176.5 - infoIcon.width / 2 &&
    mouseX < 176.5 + infoIcon.width / 2 &&
    mouseY > 260 - infoIcon.height / 2 &&
    mouseY < 260 + infoIcon.height / 2
  ) {
    if (!janelaModalInfo) {
      janelaModalInfo = true;
    }
  } else if (
    mouseX > 623.5 - dicaIcon.width / 2 &&
    mouseX < 623.5 + dicaIcon.width / 2 &&
    mouseY > 260 - dicaIcon.height / 2 &&
    mouseY < 260 + dicaIcon.height / 2
  ) {
    if (!janelaModalDica) {
      janelaModalDica = true;
    }
  }

  if (
    (janelaModalInfo || janelaModalDica) &&
    mouseX > 599 &&
    mouseX < 616.5 &&
    mouseY > 157.5 &&
    mouseY < 174.5
  ) {
    janelaModalInfo = false;
    janelaModalDica = false;
    janelaModal = false;
  }

  if (mouseX > 590 && mouseX < 700 && mouseY > 562.5 && mouseY < 587.5) {
    iniciarParametros();
  }
}

function telaAjuda() {
  if (janelaModalInfo) {
    image(infoTela, 0, 0);
  }
}

function telaDica() {
  if (janelaModalDica) {
    image(dicaTela, 0, 0);
    let dica = listaPalavras[indexSorteio][1];
    text(dica, width / 2, height / 2, 400);
  }
}

function iniciarParametros() {
  indexSorteio = Math.floor(Math.random() * listaPalavras.length);
  palavraSorteada = listaPalavras[indexSorteio][0];

  numTentativas = 0;
  tentativa = [];
  tentativas = [];
  mapaTentativas = [];

  janelaModalInfo = false;
  janelaModalDica = false;
  fimDeJogo = false;

  mensagem = "";

  document.getElementById(
    "fimdejogo"
  ).innerHTML = `<p id="fim" class="pixelify-sans-text"> </p>`;
}
