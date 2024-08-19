let listaPalavras = [
  "LIVRO",
  "FESTA",
  "NUVEM",
  "PODER",
  "VENTO",
  "CANTO",
  "VERDE",
  "PEDRA",
  "NOITE",
  "PIANO",
  "AMIGO",
  "CALMO",
  "RISCO",
  "MUNDO",
  "FARDO",
  "BRAVO",
  "SONHO",
  "CAMPO",
  "SOBRA",
  "LINHA",
  "FORTE",
  "FLORA",
  "ROCHA",
  "PLANO",
  "SOLAR",
  "FOCOS",
  "CARRO",
  "VIDRO",
  "PORTO",
  "SALTO",
];

let indexSorteio = Math.floor(Math.random() * listaPalavras.length);
const palavraSorteada = listaPalavras[indexSorteio];

let numTentativas;
let tentativas = [];
let mapaTentativas = []; // 0 = posição correte / 1 = posição errada / 2 = não existe
let l;
let mensagem = "";
let fimDeJogo;

let tentativa;
let tv, fonte;

function preload() {
  tv = loadImage("imagens/tv.png");
  fonte = loadFont("fonte/PixelifySans-Regular.ttf");
}

function setup() {
  createCanvas(800, 600);
  rectMode(CENTER);

  textFont(fonte);
  textAlign(CENTER, CENTER);

  l = 50;
  tentativa = [];
  numTentativas = 0;
  fimDeJogo = false;
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
}

// Enter = 13
// Backspace = 8
function keyPressed() {
  if (!fimDeJogo) {
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
    ).innerHTML = `<p id="parabens" class="pixelify-sans-text">AEEE, CONSEGUIMOS!!! OBRIGADE PELA AJUDA!!!</p>`;
    noLoop();
  } else if (numTentativas > 4) {
    fimDeJogo = true;
    mensagem = "POXA! ACABARAM TODAS AS SUAS CHANCES!";
    document.getElementById(
      "fimdejogo"
    ).innerHTML = `<p id="poxa" class="pixelify-sans-text">POXA, NÃO CONSEGUIMOS! MAS TUDO BEM, PODEMOS TENTAR DE NOVO!</p>`;
    noLoop();
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
