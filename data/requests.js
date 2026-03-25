export const initial_requests = [
    {
        id: 1,
        title: "Вычисление выражения",
        text: "Вычислить выражение 2*x+5",
        type: "solve",
        expression: "2*x+5",
        x: 3,
        image: "https://images.unsplash.com/photo-1509228627152-72ae9ae6848d?auto=format&fit=crop&w=1200&q=80",
        status: "Выполнено"
    },
    {
        id: 2,
        title: "Сумма квадратов",
        text: "Найти сумму квадратов элементов массива",
        type: "sum_of_squares",
        numbers: [1, 2, 3, 4],
        image: "https://images.unsplash.com/photo-1635070041078-e363dbe005cb?auto=format&fit=crop&w=1200&q=80",
        status: "Выполнено"
    },
    {
        id: 3,
        title: "Вычисление выражения",
        text: "Вычислить выражение (x+2)*(x-1)",
        type: "solve",
        expression: "(x+2)*(x-1)",
        x: 4,
        image: "https://images.unsplash.com/photo-1509228468518-180dd4864904?auto=format&fit=crop&w=1200&q=80",
        status: "Новая"
    },
    {
        id: 4,
        title: "Сумма квадратов",
        text: "Найти сумму квадратов элементов массива",
        type: "sum_of_squares",
        numbers: [5, 1, 2],
        image: "https://images.unsplash.com/photo-1515879218367-8466d910aaa4?auto=format&fit=crop&w=1200&q=80",
        status: "В обработке"
    }
];