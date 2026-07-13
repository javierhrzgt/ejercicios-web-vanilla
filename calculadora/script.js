let value1 = "";
let value2 = "";
let operator = "";
let lastButton = "";

const botones = document.querySelector(".app-buttons");
const screen = document.querySelector("output");

botones.addEventListener("click", (e) => {
  if (e.target.dataset.value) {
    if (lastButton !== "operator") {
      const addToString = esValido(e.target.dataset.value, value1);
      if (addToString) {
        value1 += e.target.dataset.value;
        screen.dataset.result = value1;
      }
    } else {
      const addToString = esValido(e.target.dataset.value, value2);
      if (addToString) {
        value2 += e.target.dataset.value;
        screen.dataset.result = value2;
      }
    }
    lastButton = "value";
  } else if (e.target.dataset.operator) {
    operator = e.target.dataset.operator;
    lastButton = "operator";
  } else if (e.target.dataset.action) {
    if (e.target.dataset.action === "equals") {
      const resultado = calcular(value1, operator, value2);
      if (resultado !== "") {
        value1 = resultado;
        value2 = "";
        screen.dataset.result = resultado;
      }
    } else if (e.target.dataset.action === "clear") {
      value1 = "";
      value2 = "";
      operator = "";
      screen.dataset.result = "0";
    }
    lastButton = "action";
  }
});

const calcular = (num1, operador, num2) => {
  let resultado = "";
  switch (operador) {
    case "plus":
      resultado = +num1 + +num2;
      break;
    case "minus":
      resultado = +num1 - +num2;
      break;
    case "divided":
      resultado = +num1 / +num2;
      break;
    case "times":
      resultado = +num1 * +num2;
      break;
    default:
      resultado = "";
      break;
  }
  return resultado;
};

const esValido = (pressedButton, currentValue) => {
  if (pressedButton === "." && currentValue.includes(".")) {
    return false;
  }
  return true;
};
