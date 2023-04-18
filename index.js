class Calculator {
  firstValue = null;
  secondValue = null;
  result = null;
  calcNode = null;
  constructor(calcNode) {
    this.calcNode = calcNode;
    this.result = 0;
    if (typeof Calculator.instance != "object") {
      Calculator.instance = this;
    }
    return Calculator.instance;
  }

  setFirstValue(val) {
    this.firstValue = val;
  }

  setSecondValue(val) {
    this.secondValue = val;
  }

  set result(val) {
    this.calcNode.value = val;
    console.log(this.calcNode.value);
  }
}

const input = document.querySelector(".calculator__input");
const btns = document.querySelectorAll(".calculator-numbers__item");
const equalsBtn = document.querySelector(".calculator-numbers__equals");
const operationButtons = document.querySelectorAll(
  ".calculator-numbers__operation"
);
let operationsDisplay = document.querySelector(".operations")

let operation = "";
let isOperationComplete = false;
let isSecondNeedToUpdate = false;
let isNumbersNeedToReset = false;

const calc = new Calculator(input);

const regex = /^\d+$/;
const regexSec = /^(0$|-?[1-9]\d*(\.\d*[1-9]$)?|-?0\.\d*[1-9])$/;

btns.forEach((item) => {
  item.addEventListener("click", function (event) {
    if (isNumbersNeedToReset) {
      calc.calcNode.value = null;
      isNumbersNeedToReset = false;
      isSecondNeedToUpdate = true;
    }
    calc.calcNode.value = calc.calcNode.value + event.target.value;
  });
});

operationButtons.forEach((item) => {
  item.addEventListener("click", function (event) {
    if (calc.calcNode.value.match(regexSec)) {
      calc.setFirstValue(calc.calcNode.value + event.target.value);
      operation = event.target.value;
      calc.calcNode.value = null;
      isSecondNeedToUpdate = true;
    }
  });
});

equalsBtn.addEventListener("click", function (event) {
  if (calc.calcNode.value.match(regexSec)) {
    if (isSecondNeedToUpdate) {
      calc.setSecondValue(calc.calcNode.value);
      isSecondNeedToUpdate = false;
    }
    console.log(calc.firstValue + calc.secondValue);
    console.log(operationsDisplay);
    operationsDisplay.innerHTML = calc.firstValue + calc.secondValue;
    let res = eval(calc.firstValue + calc.secondValue);

    switch (operation) {
      case "+":
        calc.setFirstValue(res + "+");
        break;
      case "-":
        calc.setFirstValue(res + "-");
        break;
      case "*":
        calc.setFirstValue(res + "*");
        break;
      case "/":
        calc.setFirstValue(res + "/");
        break;
    }
    calc.calcNode.value = res;
    isOperationComplete = true;
    isNumbersNeedToReset = true;
  }
});

input.onclick = function () {
  if (isOperationComplete) {
    calc.calcNode.value = null;
    isOperationComplete = false;
  }
};
