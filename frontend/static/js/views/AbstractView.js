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

    async apiPost(url, data){
        console.log('data', data);
        let options = {
            method: "POST",
            headers: {
                "Content-Type":"application/json",
            },
            body: JSON.stringify(data)      
        }
        let p = await fetch(url, options);
        let response = await p.json();
        return response;
    }

    async apiDelete(url) {
        let options = {
            method: "DELETE"     
        }
        let p = await fetch(url, options);
        let response = await p.json();
        return response;
    }

    async getHtml() {
        return "";
    }
}