class SearchGroupElement extends HTMLElement {
    constructor() {
        super();
        loadComponent('src/components/search-group/search-group.html').then(dom => {
            const shadowRoot = this.attachShadow({ mode: "open" }).appendChild(
                dom.cloneNode(true)
            );
        });
    }
}
customElements.define("search-group", SearchGroupElement);