(function() {
  // 页面加载完不会触发 hashchange，这里主动触发一次 hashchange 事件
  window.addEventListener("DOMContentLoaded", onLoad);
  // 监听路由变化
  window.addEventListener("hashchange", onHashChange);

  // 路由视图
  let routerView = null;

  function onLoad() {
    routerView = document.querySelector(".route-view");

    const menuList = document.querySelector(".menu-list");
    const pageTitle = document.querySelector(".page-title");
    const hashName = location.hash.split("/")[1];

    if (hashName) {
      const pageTitlePrefix =
        hashName.charAt(0).toUpperCase() + hashName.slice(1);
      pageTitle.innerHTML = pageTitlePrefix + " Management";
    } else {
      location.hash = "/login";
      location.reload();
      // pageTitle.innerHTML = "Tanant Management";
    }

    [...menuList.children].forEach(el => {
      const url = el.getAttribute("data-url");
      const hash = location.hash.split("#")[1];

      if (url === hash) {
        el.classList.add("menu--active");
      }
    });
    onHashChange();
  }

  // 路由变化时，根据路由渲染对应 UI
  function onHashChange() {
    routerView.innerHTML = "";
    const pageTitle = document.querySelector(".page-title");
    if (pageTitle) pageTitle.style.display = "block";

    switch (location.hash) {
      case "#/login":
        const body = document.querySelector("body");
        const container = document.querySelector(".container");

        loadComponent("/src/templates/login.html").then(dom => {
          body.replaceChild(dom, container);
        });
        break;
      case "#/tenant":
        loadComponent("/src/templates/tenant.html").then(dom => {
          routerView.appendChild(dom);
        });
        break;
      case "#/user":
        loadComponent("/src/templates/user.html").then(dom => {
          routerView.appendChild(dom);
        });
        break;
      case "#/multimedia":
        const html = `
                <div>Multimedia</div>
                <app-pagination pageTotalNum="20" selectedPage="2"></app-pagination>
            `;
        routerView.innerHTML = html;
        break;
      default:
        const menuList = document.querySelector(".menu-list");

        routerView.innerHTML =
          '<h2 class="error-page">Page cannot be found</h2>';
        pageTitle.style.display = "none";

        Array.from(menuList.children).forEach(item =>
          item.classList.remove("menu--active")
        );
        break;
    }
  }
})();
