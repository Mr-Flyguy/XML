export const requests = [
    {
        id: 1,
        title: "Вычисление выражения",
        text: "Вычислить выражение 2*x+5",
        type: "solve",
        expression: "2*x+5",
        x: 3,
        status: "Выполнено"
    },
    {
        id: 2,
        title: "Сумма квадратов",
        text: "Найти сумму квадратов элементов массива",
        type: "sum_of_squares",
        numbers: [1, 2, 3, 4],
        status: "Выполнено"
    },
    {
        id: 3,
        title: "Вычисление выражения",
        text: "Вычислить выражение (x+2)*(x-1)",
        type: "solve",
        expression: "(x+2)*(x-1)",
        x: 4,
        status: "Новая"
    },
    {
        id: 4,
        title: "Сумма квадратов",
        text: "Найти сумму квадратов элементов массива",
        type: "sum_of_squares",
        numbers: [5, 1, 2],
        status: "В обработке"
    }
];