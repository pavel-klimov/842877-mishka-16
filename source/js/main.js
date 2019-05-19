"use strict";

// Menu
(function() {
  var MENU_NO_JS_CLASS = "header__menu--no-js";
  var MENU_BUTTON_NO_JS_CLASS = "header__menu-button--no-js";
  var MENU_OPEN_CLASS = "header__menu--open";
  var MENU_OPEN_BUTTON_CLASS = "header__menu-button--open";
  var menuElement = document.querySelector("." + MENU_NO_JS_CLASS);
  menuElement.classList.remove(MENU_NO_JS_CLASS);
  var menuButtonElement = document.querySelector("." + MENU_BUTTON_NO_JS_CLASS);
  menuButtonElement.classList.remove(MENU_BUTTON_NO_JS_CLASS);
  menuButtonElement.addEventListener("click", function() {
    menuElement.classList.toggle(MENU_OPEN_CLASS);
    menuButtonElement.classList.toggle(MENU_OPEN_BUTTON_CLASS);
  });
})();

// Modal
(function() {
  var MODAL_CLASS = "modal";
  var MODAL_HIDDEN_CLASS = "modal--hidden";
  var BINDING_CLASS = "js-modal";
  var ESC_KEYCODE = 27;

  var modal = document.querySelector("." + MODAL_CLASS);
  var actionButtons = document.querySelectorAll("." + BINDING_CLASS);

  var lastActionElement;

  var onModalOpenEscButtonPress = function (evt) {
    if (evt.keyCode === ESC_KEYCODE) {
      closeModal();
    }
  };

  var openModal = function() {
    modal.classList.remove(MODAL_HIDDEN_CLASS);
    modal.focus();
    window.addEventListener("keydown", onModalOpenEscButtonPress);
  };

  var closeModal = function() {
    modal.classList.add(MODAL_HIDDEN_CLASS);
    document.removeEventListener("keydown", onModalOpenEscButtonPress);
    if (lastActionElement) {
      lastActionElement.focus();
    }
  }

  var onActionClick = function(evt) {
    evt.preventDefault();
    lastActionElement = evt.target;
    openModal();
  }

  if (actionButtons && modal) {
    modal.querySelector("form").addEventListener("submit", function(evt) {
      evt.preventDefault();
      closeModal();
    });

    modal.addEventListener("click", function(evt) {
      if (evt.target === modal) {
        closeModal();
      }
    });

    actionButtons = [].slice.call(actionButtons);
    actionButtons.forEach(function(item) {
      item.addEventListener("click", onActionClick);
    });
  }
})();
