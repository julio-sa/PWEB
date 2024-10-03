function isTriangle() {
    var num1 = prompt("digite o primeiro numero");
    var num2 = prompt("digite o segundo numero");
    var num3 = prompt("digite o terceiro numero");
    if (num1 + num2 > num3 || num1 + num3 > num2 || num2 + num3 > num1) {
        if (num1 == num2 && num2 == num3) {
            return "É um triângulo Equilátero";
        } else if (num1 == num2 || num1 == num3 || num2 == num3) {
            return "É um triângulo Isoceles";
        } else {
            return "É um triângulo Escaleno";
        }
    } else {
        return("Não é um triângulo");
    }
}