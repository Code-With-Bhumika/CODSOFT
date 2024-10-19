// Get references to the display and all the buttons
const display = document.getElementById('display');
const buttons = document.querySelectorAll('.btn');

// Initialize variables to store the current input and the previous input
let currentInput = '';
let previousInput = '';
let operator = null;

// Add event listeners to all buttons
buttons.forEach(button => {
    button.addEventListener('click', () => {
        const value = button.value;

        if (value === 'clear') {
            clearCalculator();
        } else if (value === '=') {
            calculate();
        } else if (['+', '-', '*', '/'].includes(value)) {
            handleOperator(value);
        } else {
            handleNumber(value);
        }
    });
});

// Clear the calculator
function clearCalculator() {
    currentInput = '';
    previousInput = '';
    operator = null;
    display.value = '';
}

// Handle number input
function handleNumber(value) {
    if (currentInput === '0' && value === '0') {
        return; // Avoid multiple zeros at the beginning
    }
    currentInput += value;
    display.value = currentInput;
}

// Handle operator input
function handleOperator(op) {
    if (currentInput === '') return; // Do nothing if no number is entered
    if (operator !== null) calculate(); // Calculate if there's an existing operator
    previousInput = currentInput;
    currentInput = '';
    operator = op;
}

// Perform the calculation
function calculate() {
    if (operator === null || currentInput === '') return;

    const prev = parseFloat(previousInput);
    const curr = parseFloat(currentInput);

    let result;
    switch (operator) {
        case '+':
            result = prev + curr;
            break;
        case '-':
            result = prev - curr;
            break;
        case '*':
            result = prev * curr;
            break;
        case '/':
            result = prev / curr;
            break;
        default:
            return;
    }

    display.value = result;
    currentInput = result.toString();
    operator = null;
    previousInput = '';
}
