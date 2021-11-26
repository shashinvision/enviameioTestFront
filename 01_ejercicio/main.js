let numerosPrimos = [];

let primo = (numero) => {
  for (let i = 2; i < numero; i++) {
    if (numero % i === 0) {
      return false;
    }
  }

  return numero !== 1;
};

for (let j = 1; j < 10; j++) {
  if (primo(j)) {
    numerosPrimos.push(j);
  }
}

console.log("numerosPrimos", numerosPrimos);

document.getElementById("resultado").innerText = numerosPrimos;
