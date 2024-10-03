function maiorNum() {
    var num1 = prompt("digite o primeiro numero");
    var num2 = prompt("digite o segundo numero");
    var num3 = prompt("digite o terceiro numero");
    if(num1 > num2 && num1 > num3){
        return("o maior numero e: " + num1);
    }else if(num2 > num1 && num2 > num3){
        return("o maior numero e: " + num2);
    }else{
        return("o maior numero e: " + num3);
    }
}