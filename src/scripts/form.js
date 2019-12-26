function handleErrorInputStatus(
  container,
  containerClassName,
  span,
  msg
  // errorMsg
) {
  container.setAttribute("class", `${containerClassName} error-border`);
  span.setAttribute("class", "universal-label small-label error-color");
  msg.setAttribute("class", "error-msg dis-show");
  // msg.innerHTML = errorMsg;
}

function handleRightInputStatus(container, containerClassName, span, msg) {
  container.setAttribute("class", `${containerClassName}`);
  span.setAttribute("class", "universal-label small-label normal-color");
  msg && msg.setAttribute("class", "error-msg dis-hide");
}

function handleDefaultInputStatus(container, containerClassName, span) {
  container.setAttribute("class", `${containerClassName}`);
  span.setAttribute("class", "universal-label big-label normal-color");
}

function handleNormalFormItem(
  containers,
  spans,
  formItems,
  containerClassName
) {
  for (let i = 0; i < spans.length; i++) {
    formItems[i].addEventListener("focus", function () {
      spans[i].setAttribute("class", "universal-label small-label focus-color");
      containers[i].setAttribute("class", `${containerClassName} focus-border`);
    });
    formItems[i].addEventListener("blur", function (e) {
      if (!e.target.value.trim()) {
        handleDefaultInputStatus(containers[i], containerClassName, spans[i]);
      } else {
        handleRightInputStatus(containers[i], containerClassName, spans[i]);
      }
    });
  }
}

function handleInput(containers, spans, inputs) {
  const inputContainers = containers || document.querySelectorAll(".input-container");
  const inputSpans = spans || document.querySelectorAll(".input-container > span");
  const formInputs = inputs || document.querySelectorAll(
    ".input-container > .form-input"
  );
  handleNormalFormItem(
    inputContainers,
    inputSpans,
    formInputs,
    "input-container"
  );
}

function handleTextarea() {
  const textareaContainers = document.querySelectorAll(".textarea-container");
  const inputSpans = document.querySelectorAll(".textarea-container > span");
  const formTextareas = document.querySelectorAll(
    ".textarea-container > .form-textarea"
  );
  handleNormalFormItem(
    textareaContainers,
    inputSpans,
    formTextareas,
    "textarea-container"
  );
}

function handleSelect(selectContainer, optionsData) {
  const selectSpan = selectContainer.querySelector(".universal-label");
  const selectPanel = selectContainer.querySelector(".select-panel");
  const selectContent = selectContainer.querySelector(".select-content");
  let count = 0;
  selectContainer.addEventListener("click", function () {
    count++;
    if (count % 2 !== 0) {
      addSelectOptions(optionsData, selectPanel, selectContent);
      openOptions(selectContainer, selectSpan, selectPanel);
    } else {
      closeOptions(selectContainer, selectSpan, selectContent, selectPanel);
    }
  });

  selectPanel.addEventListener("click", function (e) {
    e.preventDefault();
    selectContent.innerHTML = e.target.innerHTML;
    selectContent.setAttribute(
      "data-real-value",
      e.target.dataset["realValue"]
    );
    closeOptions(selectContainer, selectSpan, selectContent, selectPanel);
  });
}

function addSelectOptions(optionsData, selectPanelDom, selectContent) {
  const frag = document.createRange();
  let options = "";
  for (let i = 0; i < optionsData.length; i++) {
    const selectValue = selectContent.getAttribute("data-real-value");
    const activeClass =
      selectValue && selectValue.toString() === optionsData[i].id.toString()
        ? "active-option"
        : "";
    options += `
      <li><a data-real-value=${optionsData[i].id} href="" class=${activeClass}>${optionsData[i].value}</a></li>
    `;
  }
  const optionsFragment = frag.createContextualFragment(options);
  selectPanelDom.appendChild(optionsFragment);
}

function openOptions(selectContainer, selectSpan, selectPanel) {
  selectContainer.setAttribute("class", "select-container focus-border");
  selectSpan.setAttribute("class", "universal-label small-label focus-color");
  selectPanel.setAttribute("class", "select-panel dis-show focus-border");
}

function closeOptions(selectContainer, selectSpan, selectContent, selectPanel) {
  selectPanel.innerHTML = "";
  selectPanel.setAttribute("class", "select-panel dis-hide");
  if (!selectContent.innerHTML.trim()) {
    selectSpan.setAttribute("class", "universal-label big-label normal-color");
    selectContainer.setAttribute("class", "select-container");
  } else {
    selectSpan.setAttribute(
      "class",
      "universal-label small-label normal-color"
    );
    selectContainer.setAttribute("class", "select-container");
  }
}
