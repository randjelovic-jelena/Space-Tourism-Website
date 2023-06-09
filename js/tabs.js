"use strict";

/*----------------------------
------------TABS--------------
-----------------------------*/
const tabList = document.querySelector('[role="tablist"]');
const tabs = tabList.querySelectorAll('[role="tab"]');
let tabFocus = 0;

const changeFocus = (e) => {
  const pressed = e.key;

  const keyDownLeft = "ArrowLeft";
  const keyDownRight = "ArrowRight";

  if (pressed === keyDownLeft || pressed === keyDownRight) {
    tabs[tabFocus].setAttribute("tabindex", -1);

    if (pressed === keyDownRight) {
      tabFocus++;
      if (tabFocus >= tabs.length) {
        tabFocus = 0;
      }
    } else {
      tabFocus--;
      if (tabFocus < 0) {
        tabFocus = tabs.length - 1;
      }
    }
  }
  tabs[tabFocus].setAttribute("tabindex", 0);
  tabs[tabFocus].focus();
  console.log(tabs[tabFocus].id);
};

const changeTabPanel = (e) => {
  const targetTab = e.target;
  const targetPanel = targetTab.getAttribute("aria-controls");
  const tabContainer = targetTab.parentNode;
  const mainContainer = tabContainer.parentNode;
  const targetImage = targetTab.getAttribute("data-image");

  tabContainer
    .querySelector('[aria-selected="true"]')
    .setAttribute("aria-selected", false);
  targetTab.setAttribute("aria-selected", true);
  hideContent(mainContainer, '[role="tabpanel"]');
  showContent(mainContainer, [`#${targetPanel}`]);
  hideContent(mainContainer, "picture");
  showContent(mainContainer, [`#${targetImage}`]);
};

const hideContent = (parent, content) => {
  parent.querySelectorAll(content).forEach((item) => {
    item.setAttribute("hidden", true);
  });
};
const showContent = (parent, content) => {
  parent.querySelector(content).removeAttribute("hidden");
};

tabList.addEventListener("keydown", changeFocus);

tabs.forEach((tab) => {
  tab.addEventListener("click", changeTabPanel);
});
