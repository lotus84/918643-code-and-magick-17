'use strict';

(function () {
  var ESC_KEYCODE = 27;
  var ENTER_KEYCODE = 13;
  var SETUP_LEFT = '50%';
  var setupOpen = document.querySelector('.setup-open');
  var setupClose = window.util.setup.querySelector('.setup-close');
  var userNameInput = window.util.setup.querySelector('.setup-user-name');
  var setupCoords;
  var onPopupEscPress = function (evt) {
    if (evt.keyCode === ESC_KEYCODE) {
      if (userNameInput !== document.activeElement) {
        closePopup();
        window.util.setup.style.top = setupCoords.top + 'px';
        window.util.setup.style.left = setupCoords.left;
      }
    }
  };

  var openPopup = function () {
    window.util.setup.classList.remove('hidden');
    document.addEventListener('keydown', onPopupEscPress);
  };
  var closePopup = function () {
    window.util.setup.classList.add('hidden');
    document.removeEventListener('keydown', onPopupEscPress);
  };

  setupOpen.addEventListener('click', function () {
    openPopup();
    setupCoords = {
      left: SETUP_LEFT,
      top: window.util.setup.getBoundingClientRect().top
    };
  });

  setupOpen.addEventListener('keydown', function (evt) {
    if (evt.keyCode === ENTER_KEYCODE) {
      openPopup();
      setupCoords = {
        left: SETUP_LEFT,
        top: window.util.setup.getBoundingClientRect().top
      };
    }
  });

  setupClose.addEventListener('click', function () {
    closePopup();
    window.util.setup.style.top = setupCoords.top + 'px';
    window.util.setup.style.left = setupCoords.left;
  });

  setupClose.addEventListener('keydown', function (evt) {
    if (evt.keyCode === ENTER_KEYCODE) {
      closePopup();
      window.util.setup.style.top = setupCoords.top + 'px';
      window.util.setup.style.left = setupCoords.left;
    }
  });

  var form = window.util.setup.querySelector('.setup-wizard-form');

  var onSuccessLoad = function () {
    closePopup();
  };

  form.addEventListener('submit', function (evt) {
    window.backend.save(new FormData(form), onSuccessLoad, window.util.onErrorLoad);
    evt.preventDefault();
  });

  var dialogHandle = window.util.setup.querySelector('.upload');

  dialogHandle.addEventListener('mousedown', function (evt) {
    evt.preventDefault();

    var startCoords = {
      x: evt.clientX,
      y: evt.clientY
    };

    var dragged = false;

    var onMouseMove = function (moveEvt) {
      moveEvt.preventDefault();
      dragged = true;

      var shift = {
        x: startCoords.x - moveEvt.clientX,
        y: startCoords.y - moveEvt.clientY
      };

      startCoords = {
        x: moveEvt.clientX,
        y: moveEvt.clientY
      };

      window.util.setup.style.top = (window.util.setup.offsetTop - shift.y) + 'px';
      window.util.setup.style.left = (window.util.setup.offsetLeft - shift.x) + 'px';
    };

    var onMouseUp = function (upEvt) {
      upEvt.preventDefault();

      document.removeEventListener('mousemove', onMouseMove);
      document.removeEventListener('mouseup', onMouseUp);

      if (dragged) {
        var onClickPreventDefault = function (clickEvt) {
          clickEvt.preventDefault();
          dialogHandle.removeEventListener('click', onClickPreventDefault);
        };
        dialogHandle.addEventListener('click', onClickPreventDefault);
      }
    };

    document.addEventListener('mousemove', onMouseMove);
    document.addEventListener('mouseup', onMouseUp);
  });
})();
