window.onload = function(){ 
    // Переменные для хранения чисел и операций
    let a = ''           // Первое число
    let b = ''           // Второе число
    let expressionResult = ''  // Результат вычисления
    let selectedOperation = null  // Выбранная операция
    // Получаем доступ к экрану калькулятора в поле вывода
    const outputElement = document.getElementById("result")

    // Получаем все кнопки с цифрами (их id начинаются с "btn_digit_")
    const digitButtons = document.querySelectorAll('[id ^= "btn_digit_"]')
    function onDigitButtonClicked(digit) {
        // Если операция не выбрана, работаем с первым числом (a) - после выбора операции начинается ввод второго числа
        if (!selectedOperation) {
            // Проверяем, не пытаемся ли мы добавить вторую точку
            if ((digit != '.') || (digit == '.' && !a.includes(digit))) { 
                a += digit;
            }
            outputElement.innerHTML = a;
        } 
        // Если операция выбрана, работаем со вторым числом (b)
        else {
            if ((digit != '.') || (digit == '.' && !b.includes(digit))) { 
                b += digit;
                outputElement.innerHTML = b;        
            }
        }
    }
    // Настраиваем обработчики для цифровых кнопок
    digitButtons.forEach(button => {
        button.onclick = function() {
            const digitValue = button.innerHTML;
            onDigitButtonClicked(digitValue);
        }
    });

    // Настраиваем обработчики для кнопок операций
    document.getElementById("btn_op_mult").onclick = function() { 
        if (a === '') return;
        selectedOperation = 'x';
    }
    document.getElementById("btn_op_plus").onclick = function () {
    if (a === '') return;

    if (selectedOperation === '+' && b !== '') {
        a = ((+a) + (+b)).toString();
        b = '';
        outputElement.innerHTML = a;
    }

    selectedOperation = '+';
    }
    document.getElementById("btn_op_minus").onclick = function () {
    if (a === '') return;

    if (selectedOperation === '-' && b !== '') {
        a = ((+a) - (+b)).toString();
        b = '';
        outputElement.innerHTML = a;
    }

    selectedOperation = '-';
    }
    document.getElementById("btn_op_div").onclick = function() { 
        if (a === '') return;
        selectedOperation = '/';
    }
    // Очищаем все значения при нажатии на кнопку C
    document.getElementById("btn_op_clear").onclick = function() { 
        a = ''
        b = ''
        selectedOperation = ''
        expressionResult = ''
        outputElement.innerHTML = 0
    }
    
    document.getElementById('theme_toggle').addEventListener('click', () => {
    document.body.classList.toggle('dark');
    document.body.classList.toggle('light');
    });

    if (!document.body.classList.contains('light') && !document.body.classList.contains('dark')) {
    document.body.classList.add('light');
    }

    // document.getElementById("btn_op_sign").onclick = function() {
    //     if (!selectedOperation) {
    //         if (a === '') return;
    //         a = (-1 * (+a)).toString();
    //         outputElement.innerHTML = a;
    //     } else {
    //         if (b === '') return;
    //         b = (-1 * (+b)).toString();
    //         outputElement.innerHTML = b;
    //     }
    // }

    document.getElementById("btn_op_percent").onclick = function() {
        if (!selectedOperation) {
            if (a === '') return;
            a = ((+a) / 100).toString();
            outputElement.innerHTML = a;
        } else {
            if (b === '') return;
            b = ((+b) / 100).toString();
            outputElement.innerHTML = b;
        }
    }


    // document.getElementById("btn_op_percent").onclick = function () {
    //     if (!selectedOperation) {
    //         if (a === '') return;
    //         a = a.slice(0, -1);
    //         outputElement.innerHTML = a === '' ? 0 : a;
    //     } else {
    //         if (b === '') return;
    //         b = b.slice(0, -1);
    //         outputElement.innerHTML = b === '' ? 0 : b;
    //     }
    // }

    // document.getElementById("btn_op_percent").onclick = function () {
    //     if (!selectedOperation) {
    //         if (a === '') return;
    //         a = Math.sqrt(+a).toString();
    //         outputElement.innerHTML = a;
    //     } else {
    //         if (b === '') return;
    //         b = Math.sqrt(+b).toString();
    //         outputElement.innerHTML = b;
    //     }
    // }

    function factorial(n) {
        let res = 1;
        for (let i = 2; i <= n; i++) res *= i;
        return res;
    }

    document.getElementById("btn_op_factorial").onclick = function () {
        if (!selectedOperation) {
            if (a === '') return;
            const n = Math.trunc(+a);
            a = factorial(n).toString();
            outputElement.innerHTML = a;
        } else {
            if (b === '') return;
            const n = Math.trunc(+b);
            b = factorial(n).toString();
            outputElement.innerHTML = b;
        }
    }

    // document.getElementById("btn_op_percent").onclick = function () {
    //     if (!selectedOperation) {
    //         if (a === '') return;
    //         a = ((+a) * (+a)).toString();
    //         outputElement.innerHTML = a;
    //     } else {
    //         if (b === '') return;
    //         b = ((+b) * (+b)).toString();
    //         outputElement.innerHTML = b;
    //     }
    // }

    // Вычисляем результат при нажатии на =
    document.getElementById("btn_op_equal").onclick = function() { 
        if (a === '' || b === '' || !selectedOperation)
            return
            
        switch(selectedOperation) { 
            case 'x':
                expressionResult = (+a) * (+b)
                break;
            case '+':
                expressionResult = (+a) + (+b)
                break;
            case '-':
                expressionResult = (+a) - (+b)
                break;
            case '/':
                expressionResult = (+a) / (+b)
                break;
            default:
                break;
        }
        
        a = expressionResult.toString()
        b = ''
        selectedOperation = null

        outputElement.innerHTML = a
    }
};