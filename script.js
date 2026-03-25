window.onload = function () {
    let firstOperand = '';
    let secondOperand = '';
    let resultValue = '';
    let currentOperation = null;

    const resultElement = document.getElementById('result');
    const digitButtons = document.querySelectorAll('[id^="btn_digit_"]');

    function updateDisplay(value) {
        resultElement.innerHTML = value === '' ? '0' : value;
    }

    function appendDigit(digit) {
        if (currentOperation === null) {
            if (digit !== '.' || !firstOperand.includes('.')) {
                firstOperand += digit;
            }
            updateDisplay(firstOperand);
        } else {
            if (digit !== '.' || !secondOperand.includes('.')) {
                secondOperand += digit;
            }
            updateDisplay(secondOperand);
        }
    }

    digitButtons.forEach(button => {
        button.onclick = function () {
            appendDigit(button.innerHTML);
        };
    });

    function setOperation(operationSymbol) {
        if (firstOperand === '') return;
        currentOperation = operationSymbol;
    }

    document.getElementById('btn_op_plus').onclick = function () {
        setOperation('+');
    };

    document.getElementById('btn_op_minus').onclick = function () {
        setOperation('-');
    };

    document.getElementById('btn_op_mult').onclick = function () {
        setOperation('x');
    };

    document.getElementById('btn_op_div').onclick = function () {
        setOperation('/');
    };

    document.getElementById('btn_op_gcd').onclick = function () {
        setOperation('gcd');
    };

    document.getElementById('btn_op_clear').onclick = function () {
        firstOperand = '';
        secondOperand = '';
        resultValue = '';
        currentOperation = null;
        updateDisplay('0');
    };

    document.getElementById('theme_toggle').onclick = function () {
        document.body.classList.toggle('dark');
        document.body.classList.toggle('light');
    };

    if (
        !document.body.classList.contains('light') &&
        !document.body.classList.contains('dark')
    ) {
        document.body.classList.add('light');
    }

    function calculateFactorial(number) {
        const integerNumber = Math.trunc(number);

        if (integerNumber < 0) {
            return 'Ошибка';
        }

        let factorialResult = 1;
        for (let i = 2; i <= integerNumber; i++) {
            factorialResult *= i;
        }

        return factorialResult;
    }

    document.getElementById('btn_op_factorial').onclick = function () {
        if (currentOperation === null) {
            if (firstOperand === '') return;

            const factorialResult = calculateFactorial(+firstOperand);
            if (factorialResult === 'Ошибка') {
                updateDisplay('Ошибка');
                return;
            }

            firstOperand = factorialResult.toString();
            updateDisplay(firstOperand);
        } else {
            if (secondOperand === '') return;

            const factorialResult = calculateFactorial(+secondOperand);
            if (factorialResult === 'Ошибка') {
                updateDisplay('Ошибка');
                return;
            }

            secondOperand = factorialResult.toString();
            updateDisplay(secondOperand);
        }
    };

    function calculateGreatestCommonDivisor(firstNumber, secondNumber) {
        let firstInteger = Math.abs(Math.trunc(firstNumber));
        let secondInteger = Math.abs(Math.trunc(secondNumber));

        while (secondInteger !== 0) {
            const temporaryValue = secondInteger;
            secondInteger = firstInteger % secondInteger;
            firstInteger = temporaryValue;
        }

        return firstInteger;
    }

    document.getElementById('btn_op_equal').onclick = function () {
        if (firstOperand === '' || secondOperand === '' || currentOperation === null) {
            return;
        }

        const firstNumber = +firstOperand;
        const secondNumber = +secondOperand;

        switch (currentOperation) {
            case '+':
                resultValue = firstNumber + secondNumber;
                break;
            case '-':
                resultValue = firstNumber - secondNumber;
                break;
            case 'x':
                resultValue = firstNumber * secondNumber;
                break;
            case '/':
                if (secondNumber === 0) {
                    updateDisplay('Ошибка');
                    firstOperand = '';
                    secondOperand = '';
                    currentOperation = null;
                    return;
                }
                resultValue = firstNumber / secondNumber;
                break;
            case 'gcd':
                resultValue = calculateGreatestCommonDivisor(firstNumber, secondNumber);
                break;
            default:
                return;
        }

        firstOperand = resultValue.toString();
        secondOperand = '';
        currentOperation = null;
        updateDisplay(firstOperand);
    };
};