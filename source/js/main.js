'use strict';

// Menu
(function() {
  var MENU_NO_JS_CLASS = 'header__menu--no-js';
  var MENU_BUTTON_NO_JS_CLASS = 'header__menu-button--no-js';
  var MENU_OPEN_CLASS = 'header__menu--open';
  var MENU_OPEN_BUTTON_CLASS = 'header__menu-button--open';
  var menuElement = document.querySelector('.' + MENU_NO_JS_CLASS);
  menuElement.classList.remove(MENU_NO_JS_CLASS);
  var menuButtonElement = document.querySelector('.' + MENU_BUTTON_NO_JS_CLASS);
  menuButtonElement.classList.remove(MENU_BUTTON_NO_JS_CLASS);
  menuButtonElement.addEventListener('click', function() {
    menuElement.classList.toggle(MENU_OPEN_CLASS);
    menuButtonElement.classList.toggle(MENU_OPEN_BUTTON_CLASS);
  });
})();

// Modal
(function() {
  var MODAL_CLASS = 'modal';
  var MODAL_HIDDEN_CLASS = 'modal--hidden';
  var BINDING_CLASS = 'js-modal';
  var ESC_KEYCODE = 27;

  var modal = document.querySelector('.' + MODAL_CLASS);
  var actionButtons = document.querySelectorAll('.' + BINDING_CLASS);

  var lastActionElement;
  var lastFocusedElement;

  // Util
  var isDescendant = function (parent, child) {
    var node = child.parentNode;
    while (node != null) {
        if (node == parent) {
            return true;
        }
        node = node.parentNode;
    }
    return false;
  }

  var onModalOpenEscButtonPress = function (evt) {
    if (evt.keyCode === ESC_KEYCODE) {
      closeModal();
    }
  };

  var onModalBlur = function(evt) {
    evt.target.removeEventListener('blur', onModalBlur);
    if (isDescendant(modal, evt.relatedTarget)) {
      lastFocusedElement = evt.relatedTarget;
      evt.relatedTarget.addEventListener('blur', onModalBlur);
    } else {
      modal.focus();
      lastFocusedElement = modal;
      modal.addEventListener('blur', onModalBlur);
    }
  }

  var openModal = function() {
    modal.classList.remove(MODAL_HIDDEN_CLASS);
    modal.focus();
    lastFocusedElement = modal;
    window.addEventListener('keydown', onModalOpenEscButtonPress);
    modal.addEventListener('blur', onModalBlur);
  };

  var closeModal = function() {
    modal.classList.add(MODAL_HIDDEN_CLASS);
    document.removeEventListener('keydown', onModalOpenEscButtonPress);
    if (lastFocusedElement) {
      lastFocusedElement.removeEventListener('blur', onModalBlur);
    }
    if (lastActionElement) {
      lastActionElement.focus();
    }
  }

  var onActionClick = function(evt) {
    lastActionElement = evt.target;
    openModal();
  }

  if (actionButtons && modal) {
    modal.querySelector('form').addEventListener('submit', function(evt) {
      evt.preventDefault();
      closeModal();
    });

    modal.addEventListener('click', function(evt) {
      if (evt.target === modal) {
        closeModal();
      }
    });

    actionButtons.forEach(function(item) {
      item.addEventListener('click', onActionClick);
    });
  }
})();
