import AbstractView from "./AbstractView.js";
import { truncateString } from "../utils/string.util.js";

export default class extends AbstractView {
    constructor(params) {
        super(params);
        this.setTitle("Posts");
    }

    async renderPosts() {
        let postsDiv = ``;
        let posts = await this.apiGet('/posts');
        console.log('posts = ', posts);
        posts.forEach(post => {
            let rowSummary = ``;
            if (post.data.title) {
                rowSummary = `${post.data.title}`
            } else if(post.data.url) {
                rowSummary = `<a target="_blank" href="${post.data.url}">${post.data.url}</a>`
            } else {
                rowSummary = `<a href="#/posts/${post.key}">${truncateString(post.data.content, 50)}</a>`
            }
            postsDiv += `
                <div class="post-row">
                    <div class="post-title">
                        ${rowSummary}
                    </div>
                    <div class="post-actions">
                        <button style="color:red;">Del (TODO)</button>
                    </div>
                </div>
            `;
        });
        return `${postsDiv}`;
    }

    async getHtml() {
        
        return `
            <h1>Posts</h1>
            <div class="post-list">
                ${await this.renderPosts()}
            </div>
        `;
    }
}