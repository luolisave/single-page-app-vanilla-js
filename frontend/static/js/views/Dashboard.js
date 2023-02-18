import AbstractView from "./AbstractView.js";

export default class extends AbstractView {
    constructor(params) {
        super(params);
        this.setTitle("Dashboard");
    }

    async getHtml() {
        return `
            <h1>Welcome back, Dom</h1>
            <p>
                This is a blog write in vanilla javascript single page application
            </p>
            <p>
                <a href="#/posts" data-link>View recent posts</a>.
            </p>
        `;
    }
}