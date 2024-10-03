function palindromo() {
    var palavra = prompt("digite uma palavra:");
    var invertida = palavra.split("").reverse().join("");
    if (palavra == invertida) {
        return("palindromo");
    } else {
        return("nao e palindromo");
    }
}