// :D
function solve_easy(expression, x) {
    const replaced = expression.replace(/x/g, x);

    return eval(replaced);
}

function solve(expression, x) {
    const str = expression.replace(/x/g, x);
    let i = 0;

    function parse() {
        let result = 0;
        let current = 0;
        let sign = 1;

        while (i < str.length) {
            let char = str[i];

            if (char >= '0' && char <= '9') {
                current = 0;

                while (i < str.length && str[i] >= '0' && str[i] <= '9') {
                    current = current * 10 + Number(str[i]);
                    i++;
                }

                i--;
            } else if (char === '(') {
                i++;
                current = parse();
            } else if (char === ')') {
                result += sign * current;
                return result;
            }

            if (i + 1 < str.length && str[i + 1] === '*') {
                i += 2;
                let next = 0;

                if (str[i] === '(') {
                    i++;
                    next = parse();
                } else {
                    while (i < str.length && str[i] >= '0' && str[i] <= '9') {
                        next = next * 10 + Number(str[i]);
                        i++;
                    }
                    i--;
                }

                current = current * next;
            }

            if (char === '+' || char === '-') {
                result += sign * current;
                current = 0;
                sign = char === '+' ? 1 : -1;
            }

            i++;
        }

        result += sign * current;
        return result;
    }

    return parse();
}