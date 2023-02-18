import AbstractView from "./AbstractView.js";

export default class extends AbstractView {
    constructor(params) {
        super(params);
        this.setTitle("Settings");
    }

    testClick() {
        alert('you clicked me!!!');
    }

    async getHtml() {
        return `
            <h1>Settings</h1>
            <p>Manage your privacy and configuration.</p>
            <p>
                <a href="/post/aaa" data-link>test: Error 404 route</a>
            </p>
            <p>
                <a href="javascript:void(0);" onclick="$scope.testClick(event);">test: click</a>
            </p>
        `;
    }
}