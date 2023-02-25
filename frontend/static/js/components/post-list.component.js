const postListTemplate = document.createElement("template");
postListTemplate.innerHTML = `
    <style>
        
    </style>
    <div class="post-list">
        <slot></slot>
    </div>
`;

export class PostListComponent extends HTMLElement {
    shadow;
    key = null;
    constructor(){
        super();
        const shadow = this.attachShadow({mode:"open"});
        this.shadow = shadow;
        shadow.append(postListTemplate.content.cloneNode(true));

        
    }

    /**
     * when component created
     */
    connectedCallback() {
        
    }

    /**
     * regiester attributes to watch them
     */
    static get observedAttributes() {

    }

    /**
     * watch attribute changes
     */
    attributeChangedCallback(name, oldValue, newValue) {
        
    }
}
