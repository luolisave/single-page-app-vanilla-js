import AbstractView from "./AbstractView.js";

export default class extends AbstractView {
    constructor(params) {
        super(params);
        this.setTitle("Page Not Found");
    }

    async getHtml() {
        return `
            <h1 style="color:red;">Page Not Found</h1>
            <p style="color:red;">Please use valid route.</p>
        `;
    }
}
