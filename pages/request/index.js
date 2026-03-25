import { RequestComponent } from "../../components/request/index.js";
import { BackButtonComponent } from "../../components/back-button/index.js";
import { MainPage } from "../main/index.js";
import { requests } from "../../data/requests.js";
import { solve, sumOfSquares } from "../../utils/calculations.js";

export class RequestPage {
    constructor(parent, id) {
        this.parent = parent;
        this.id = Number(id);
    }

    get pageRoot() {
        return document.getElementById("request-page");
    }

    getHTML() {
        return `
            <div id="request-page" class="app-container"></div>
        `;
    }

    getData() {
        const request = requests.find((item) => item.id === this.id);

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

    clickBack() {
        const mainPage = new MainPage(this.parent);
        mainPage.render();
    }

    render() {
        this.parent.innerHTML = "";
        this.parent.insertAdjacentHTML("beforeend", this.getHTML());

        const backButton = new BackButtonComponent(this.pageRoot);
        backButton.render(this.clickBack.bind(this));

        const requestData = this.getData();
        const requestComponent = new RequestComponent(this.pageRoot);
        requestComponent.render(requestData);
    }
}