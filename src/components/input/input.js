class InputElement extends HTMLElement {
    constructor() {
        super();
        loadComponent('src/components/input/input.html').then(dom => {
            const shadowRoot = this.attachShadow({ mode: "open" }).appendChild(
                dom.cloneNode(true)
            );
        });
    }
}
customElements.define("my-input", InputElement);