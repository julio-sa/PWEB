function getRandomNumber(min, max) {
    return Math.floor(Math.random() * (max - min + 1)) + min;
}

function joKenPo(escolha) {
    const resultadoMensagem = document.getElementById('mensagem');
    const animacao = document.getElementById('animacao');
    const opcoes = ['papel', 'pedra', 'tesoura'];
    
    let random = getRandomNumber(0, 2);
    let escolhaComputador = opcoes[random];
    
    // Mostrar a animação de escolha
    animacao.style.display = 'block';
    resultadoMensagem.textContent = "Você escolheu " + escolha + ". Esperando o computador...";
    
    // Simular tempo de espera para mostrar a escolha do computador
    setTimeout(function() {
        animacao.style.display = 'none'; // Esconde a animação
        resultadoMensagem.textContent = "O computador escolheu " + escolhaComputador + ".";
        
        // Lógica do jogo
        let resultadoFinal = '';
        if (escolha === escolhaComputador) {
            resultadoFinal = "Empate!";
        } else if ((escolha === 'papel' && escolhaComputador === 'pedra') ||
                   (escolha === 'pedra' && escolhaComputador === 'tesoura') ||
                   (escolha === 'tesoura' && escolhaComputador === 'papel')) {
            resultadoFinal = "Você ganhou!";
        } else {
            resultadoFinal = "Você perdeu!";
        }
        
        // Exibir o resultado final
        resultadoMensagem.textContent += " " + resultadoFinal;
    }, 1500); // Delay de 1,5 segundos para simular a animação
}