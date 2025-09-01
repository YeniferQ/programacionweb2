let num1 = parseInt(prompt("Ingresa numero 1"));
let num2 = parseInt(prompt("Ingresa numero 2"));
let num3 = parseInt(prompt("Ingresa numero 3"));

if (num1 == num2 && num2== num3){
    console.log("Son iguales");
}else{
    if (num1 >= num2 && num1 >= num3){
        console.log(`Numero 1 es mayor: ${num1}`);
    }else if (num2 >= num1 && num2 >= num3){
        console.log(`Numero 2 es mayor: ${num2}`);
    }else{
        console.log(`Numero 3 es mayor: ${num3}`);
    }

if (num1 <= num2 && num1 <= num3){
    console.log(`Numero 1 es menor: ${num1}`);
}else if (num2 <= num1 && num2 <= num3){
    console.log(`Numero 2 es menor: ${num2}`);
}else{
    console.log(`Numero 3 es menor: ${num3}`);
}
}

