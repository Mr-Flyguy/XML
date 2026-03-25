import { ButtonComponent } from "../button/index.js";

export class RequestCardComponent {
    constructor(parent) {
        this.parent = parent;
    }

    get_info_html(request_data) {
        if (request_data.type === "solve") {
            return `Выражение: ${request_data.expression}, x = ${request_data.x}`;
        }

        if (request_data.type === "sum_of_squares") {
            return `Массив: [${request_data.numbers.join(", ")}]`;
        }

        return "";
    }

    getHTML(request_data) {
        return `
            <div class="col">
                <div class="card request-card">
                    <div class="card-body d-flex flex-column">
                        <div class="mb-2">
                            <span class="request-status">${request_data.status}</span>
                        </div>

                        <h5 class="request-title">${request_data.title}</h5>
                        <p class="request-text">${request_data.text}</p>

                        <div class="request-info">
                            ${this.get_info_html(request_data)}
                        </div>

                        <div class="d-flex gap-2 mt-auto">
                            <div id="request-open-button-${request_data.id}" class="w-100"></div>
                            <div id="request-delete-button-${request_data.id}" class="w-100"></div>
                        </div>
                    </div>
                </div>
            </div>
        `;
    }

    render(request_data, open_listener, delete_listener) {
        const html = this.getHTML(request_data);
        this.parent.insertAdjacentHTML("beforeend", html);

        const open_button_root = document.getElementById(`request-open-button-${request_data.id}`);
        const delete_button_root = document.getElementById(`request-delete-button-${request_data.id}`);

        const open_button = new ButtonComponent(open_button_root);
        open_button.render(
            "Открыть",
            `request-button-${request_data.id}`,
            open_listener,
            "btn btn-danger pm-btn w-100"
        );

        const delete_button = new ButtonComponent(delete_button_root);
        delete_button.render(
            "Удалить",
            `delete-button-${request_data.id}`,
            delete_listener,
            "btn btn-outline-danger pm-btn-outline-danger w-100"
        );

        document.getElementById(`request-button-${request_data.id}`).dataset.id = request_data.id;
        document.getElementById(`delete-button-${request_data.id}`).dataset.id = request_data.id;
    }
}