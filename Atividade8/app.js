function pesquisa() {
    var genero = [];
    var faixaEtaria = [];
    var critica = [];
    var qtdPessimo = 0;
    var qtdOtimoBom = 0;
    var somaNotas = 0;
    var somaIdade = 0;
    var qtdMasc = 0;
    var qtdFem = 0;
    var sexo, idade, avaliacao;

    while (true) {
        sexo = prompt("Digite o sexo (M ou F, ou deixe em branco para sair): ").toUpperCase();
        if (sexo === "") break; // Sai do loop se o usuário deixar em branco

        idade = parseInt(prompt("Digite a idade: "));
        avaliacao = prompt("Digite a avaliação (Ótimo, Bom, Regular ou Péssimo): ").toUpperCase();

        faixaEtaria.push(idade); // Adiciona a idade ao array

        var nota = 0;
        if (avaliacao === "ÓTIMO" || avaliacao === "OTIMO") {
            nota = 5;
            qtdOtimoBom++;
        } else if (avaliacao === "BOM") {
            nota = 4;
            qtdOtimoBom++;
        } else if (avaliacao === "REGULAR") {
            nota = 3;
        } else if (avaliacao === "PÉSSIMO" || avaliacao === "PESSIMO") {
            nota = 1;
            qtdPessimo++;
        }
        critica.push(nota); // Adiciona a nota à crítica

        if (sexo === "M") {
            qtdMasc++;
        } else if (sexo === "F") {
            qtdFem++;
        }

        somaNotas += nota;
        somaIdade += idade;
    }

    var prcntPessimo = ((qtdPessimo / critica.length) * 100).toFixed(2);
    var prcntOtimoBom = ((qtdOtimoBom / critica.length) * 100).toFixed(2);

    var avaliacaoMedia = function() {
        var temp = somaNotas / critica.length;
        if (temp >= 4.5) {
            return "Ótimo";
        } else if (temp >= 3.5) {
            return "Bom";
        } else if (temp >= 2.5) {
            return "Regular";
        } else {
            return "Péssimo";
        }
    };

    var idadeMedia = function() {
        return (somaIdade / faixaEtaria.length).toFixed(2);
    };

    var maisVelho = Math.max(...faixaEtaria);
    var maisNovo = Math.min(...faixaEtaria);

    document.getElementById('mensagem').textContent = `A média de avaliação é ${avaliacaoMedia()} \nMédia de idade é ${idadeMedia()}.`;
    document.getElementById('qtdPessimo').textContent = `Quantidade de péssimos: ${qtdPessimo}`;
    document.getElementById('prcntPessimo').textContent = `Porcentagem de péssimos: ${prcntPessimo}%`;
    document.getElementById('qtdOtimoBom').textContent = `Quantidade de ótimos e bons: ${qtdOtimoBom}`;
    document.getElementById('prcntOtimoBom').textContent = `Porcentagem de ótimos e bons: ${prcntOtimoBom}%`;
    document.getElementById('maisVelho').textContent = `Maior idade: ${maisVelho}`;
    document.getElementById('maisNovo').textContent = `Menor idade: ${maisNovo}`;
    document.getElementById('qtdMasc').textContent = `Quantidade de homens: ${qtdMasc}`;
    document.getElementById('qtdFem').textContent = `Quantidade de mulheres: ${qtdFem}`;
}
