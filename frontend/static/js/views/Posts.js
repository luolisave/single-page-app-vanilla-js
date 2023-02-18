import AbstractView from "./AbstractView.js";

export default class extends AbstractView {
    constructor(params) {
        super(params);
        this.setTitle("Posts");
    }

    async getHtml() {
        return `
            <h1>Posts</h1>
            <p>You are viewing the posts!</p>
            <p>
                <a href="/post/aaa" data-link>Post aaa</a>
            </p>
        `;
    }
}