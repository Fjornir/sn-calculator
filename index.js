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
const input = document.querySelector(".calculator__input");
const btns = document.querySelectorAll(".calculator-numbers__item");
const calc = new Calculator(input);
calc.result = 123;

btns.forEach((item) => {
  item.addEventListener("click", function (event) {
    console.log(event.target.value);
  });
});
