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
        console.log('posts = ', posts);
        posts.forEach(post => {
            postsDiv += `
                <post-item 
                    key="${post.key}"
                >
                    ${post.data.title}
                </post-item>
            `;
            // postsDiv += `
            //     <div class="post-row">
            //         <div class="post-title">
            //             <a href="#/posts/${post.key}">${post.data.title}
            //         </div>
            //         <div class="post-actions">
            //             <button onclick="$scope.deletePost('${post.key}')" class="btn btn-red btn-medium">Del</button>
            //         </div>
            //     </div>
            // `;
        });
        return `${postsDiv}`;
    }

    async getHtml() {
        return `
            <h2>
                <span>Posts</span>
                <a class="create-new-post-link" href="#/posts/__POST__${generateRandomString(16)}">New Post</a>
            </h2>
            <div class="post-list">
                ${await this.renderPosts()}
            </div>
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