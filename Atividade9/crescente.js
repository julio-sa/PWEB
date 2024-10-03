function crescente() {
    var num1 = parseInt(prompt("Digite o primeiro número"));
    var num2 = parseInt(prompt("Digite o segundo número"));
    var num3 = parseInt(prompt("Digite o terceiro número"));
    
    // Coloca os números em um array
    var ordemCrescente = [num1, num2, num3];
    
    // Ordena o array em ordem crescente
    ordemCrescente.sort(function(a, b) {
        return a - b;
    });
    
    // Retorna os números em ordem crescente
    return "A ordem crescente é: " + ordemCrescente.join(", ");
}
