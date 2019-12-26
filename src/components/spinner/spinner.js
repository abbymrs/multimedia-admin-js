class SpinnerElement extends HTMLElement {
    constructor() {
        super();
        loadComponent('src/components/spinner/spinner.html').then(dom => {
            const shadowRoot = this.attachShadow({ mode: "open" }).appendChild(
                dom.cloneNode(true)
            );
        });
    }
}
customElements.define("app-spinner", SpinnerElement);