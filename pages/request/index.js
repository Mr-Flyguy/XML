import { RequestComponent } from "../../components/request/index.js";
import { BackButtonComponent } from "../../components/back-button/index.js";
import { MainPage } from "../main/index.js";
import { requests } from "../../data/requests.js";

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
        return requests.find((request) => request.id === this.id);
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