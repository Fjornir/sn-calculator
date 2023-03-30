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

  sum() {
    this.result = this.firstValue + this.secondValue;
    this.setFirstValue(this.result);
    this.setSecondValue(null);
  }

  sub() {
    this.result = this.firstValue + this.secondValue;
    this.setFirstValue(this.result);
    this.setSecondValue(null);
  }

  set result(val) {
    this.calcNode.value = val;
    console.log(this.calcNode.value);
  }

  getResult() {
    return this.result;
  }
}

// Набрать цифры, нажать либо на кнопку, либо на экране, набрать вторую часть цифр

const input = document.querySelector(".calculator__input");
const btns = document.querySelectorAll(".calculator-numbers__item");
const equalsBtn = document.querySelector(".calculator-numbers__equals");
//const plusBtn = document.querySelector(".calculator-numbers__plus");
//const minusBtn = document.querySelector(".calculator-numbers__minus");
const operationButtons = document.querySelectorAll(
  ".calculator-numbers__operation"
);
let operation = "";
let isOperationComplete = false;
let isSecondNeedToUpdate = false;

const calc = new Calculator(input);

const regex = /^\d+$/;
const regexSec = /^\s*([-+]?)(\d+)(?:\s*([-+*\/])\s*((?:\s[-+])?\d+)\s*)+$/;

btns.forEach((item) => {
  item.addEventListener("click", function (event) {
    calc.calcNode.value = calc.calcNode.value + event.target.value;
    console.log(event.target.value);
  });
});

operationButtons.forEach((item) => {
  item.addEventListener("click", function (event) {
    if (calc.calcNode.value.match(regex)) {
      calc.setFirstValue(calc.calcNode.value + event.target.value);
      operation = event.target.value;
      calc.calcNode.value = null;
      isSecondNeedToUpdate = true;
    }
  });
});

// plusBtn.addEventListener("click", function (event) {
//   if (calc.calcNode.value.match(regex)) {
//     calc.setFirstValue(calc.calcNode.value + "+");
//     operationButton = "+";
//     calc.calcNode.value = null;
//     isSecondNeedToUpdate = true;
//   }
// });

// minusBtn.addEventListener("click", function (event) {
//   if (calc.calcNode.value.match(regex)) {
//     calc.setFirstValue(calc.calcNode.value + "-");
//     operationButton = "-";
//     calc.calcNode.value = null;
//     isSecondNeedToUpdate = true;
//   }
// });

equalsBtn.addEventListener("click", function (event) {
  if (calc.calcNode.value.match(regex)) {
    if (isSecondNeedToUpdate) {
      calc.setSecondValue(calc.calcNode.value);
      isSecondNeedToUpdate = false;
    }
    console.log(calc.firstValue + calc.secondValue);
    let res = eval(calc.firstValue + calc.secondValue);

    switch (operation) {
      case "+":
        calc.setFirstValue(res + "+");
        break;
      case "-":
        calc.setFirstValue(res + "-");
        break;
    }

    calc.calcNode.value = res;
    isOperationComplete = true;
  }
});

input.onclick = function () {
  if (isOperationComplete) {
    calc.calcNode.value = null;
    isOperationComplete = false;
  }
};

// console.log(calc.calcNode.value);
// if (calc.calcNode.value.match(regexSec)) {
//   calc.setFirstValue(eval(calc.calcNode.value))
//   calc.setSecondValue(null)
//   calc.calcNode =
//   console.log(eval(calc.calcNode.value));
// } else {
//   console.log("not valid object");
// }
