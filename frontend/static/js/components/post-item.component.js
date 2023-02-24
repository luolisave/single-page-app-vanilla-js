const postItemTemplate = document.createElement("template");
postItemTemplate.innerHTML = `
    <style>
        .post-row {
            display: flex;
            flex-direction: row;
            height: 3rem;
            border-bottom: 1px solid rgb(216, 216, 216);
            vertical-align: center;
        }
        
        .post-title {
            padding-top: 0.5rem;
            width: 80%;
            overflow: hidden;
            white-space: nowrap;
        }
        
        .post-actions {
            padding-top: 0.65rem;
            width: 20%;
            text-align: right;
        }

        button.btn {
            font-size: 16px;
            border: none;
            border-radius: 5px;
            
            cursor: pointer;
            box-shadow: 0px 2px 5px rgba(0,0,0,0.2);
            transition: all 0.3s ease;
        }

        button.btn-red {
            background-color: #be3030;
            color: #fff;
        }
          
        button.btn-red:hover {
            background-color: #f30303;
            box-shadow: 0px 4px 8px rgba(0,0,0,0.2);
        }
    </style>
    <div class="post-row">
        <div class="post-title">
            <a id="post-title-link" ><slot></slot></a>
        </div>
        <div class="post-actions">
            <button id="delete-post-btn" class="btn btn-red btn-medium">Del</button>
        </div>
    </div>
`;

export class PostItemComponent extends HTMLElement {
    shadow;
    key = null;
    constructor(){
        super();
        const shadow = this.attachShadow({mode:"open"});
        this.shadow = shadow;
        shadow.append(postItemTemplate.content.cloneNode(true));

        const delButton = shadow.querySelector('#delete-post-btn');
        delButton.addEventListener('click', () => {
            $scope.deletePost(this.key); // TODO: pass in delete function maybe a better idea.
        });
    }

    /**
     * when component created
     */
    connectedCallback() {
        
    }

    /*
    connectedCallback() {
        const button = document.createElement('button');
        button.textContent = 'Test: Click me!';
        button.addEventListener('click', () => {
        const clickFunction = this.getAttribute('my-click');
        if (clickFunction) {
            eval(clickFunction);
        }
        });
        this.appendChild(button);
    }
    //*/


    /**
     * regiester attributes to watch them
     */
    static get observedAttributes() {
        return ["key"];
    }

    /**
     * watch attribute changes
     */
    attributeChangedCallback(name, oldValue, newValue) {
        if (name === 'key') {
            this.key = newValue;

            const postTitleLink = this.shadow.querySelector('#post-title-link');
            postTitleLink.setAttribute('href', `#/posts/${this.key}`);
        }
    }
}
