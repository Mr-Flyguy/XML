export class RequestComponent {
    constructor(parent) {
        this.parent = parent;
    }

    get_input_html(request_data) {
        if (request_data.type === "solve") {
            return `Выражение: ${request_data.expression}, x = ${request_data.x}`;
        }

        if (request_data.type === "sum_of_squares") {
            return `Массив: [${request_data.numbers.join(", ")}]`;
        }

        return "";
    }

    get_steps_html(request_data) {
        if (request_data.result === null) {
            return `Шаги решения будут доступны после выполнения заявки`;
        }

        if (request_data.type === "solve") {
            return `
                <ol class="mb-0">
                    <li>Подставляем x = ${request_data.x}</li>
                    <li>Получаем выражение: ${request_data.expression.replace(/x/g, request_data.x)}</li>
                    <li>Вычисляем результат: ${request_data.result}</li>
                </ol>
            `;
        }

        if (request_data.type === "sum_of_squares") {
            return `
                <ol class="mb-0">
                    <li>Берём массив: [${request_data.numbers.join(", ")}]</li>
                    <li>Возводим каждый элемент в квадрат</li>
                    <li>Складываем квадраты и получаем: ${request_data.result}</li>
                </ol>
            `;
        }

        return "";
    }

    getHTML(request_data) {
        return `
            <div class="request-page-card">
                <div class="d-flex justify-content-between align-items-start mb-3 flex-wrap gap-2">
                    <div>
                        <h2 class="mb-2">${request_data.title}</h2>
                        <p class="text-muted mb-0">${request_data.text}</p>
                    </div>
                    <span class="request-status">${request_data.status}</span>
                </div>

                <div class="request-media">
                    <div class="request-image-block">
                        <img class="request-image" src="${request_data.image}" alt="Изображение услуги">
                    </div>
                    <div id="request-model-root"></div>
                </div>

                ${
                    request_data.result !== null
                        ? `<div class="request-result">Результат: ${request_data.result}</div>`
                        : `<div class="request-result">Результат: ожидается</div>`
                }

                <div class="request-info mb-3">
                    ${this.get_input_html(request_data)}
                </div>

                <div class="accordion" id="request-accordion">
                    <div class="accordion-item">
                        <h2 class="accordion-header">
                            <button
                                class="accordion-button"
                                type="button"
                                data-bs-toggle="collapse"
                                data-bs-target="#request-info"
                            >
                                Информация
                            </button>
                        </h2>
                        <div id="request-info" class="accordion-collapse collapse show">
                            <div class="accordion-body">
                                <p><b>Описание:</b> ${request_data.text}</p>
                                <p><b>Данные:</b> ${this.get_input_html(request_data)}</p>
                                <p><b>Ответ:</b> ${request_data.result !== null ? request_data.result : "ещё не вычислен"}</p>
                                <p><b>Статус:</b> ${request_data.status}</p>
                                <p><b>Тип вычисления:</b> ${request_data.type}</p>
                            </div>
                        </div>
                    </div>

                    <div class="accordion-item">
                        <h2 class="accordion-header">
                            <button
                                class="accordion-button collapsed"
                                type="button"
                                data-bs-toggle="collapse"
                                data-bs-target="#request-steps"
                            >
                                Шаги решения
                            </button>
                        </h2>
                        <div id="request-steps" class="accordion-collapse collapse">
                            <div class="accordion-body">
                                ${this.get_steps_html(request_data)}
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        `;
    }

    render(request_data) {
        const html = this.getHTML(request_data);
        this.parent.insertAdjacentHTML("beforeend", html);
    }
}