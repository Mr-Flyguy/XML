export class BackButtonComponent {
    constructor(parent) {
        this.parent = parent;
    }

    render(listener) {
        this.parent.insertAdjacentHTML(
            "beforeend",
            `
                <button class="btn btn-outline-secondary pm-btn-outline mb-4" id="back-button">
                    ← Назад
                </button>
            `
        );

        document.getElementById("back-button").addEventListener("click", listener);
    }
}