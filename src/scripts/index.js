const menuList = document.querySelector(".menu-list");
const pageTitle = document.querySelector(".page-title");
const activeCalls = 0;

const toggleBtn = document.querySelector(".toggle-menu-btn > i");

// watch
watchObject(window, "activeCalls", function (val) {
  if (val !== 0) {
    toggleSpinner();
  } else {
    toggleSpinner(false);
  }
});

menuList.addEventListener("click", function (e) {
  const target = e.target;
  if (target.tagName === "LI") {
    const url = target.getAttribute("data-url");
    location.hash = url;
    pageTitle.innerHTML =
      target.querySelector("span").innerHTML + " Management";

    Array.from(this.children).forEach(item =>
      item.classList.remove("menu--active")
    );
    target.classList.add("menu--active");
  }
});

let count = 0;
toggleBtn.addEventListener("click", function () {
  count++;
  const sideMenu = document.querySelector(".side-menu");
  const mainContent = document.querySelector(".route-container");
  const menuItems = sideMenu.querySelectorAll(".menu-list span");
  if (count % 2 === 0) {
    sideMenu.setAttribute("class", "side-menu expanded-side-menu");
    mainContent.setAttribute("class", "route-container collapsed-main-content");
    for (let i = 0; i < menuItems.length; i++) {
      menuItems[i].style.display = "inline-block";
    }
  } else {
    sideMenu.setAttribute("class", "side-menu collapsed-side-menu");
    mainContent.setAttribute("class", "route-container expanded-main-content");
    for (let i = 0; i < menuItems.length; i++) {
      menuItems[i].style.display = "none";
    }
  }
});

// remove current selected page of pagination
sessionStorage.removeItem("curPage");
