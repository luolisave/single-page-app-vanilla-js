import AbstractView from "./AbstractView.js";
import { truncateString, generateRandomString } from "../utils/string.util.js";

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
                rowSummary = `<a href="#/posts/${post.key}">${post.data.title}</a>`
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
                        <button onclick="$scope.deletePost('${post.key}')" class="btn btn-red btn-medium">Del</button>
                    </div>
                </div>
            `;
        });
        return `${postsDiv}`;
    }

    async getHtml() {
        return `
            <h2>
                <span>Posts</span>
                <a class="create-new-post-link" href="#/posts/${generateRandomString(16)}">New Post</a>
            </h2>
            <div class="post-list">
                ${await this.renderPosts()}
            </div>
        `;
    }

    async deletePost(key) {
        let okay = confirm('Delete post: '+key);
        if (okay) {
            const rs = await this.apiDelete(`/post?key=${key}`);
            if(rs && rs.status) {
                createFloatNotice('Delete Success.');
                document.querySelector("#app").innerHTML = await this.getHtml(); // TODO: need to find a better way to refresh page.
            } else {
                alert('Delete failed!');
            }
        }
    }

    create() {
        console.log('redirect');
    }
}