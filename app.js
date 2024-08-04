let listaDeNumerosSorteados= [];
let numeroLimite = 10;
let numeroSecreto = gerarNumeroAleatorio();
let tentativas = 1;

function exibirTextoNaTela(tag, texto) {
    let campo = document.querySelector(tag);
    campo.innerHTML = texto;
    responsiveVoice.speak(texto, "Brazilian Portuguese Female", {rate:1.2});
}

function exibirMensagemInicial() {
    exibirTextoNaTela("h1", "Jogo do número secreto");
    exibirTextoNaTela("p", "Escolha um número de 1 a 10");
}

exibirMensagemInicial();

function verificarChute() {
    let chute = parseInt(document.querySelector("input").value);

    if (chute === numeroSecreto) {
        exibirTextoNaTela("h1", "Acertou!");
        let palavraTentativa = tentativas > 1 ? "tentativas" : "tentativa";
        let mensagemTentativas = `Você descobriu o número secreto com ${tentativas} ${palavraTentativa}!`;
        exibirTextoNaTela("p", mensagemTentativas);
        document.getElementById("reiniciar").removeAttribute("disabled");
    } else {
        if (chute > numeroSecreto) {
            exibirTextoNaTela("p", "O número secreto é menor");
        } else {
            exibirTextoNaTela("p", "O número secreto é maior");
        }
    }
    tentativas++;
    limparCampo();
}

function gerarNumeroAleatorio() {
   let numeroEscolhido = parseInt(Math.random() *numeroLimite+1);
   let quantidadeDeElementoNaLista = listaDeNumerosSorteados.length;

   if ( quantidadeDeElementoNaLista == numeroLimite) {
    listaDeNumerosSorteados = [];
   }

   if (listaDeNumerosSorteados.includes(numeroEscolhido)){
    return gerarNumeroAleatorio();
   } else {
listaDeNumerosSorteados.push(numeroEscolhido);
console.log(listaDeNumerosSorteados);
    return numeroEscolhido;
   }
}

function limparCampo() {
    let chute = document.querySelector("input");
    chute.value = "";
}

function reiniciarJogo() {
    numeroSecreto = gerarNumeroAleatorio();
    limparCampo();
    tentativas = 1;
    exibirMensagemInicial();
    document.getElementById("reiniciar").setAttribute("disabled", true);
}

// Adiciona um ouvinte de evento para a tecla Enter
document.querySelector("input").addEventListener("keydown", function(event) {
    if (event.key === "Enter") {
        event.preventDefault(); // Evita o comportamento padrão do Enter em campos de formulário
        verificarChute(); // Chama a função que processa o chute
    }
});

// Adiciona um ouvinte de evento para o botão "Chutar"
document.getElementById("chutar").addEventListener("click", function() {
    verificarChute();
});

// Adiciona um ouvinte de evento para o botão "Reiniciar"
document.getElementById("reiniciar").addEventListener("click", function() {
    reiniciarJogo();
});
