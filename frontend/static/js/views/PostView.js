import AbstractView from "./AbstractView.js";
import { truncateString } from "../utils/string.util.js";

export default class extends AbstractView {
    constructor(params) {
        super(params);
        this.postId = params.id;
        this.setTitle("Viewing Post");
    }

    async renderPost(key) {
        let posts = await this.apiGet('/posts/'+key);
    }

    async getHtml() {
        return `
            <h1>Post</h1>
            <p>You are viewing post KEY = "${this.postId}".</p>
        `;
    }
}
