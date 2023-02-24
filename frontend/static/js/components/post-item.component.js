export class PostItemComponent extends HTMLElement {
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
}
