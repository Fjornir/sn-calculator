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

function refreshFirstValue(operation, res) {
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
}

function handleOperation(mark) {
  console.log("ya tyt");
  if (calc.calcNode.value.match(regexSec)) {
    if (isOperationBtnPressed) {
      calc.setFirstValue(calc.firstValue.slice(0, -1) + mark);
      operation = mark;
    } else {
      calc.setFirstValue(calc.calcNode.value + mark);
      operation = mark;
      console.log("Event target value " + mark);
      calc.calcNode.value = null;
      isSecondNeedToUpdate = true;
      isOperationBtnPressed = true;
    }

    console.log(calc.firstValue);
    console.log(isOperationBtnPressed);
  }
}

function handleEquals() {
  if (calc.calcNode.value.match(regexSec)) {
    if (isSecondNeedToUpdate) {
      calc.setSecondValue(calc.calcNode.value);
      isSecondNeedToUpdate = false;
    }

    history.push(`<div>${calc.firstValue + calc.secondValue}</div>`);
    operationsDisplay.innerHTML = history.join("");
    operationsDisplay.scrollTop = operationsDisplay.scrollHeight;
    let res = eval(calc.firstValue + calc.secondValue);

    refreshFirstValue(operation, res);

    calc.calcNode.value = res;
    isOperationComplete = true;
    isNumbersNeedToReset = true;
    isOperationBtnPressed = false;
    input.focus();
  }
}

const input = document.querySelector(".calculator__input");
const btns = document.querySelectorAll(".calculator-numbers__item");
const equalsBtn = document.querySelector(".calculator-numbers__equals");
const operationButtons = document.querySelectorAll(
  ".calculator-numbers__operation"
);
let operationsDisplay = document.querySelector(".operations");
let history = [];
let operation = "";
let isOperationComplete = false;
let isSecondNeedToUpdate = false;
let isNumbersNeedToReset = false;
let isOperationBtnPressed = false;

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
  item.addEventListener("click", function (e) {
    handleOperation(e.target.value);
  });
});

equalsBtn.addEventListener("click", function () {
  handleEquals();
});

input.onclick = function () {
  if (isOperationComplete) {
    calc.calcNode.value = null;
    isOperationComplete = false;
  }
};

$(".calculator-numbers__clear").click(function (e) {
  calc.calcNode.value = null;
});

input.onkeydown = function (event) {
  switch (event.keyCode) {
    case 107:
      handleOperation("+");
      break;
    case 109:
      handleOperation("-");
      break;
    case 106:
      handleOperation("*");
      break;
    case 111:
      handleOperation("/");
      break;
    case 13:
      handleEquals();
      break;
    default:
      break;
  }

  console.log(event.keyCode);
  console.log("calc.firstValue = " + calc.firstValue);
};
