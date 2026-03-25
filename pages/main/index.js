import { RequestCardComponent } from "../../components/request-card/index.js";
import { requests_form_html } from "./request-form.js";
import { RequestPage } from "../request/index.js";
import { get_requests, add_request, delete_request, get_next_id } from "../../utils/request-storage.js";

export class MainPage {
    constructor(parent) {
        this.parent = parent;
    }

    get request_list_root() {
        return document.getElementById("request-list");
    }

    getHTML() {
        const requests = get_requests();

        return `
            <div id="main-page" class="app-container">
                <div class="hero-block">
                    <div class="d-flex justify-content-between align-items-center flex-wrap gap-3">
                        <div>
                            <h1 class="hero-title">Система заявок на вычисления</h1>
                            <p class="hero-text">
                                Просмотр заявок на вычисление выражений и обработку массивов
                            </p>
                        </div>

                        <div class="request-counter">
                            ${requests.length} заявки
                        </div>
                    </div>
                </div>

                <div class="mb-4">
                    <button class="btn btn-danger pm-btn" id="add-request-button">
                        Добавить заявку
                    </button>
                </div>

                <div id="request-form-container" class="mb-4 d-none">
                    ${requests_form_html()}
                </div>

                <div id="request-list" class="row row-cols-1 row-cols-md-2 g-4"></div>
            </div>
        `;
    }

    click_card(event) {
        const request_id = event.target.dataset.id;
        const request_page = new RequestPage(this.parent, request_id);
        request_page.render();
    }

    click_delete(event) {
        const request_id = Number(event.target.dataset.id);
        delete_request(request_id);
        this.render();
    }

    click_add_button() {
        const form_container = document.getElementById("request-form-container");
        form_container.classList.toggle("d-none");
    }

    submit_form(event) {
        event.preventDefault();

        const title = document.getElementById("request-title").value;
        const text = document.getElementById("request-text").value;
        const type = document.getElementById("request-type").value;
        const status = document.getElementById("request-status").value;
        const image = document.getElementById("request-image").value;

        const new_request = {
            id: get_next_id(),
            title,
            text,
            type,
            image,
            status
        };

        if (type === "solve") {
            new_request.expression = document.getElementById("request-expression").value;
            new_request.x = Number(document.getElementById("request-x").value);
        }

        if (type === "sum_of_squares") {
            const numbers_string = document.getElementById("request-numbers").value;
            new_request.numbers = numbers_string
                .split(",")
                .map((item) => Number(item.trim()))
                .filter((item) => !Number.isNaN(item));
        }

        add_request(new_request);
        this.render();
    }

    change_type() {
        const type = document.getElementById("request-type").value;
        const solve_fields = document.getElementById("solve-fields");
        const array_fields = document.getElementById("array-fields");

        if (type === "solve") {
            solve_fields.classList.remove("d-none");
            array_fields.classList.add("d-none");
        } else {
            solve_fields.classList.add("d-none");
            array_fields.classList.remove("d-none");
        }
    }

    add_listeners() {
        document
            .getElementById("add-request-button")
            .addEventListener("click", this.click_add_button.bind(this));

        document
            .getElementById("request-form")
            .addEventListener("submit", this.submit_form.bind(this));

        document
            .getElementById("request-type")
            .addEventListener("change", this.change_type.bind(this));
    }

    render() {
        this.parent.innerHTML = "";
        this.parent.insertAdjacentHTML("beforeend", this.getHTML());

        const requests = get_requests();

        requests.forEach((request_data) => {
            const request_card = new RequestCardComponent(this.request_list_root);
            request_card.render(
                request_data,
                this.click_card.bind(this),
                this.click_delete.bind(this)
            );
        });

        this.add_listeners();
    }
}