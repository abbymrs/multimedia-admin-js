function loadComponent(url) {
  return fetch(url)
    .then(response => {
      return response.text();
    })
    .then(html => {
      const parser = new DOMParser(); // 1
      const doc = parser.parseFromString(html, "text/html"); // 2
      const head = doc.head;
      const dom = head.querySelector("template").content;
      return dom;
    });
}

function showModal({ headerName, template, onConfirm, onCancel, onOpen, onClose }) {
  loadComponent("/src/templates/modal.html").then(dom => {
    const modal = dom;
    const mask = modal.querySelector(".mask");
    const confirm = modal.querySelector(".confirm");
    const cancel = modal.querySelector(".cancel");
    const closeBtn = modal.querySelector(".close-icon");
    const modalContainer = document.createElement("div");
    const modalHeader = modal.querySelector(".modal-header");
    modalHeader.innerHTML = headerName;

    modalContainer.classList.add("modal-wrapper");
    modalContainer.appendChild(modal);
    document.body.appendChild(modalContainer);

    onConfirm = typeof onConfirm === "function" ? onConfirm : function () { };
    onCancel = typeof onCancel === "function" ? onCancel : function () { };
    onClose = typeof onClose === "function" ? onClose : function () { };
    onClose = typeof onClose === "function" ? onClose : function () { };
    onOpen = typeof onOpen === "function" ? onOpen : function () { };

    mask.addEventListener(
      "click",
      function (e) {
        destroyPopup(modalContainer, modal);
        onCancel();
        onClose();
      }
      // destroyPopup.bind(event, modalContainer, modal);
    );

    cancel.addEventListener("click", function (e) {
      destroyPopup(modalContainer, modal);
      onCancel();
      onClose();
    });
    closeBtn.addEventListener("click", function (e) {
      destroyPopup(modalContainer, modal);
      onCancel();
      onClose();
    });
    confirm.addEventListener("click", function (e) {
      // destroyPopup(modalContainer, modal);
      onConfirm();
      onClose();
    });

    loadModalContent(template, onOpen);
  });
}

function showNotification(message = "update successfully~", delayTime = 2000) {
  loadComponent("/src/templates/notification.html").then(dom => {
    const notification = dom;
    const closeBtn = notification.querySelector(".close-btn");
    const template = notification.querySelector(".message");
    const notificationContainer = document.createElement("div");
    let timer = null;

    console.log(message);

    template.innerHTML = message;
    notificationContainer.classList.add("notification-wrapper");
    notificationContainer.appendChild(notification);
    document.body.appendChild(notificationContainer);

    closeBtn.addEventListener("click", function (e) {
      destroyPopup(notificationContainer, notification);
      if (timer) clearTimeout(timer);
      console.log("notification destroyed");
    });

    timer = setTimeout(_ => {
      destroyPopup(notificationContainer, notification);
    }, delayTime);
  });
}

function destroyPopup(container, modal) {
  container.remove(modal);
}

function destoyModal() {
  const modalContainer = document.querySelector(".modal-wrapper");
  const modal = document.querySelector(".modal");
  destroyPopup(modalContainer, modal);
}

function findAncestor(target, targetClassName) {
  while (
    (target = target.parentElement) &&
    !target.classList.contains(targetClassName)
  );
  return target;
}

function toggleSpinner(isLoading = true) {
  const spinner = document.querySelector("app-spinner");
  isLoading
    ? (spinner.style.display = "block")
    : (spinner.style.display = "none");
}

function watchObject(obj, key, onChange) {
  let _val = obj[key];
  Object.defineProperty(obj, key, {
    get() {
      onChange(_val);
      return _val;
    },
    set(newVal) {
      if (_val !== newVal) {
        _val = newVal;
        onChange(newVal);
      }
    },
    enumerable: true,
    configurable: true
  });
}

function ArrayObserver(a) {
  var _this = this;
  this.observers = [];
  console.log(this.observers);

  this.observe = function (notifyCallback) {
    _this.observers.push(notifyCallback);
  }

  a.push = function (obj) {
    var push = Array.prototype.push.apply(a, arguments);
    for (var i = 0; i < _this.observers.length; i++) _this.observers[i](obj);
    return push;
  }

  a.pop = function () {
    var popped = Array.prototype.pop.apply(a, arguments);
    for (var i = 0; i < _this.observers.length; i++) _this.observers[i](popped);
    return popped;
  }

  a.reverse = function () {
    var result = Array.prototype.reverse.apply(a, arguments);
    for (var i = 0; i < _this.observers.length; i++) _this.observers[i](result);
    return result;
  };

  a.shift = function () {
    var deleted_item = Array.prototype.shift.apply(a, arguments);
    for (var i = 0; i < _this.observers.length; i++) _this.observers[i](deleted_item);
    return deleted_item;
  };

  a.sort = function () {
    var result = Array.prototype.sort.apply(a, arguments);
    for (var i = 0; i < _this.observers.length; i++) _this.observers[i](result);
    return result;
  };

  a.splice = function (i, length, itemsToInsert) {
    var returnObj
    if (itemsToInsert) {
      Array.prototype.slice.call(arguments, 2);
      returnObj = itemsToInsert;
    } else {
      returnObj = Array.prototype.splice.apply(a, arguments);
    }
    for (var i = 0; i < _this.observers.length; i++) _this.observers[i](returnObj, 'isDelete');
    return returnObj;
  };

  a.unshift = function () {
    Array.prototype.unshift.apply(a, arguments);
    for (var i = 0; i < _this.observers.length; i++) {
      _this.observers[i](arguments[0]);
    }
    return arguments;
  };

}

function formatClassName(className) {
  const classNameArr = className.split('-');
  const secondSection = classNameArr[1] ? classNameArr[1] : '';
  return classNameArr[0] + secondSection.charAt(0).toUpperCase() + secondSection.slice(1);
}

function updatePagination(dataTotalSize) {
  // update pagination total pages
  let paginationEl = document.querySelector("app-pagination");
  paginationDom = paginationEl.shadowRoot.querySelector("#pagination");

  let currentSelectedPage =
    +sessionStorage.getItem("curPage") || 1;
  const totalPages = Math.ceil(dataTotalSize / itemNumPerPage);

  if (totalPages <= 1) {
    paginationEl.style.display = 'none';
  } else {
    paginationEl.style.display = 'block';
  }
  window.pagination.Update(paginationDom, {
    size: totalPages,
    page: currentSelectedPage
  });

  // munually update current page data
  const currentPageDom = paginationDom.querySelector(
    ".current"
  );
  const prevBtn = paginationDom.querySelector(".prev");
  if (currentPageDom) {
    currentPageDom.click();
  } else {
    prevBtn.click();
  }
}

function isObject(input) {
  return Object.prototype.toString.call(input) === '[object Object]';
}

function isObjectEqual(o1, o2) {
  for (var p in o1) {
    if (o1.hasOwnProperty(p)) {
      if (o1[p] !== o2[p]) {
        return false;
      }
    }
  }
  for (var p in o2) {
    if (o2.hasOwnProperty(p)) {
      if (o1[p] !== o2[p]) {
        return false;
      }
    }
  }
  return true;
}