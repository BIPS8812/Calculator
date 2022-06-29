class Calculator {
  constructor(previousOperand, currentOperand) {
    this.previousOperand = '';
    this.currentOperand = '';
  }

  allClear() {
    this.previousOperand = '';
    this.currentOperand = '';
    this.operation = undefined;
  }

  operationSelection(operation) {
    if (this.currentOperand === '') return;
    if (this.previousOperand !== '') {
      this.compute();
    }
    this.operation = operation;
    this.previousOperand = this.currentOperand;
    this.currentOperand = '';
  }

  append(number) {
    if (number === '.' && this.currentOperand.includes('.')) return;
    this.currentOperand = this.currentOperand.toString() + number.toString();
  }

  delete() {
    this.currentOperand = this.currentOperand.toString().slice(0, -1);
  }

  compute() {
    let result;
    let prevNum = parseFloat(this.previousOperand);
    let currNum = parseFloat(this.currentOperand);
    if (isNaN(prevNum) || isNaN(currNum)) return;

    switch (this.operation) {
      case '+':
        result = prevNum + currNum;
        break;
      case '-':
        result = prevNum - currNum;
        break;
      case '*':
        result = prevNum * currNum;
        break;
      case '÷':
        result = prevNum / currNum;
        break;
      default:
        return;
    }
    this.currentOperand = result;
    this.operation = undefined;
    this.previousOperand = '';
  }

  updateDisplay() {
    currentOperandText.textContent = this.currentOperand;
    if (this.operation != null) {
      previousOperandText.textContent = this.previousOperand + " " + this.operation;
    }else {
      previousOperandText.textContent = this.previousOperand;
    }

  }
}


const numberButtons = document.querySelectorAll(".data-number");
const operationButtons = document.querySelectorAll(".data-operation");
const equalsButton = document.querySelector(".data-equals");
const allClearButton = document.querySelector(".data-all-clear");
const deleteButton = document.querySelector(".data-delete");
const previousOperandText = document.querySelector(".previous-operand");
const currentOperandText = document.querySelector(".current-operand")


let calculator = new Calculator(previousOperandText, currentOperandText);

numberButtons.forEach(button => {
  button.addEventListener("click", function() {
    calculator.append(button.textContent)
    calculator.updateDisplay();
  })
})

operationButtons.forEach(button => {
  button.addEventListener("click", function() {
    calculator.operationSelection(button.textContent);
    calculator.updateDisplay();
  })
})

allClearButton.addEventListener("click", function() {
  calculator.allClear();
  calculator.updateDisplay();
})

deleteButton.addEventListener("click", function() {
  calculator.delete();
  calculator.updateDisplay();
})

equalsButton.addEventListener("click", function() {
  calculator.compute();
  calculator.updateDisplay();
})
