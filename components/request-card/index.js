import { ButtonComponent } from "../button/index.js";

export class RequestCardComponent {
    constructor(parent) {
        this.parent = parent;
    }

    getHTML(requestData) {
        return `
            <div class="col">
                <div class="card request-card">
                    <div class="card-body d-flex flex-column">
                        <div class="mb-2">
                            <span class="request-status">${requestData.status}</span>
                        </div>

                        <h5 class="request-title">${requestData.title}</h5>
                        <p class="request-text">${requestData.text}</p>

                        <div class="request-info">
                            Входные данные: ${requestData.input}
                        </div>

                        <div id="request-card-button-${requestData.id}" class="mt-auto"></div>
                    </div>
                </div>
            </div>
        `;
    }

    render(requestData, listener) {
        const html = this.getHTML(requestData);
        this.parent.insertAdjacentHTML("beforeend", html);

        const buttonRoot = document.getElementById(`request-card-button-${requestData.id}`);
        const openButton = new ButtonComponent(buttonRoot);

        openButton.render(
            "Открыть заявку",
            `request-button-${requestData.id}`,
            listener
        );

        document.getElementById(`request-button-${requestData.id}`).dataset.id = requestData.id;
    }
}