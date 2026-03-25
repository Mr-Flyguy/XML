import { RequestComponent } from "../../components/request/index.js";
import { RequestModelComponent } from "../../components/request-model/index.js";
import { BackButtonComponent } from "../../components/back-button/index.js";
import { MainPage } from "../main/index.js";
import { get_request_by_id } from "../../utils/request-storage.js";
import { solve, sumOfSquares } from "../../utils/calculations.js";

export class RequestPage {
    constructor(parent, id) {
        this.parent = parent;
        this.id = Number(id);
    }

    get page_root() {
        return document.getElementById("request-page");
    }

    getHTML() {
        return `
            <div id="request-page" class="app-container"></div>
        `;
    }

    get_data() {
        const request = get_request_by_id(this.id);

        if (!request) {
            return null;
        }

        let result = null;

        if (request.status === "Выполнено") {
            if (request.type === "solve") {
                result = solve(request.expression, request.x);
            }

            if (request.type === "sum_of_squares") {
                result = sumOfSquares(request.numbers);
            }
        }

        return {
            ...request,
            result: result
        };
    }

    click_back() {
        const main_page = new MainPage(this.parent);
        main_page.render();
    }

    render() {
        this.parent.innerHTML = "";
        this.parent.insertAdjacentHTML("beforeend", this.getHTML());

        const back_button = new BackButtonComponent(this.page_root);
        back_button.render(this.click_back.bind(this));

        const request_data = this.get_data();
        const request_component = new RequestComponent(this.page_root);
        request_component.render(request_data);

        const model_root = document.getElementById("request-model-root");
        const request_model = new RequestModelComponent(model_root);
        request_model.render();
    }
}