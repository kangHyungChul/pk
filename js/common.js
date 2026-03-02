/**
 * 공통 모달: 닫기( data-modal-close ), 열기( data-modal-open="모달id" )
 */
(function () {
  'use strict';

  function closeModal(modal) {
    if (modal) modal.hidden = true;
  }

  function openModal(modal) {
    if (modal) modal.hidden = false;
  }

  document.addEventListener('click', function (e) {
    var closeBtn = e.target.closest('[data-modal-close]');
    if (closeBtn) {
      var modal = closeBtn.closest('.modal');
      closeModal(modal);
      return;
    }
    var openBtn = e.target.closest('[data-modal-open]');
    if (openBtn) {
      var id = openBtn.getAttribute('data-modal-open');
      var target = id ? document.getElementById(id) : null;
      openModal(target);
    }
  });
})();
