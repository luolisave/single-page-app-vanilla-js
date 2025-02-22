import AbstractView from "./AbstractView.js";
import { truncateString, generateRandomString } from "../utils/string.util.js";
import { createFloatNotice } from "../utils/float-notice.js";

export default class extends AbstractView {
    constructor(params) {
        super(params);
        this.setTitle("Posts");
    }

    async renderPosts() {
        let postsDiv = ``;
        let posts = await this.apiGet('posts');
        // console.log('posts = ', posts);
        posts.forEach(post => {
            postsDiv += `
                <post-item 
                    key="${post.key}"
                    delete-post-func="$scope.deletePost('${post.key}')"
                >
                    ${post.data.title}
                </post-item>
            `;
        });
        return `${postsDiv}`;
    }

    async getHtml() {
        return `
            <h2>
                <span>Posts</span>
                <a class="create-new-post-link" href="#/posts/__POST__${generateRandomString(16)}">New Post</a>
            </h2>
            <post-list>
                ${await this.renderPosts()}
            </post-list>
        `;
    }

    async deletePost(key) {
        let okay = confirm('Delete post: '+key);
        if (okay) {
            const rs = await this.apiDelete(`post?key=${key}`);
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