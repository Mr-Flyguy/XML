export class RequestComponent {
    constructor(parent) {
        this.parent = parent;
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
                    requestData.result
                        ? `<div class="request-result">Результат: ${requestData.result}</div>`
                        : `<div class="request-result">Результат: ожидается</div>`
                }

                <div class="request-info mb-3">
                    Входные данные: ${requestData.input}
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
                                <p><b>Входные данные:</b> ${requestData.input}</p>
                                <p><b>Ответ:</b> ${requestData.result ?? "ещё не вычислен"}</p>
                                <p><b>Статус:</b> ${requestData.status}</p>
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
                                ${
                                    requestData.result
                                        ? `
                                            <ol class="mb-0">
                                                <li>Получены входные данные: ${requestData.input}</li>
                                                <li>Применён алгоритм вычисления</li>
                                                <li>Получен результат: ${requestData.result}</li>
                                            </ol>
                                        `
                                        : `Шаги решения будут доступны после выполнения заявки`
                                }
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