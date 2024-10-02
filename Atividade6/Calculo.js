function media() {
    var nome = prompt("Digite o nome");
    var nota1 = prompt("Digite a primeira nota");
    var nota2 = prompt("Digite a segunda nota");
    var nota3 = prompt("Digite a terceira nota");
    var nota4 = prompt("Digite a quarta nota");

    var media = (parseFloat(nota1) + parseFloat(nota2) + parseFloat(nota3) + parseFloat(nota4)) / 4;
    alert("Nome: " + nome + "\nMedia: " + media);
}

function operacoes() {
    var num1 = prompt("Digite o primeiro valor");
    var num2 = prompt("Digite o segundo valor");
    
    var soma = parseFloat(num1) + parseFloat(num2);
    var subtracao = parseFloat(num1) - parseFloat(num2);
    var multiplicacao = parseFloat(num1) * parseFloat(num2);
    var divisao = parseFloat(num1) / parseFloat(num2);
    var resto = parseFloat(num1) % parseFloat(num2);
    
    alert("Soma: " + soma + "\nSubtração: " + subtracao + "\nMultiplicação: " + multiplicacao + "\nDivisão: " + divisao.toFixed(2) + "\nResto: " + resto);
}