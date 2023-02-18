import AbstractView from "./AbstractView.js";
import { truncateString } from "../utils/string.util.js";

export default class extends AbstractView {
    post = {};
    constructor(params) {
        super(params);
        this.postId = params.id;
        this.setTitle("Viewing Post");
    }

    async getPost(key) {
        let rs = await this.apiGet('/post?key='+key);
        return rs.data;
    }

    async getHtml() {
        if(this.postId && this.postId !== '') {
            this.post = await this.getPost(this.postId);
        }
        return `
            <h1>
                <span>${this.post.title ? this.post.title: ''}</span>
                <button class="btn btn-green btn-large save-post-button " onclick="$scope.save()">Save</button>
            </h1>
            <div>
                <input type="text" id="postTitle" value="${this.post.title ? this.post.title: ''}" />
            </div>
            <div style="padding-top: 8px">
                <textarea id="postContent" class="content-textarea">${this.post.content}</textarea>
            </div>
        `;
    }

    async save() {
        let text = document.getElementById('postContent').value;
        const rs = await this.apiPost(`/post?key=${this.postId}`, {
            title: this.post.title ? this.post.title : '',
            content: text
        });
        if(rs && rs.status) {
            createFloatNotice('Save Success.');
        } else {
            alert('save failed!');
        }
    }
}
