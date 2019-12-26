class PaginationElement extends HTMLElement {
    constructor() {
        super();

        // Get template content from DOM
        loadComponent('src/components/pagination/pagination.html').then(dom => {
            const shadowRoot = this.attachShadow({ mode: "open" }).appendChild(
                dom.cloneNode(true)
            );
        });
    }
}
customElements.define("app-pagination", PaginationElement);