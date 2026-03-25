export class ButtonComponent {
    constructor(parent) {
        this.parent = parent;
    }

    getHTML(text, id, class_name = "btn btn-danger pm-btn w-100") {
        return `
            <button class="${class_name}" id="${id}">
                ${text}
            </button>
        `;
    }

    render(text, id, listener, class_name) {
        this.parent.insertAdjacentHTML("beforeend", this.getHTML(text, id, class_name));
        document.getElementById(id).addEventListener("click", listener);
    }
}