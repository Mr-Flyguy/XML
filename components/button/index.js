export class ButtonComponent {
    constructor(parent) {
        this.parent = parent;
    }

    getHTML(text, id) {
        return `
            <button class="btn btn-danger pm-btn w-100" id="${id}">
                ${text}
            </button>
        `;
    }

    render(text, id, listener) {
        this.parent.insertAdjacentHTML("beforeend", this.getHTML(text, id));
        document.getElementById(id).addEventListener("click", listener);
    }
}