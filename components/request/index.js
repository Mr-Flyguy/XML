export class RequestComponent {
    constructor(parent) {
        this.parent = parent;
    }

    getInputHTML(requestData) {
        if (requestData.type === "solve") {
            return `Выражение: ${requestData.expression}, x = ${requestData.x}`;
        }

        if (requestData.type === "sum_of_squares") {
            return `Массив: [${requestData.numbers.join(", ")}]`;
        }

        return "";
    }

    getStepsHTML(requestData) {
        if (requestData.result === null) {
            return `Шаги решения будут доступны после выполнения заявки`;
        }

        if (requestData.type === "solve") {
            return `
                <ol class="mb-0">
                    <li>Подставляем x = ${requestData.x}</li>
                    <li>Получаем выражение: ${requestData.expression.replace(/x/g, requestData.x)}</li>
                    <li>Вычисляем результат: ${requestData.result}</li>
                </ol>
            `;
        }

        if (requestData.type === "sum_of_squares") {
            return `
                <ol class="mb-0">
                    <li>Берём массив: [${requestData.numbers.join(", ")}]</li>
                    <li>Возводим каждый элемент в квадрат</li>
                    <li>Складываем квадраты и получаем: ${requestData.result}</li>
                </ol>
            `;
        }

        return "";
    }

    getHTML(requestData) {
        return `
            <div class="request-page-card">
                <div class="d-flex justify-content-between align-items-start mb-3 flex-wrap gap-2">
                    <div>
                        <h2 class="mb-2">${requestData.title}</h2>
                        <p class="text-muted mb-0">${requestData.text}</p>
                    </div>
                    <span class="request-status">${requestData.status}</span>
                </div>

                ${
                    requestData.result !== null
                        ? `<div class="request-result">Результат: ${requestData.result}</div>`
                        : `<div class="request-result">Результат: ожидается</div>`
                }

                <div class="request-info mb-3">
                    ${this.getInputHTML(requestData)}
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
                                <p><b>Описание:</b> ${requestData.text}</p>
                                <p><b>Данные:</b> ${this.getInputHTML(requestData)}</p>
                                <p><b>Ответ:</b> ${requestData.result !== null ? requestData.result : "ещё не вычислен"}</p>
                                <p><b>Статус:</b> ${requestData.status}</p>
                                <p><b>Тип вычисления:</b> ${requestData.type}</p>
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
                                ${this.getStepsHTML(requestData)}
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        `;
    }

    render(requestData) {
        const html = this.getHTML(requestData);
        this.parent.insertAdjacentHTML("beforeend", html);
    }
}