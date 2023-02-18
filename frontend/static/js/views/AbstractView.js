export default class {
    constructor(params) {
        this.params = params;
    }

    setTitle(title) {
        document.title = title;
    }

    async apiGet(url) {
        return await fetch(url)
                .then((response) => response.json())
                .then((data) => {
                    // console.log(data);
                    return data;
                });
    }

    async getHtml() {
        return "";
    }
}