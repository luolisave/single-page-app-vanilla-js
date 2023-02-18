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
        if (rs && rs.status) {
            return rs.data;
        } else {
            createFloatNotice(`Load Post failed, ${rs.info}`, false);
        }
    }

    async getHtml() {
        if(this.postId && this.postId !== '') {
            this.post = await this.getPost(this.postId);
            console.log('this.post =', this.post);
        }
        return `
            <h3>
                <span>${this.postId ? this.postId: ''}</span>
                <button class="btn btn-green btn-large save-post-button " onclick="$scope.save()">Save</button>
            </h3>
            <div>
                <input type="text" id="postTitle" value="${(this.post && this.post.title) ? this.post.title: ''}" />
            </div>
            <div style="padding-top: 8px">
                <textarea id="postContent" class="content-textarea">${this.post ? this.post.content : ''}</textarea>
            </div>
        `;
    }

    async save() {
        let title = document.getElementById('postTitle').value;
        let text = document.getElementById('postContent').value;
        const rs = await this.apiPost(`/post?key=${this.postId}`, {
            title: title ? title : '',
            content: text
        });
        if(rs && rs.status) {
            createFloatNotice('Save Success.');
        } else {
            alert('save failed!');
        }
    }
}
