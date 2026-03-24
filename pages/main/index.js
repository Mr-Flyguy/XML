import { RequestCardComponent } from "../../components/request-card/index.js";
import { RequestPage } from "../request/index.js";
import { requests } from "../../data/requests.js";

export class MainPage {
    constructor(parent) {
        this.parent = parent;
    }

    get requestListRoot() {
        return document.getElementById("request-list");
    }

    getHTML() {
        return `
            <div id="main-page" class="app-container">
                <div class="hero-block">
                    <div class="d-flex justify-content-between align-items-center flex-wrap gap-3">
                        <div>
                            <h1 class="hero-title">Система заявок на вычисления</h1>
                            <p class="hero-text">
                                Просмотр заявок на факториал, НОД, степень и другие вычисления
                            </p>
                        </div>

                        <div class="request-counter">
                            ${requests.length} заявки
                        </div>
                    </div>
                </div>

                <div id="request-list" class="row row-cols-1 row-cols-md-2 g-4"></div>
            </div>
        `;
    }

    clickCard(event) {
        const requestId = event.target.dataset.id;
        const requestPage = new RequestPage(this.parent, requestId);
        requestPage.render();
    }

    render() {
        this.parent.innerHTML = "";
        this.parent.insertAdjacentHTML("beforeend", this.getHTML());

        requests.forEach((requestData) => {
            const requestCard = new RequestCardComponent(this.requestListRoot);
            requestCard.render(requestData, this.clickCard.bind(this));
        });
    }
}