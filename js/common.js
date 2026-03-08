/**
 * 공통 모달: 닫기( data-modal-close ), 열기( data-modal-open="모달id" )
 * 헤더 모바일 메뉴: matchMedia(756px) 이하에서만 햄버거·1depth 클릭 트리거 동작
 */
(function () {
  'use strict';

  function closeModal(modal) {
    if (modal) modal.hidden = true;
  }

  function openModal(modal) {
    if (modal) modal.hidden = false;
  }

  /* 모바일(756px 이하)에서만 헤더 메뉴 클릭 트리거 적용, 태블릿 이상은 제외 */
  var mobileQuery = window.matchMedia('(max-width: 756px)');

  function closeMobileNav(header) {
    if (!header) return;
    header.classList.remove('is-nav-open');
    var btn = header.querySelector('.header__btn-menu');
    if (btn) {
      btn.setAttribute('aria-expanded', 'false');
      btn.setAttribute('aria-label', '메뉴 열기');
    }
    var openItems = header.querySelectorAll('.header__nav-item.is-open');
    openItems.forEach(function (item) {
      item.classList.remove('is-open');
    });
  }

  document.addEventListener('click', function (e) {
    /* 모달: 항상 처리 */
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
      return;
    }

    /* 아래는 모바일에서만 동작 */
    if (!mobileQuery.matches) return;

    var header = document.querySelector('.header');
    if (!header) return;

    /* 햄버거 버튼 클릭: 네비 열기/닫기 토글 */
    var menuBtn = e.target.closest('.header__btn-menu');
    if (menuBtn) {
      e.preventDefault();
      var isOpen = header.classList.toggle('is-nav-open');
      menuBtn.setAttribute('aria-expanded', isOpen ? 'true' : 'false');
      menuBtn.setAttribute('aria-label', isOpen ? '메뉴 닫기' : '메뉴 열기');
      if (!isOpen) {
        var items = header.querySelectorAll('.header__nav-item.is-open');
        items.forEach(function (item) {
          item.classList.remove('is-open');
        });
      }
      return;
    }

    /* 1depth 링크 클릭: 해당 항목의 2depth 토글 */
    var navLink = e.target.closest('.header__nav-link');
    if (navLink && header.classList.contains('is-nav-open')) {
      var navItem = navLink.closest('.header__nav-item');
      if (navItem && navItem.querySelector('.header__dropdown')) {
        e.preventDefault();
        var others = header.querySelectorAll('.header__nav-item.is-open');
        others.forEach(function (item) {
          if (item !== navItem) item.classList.remove('is-open');
        });
        navItem.classList.toggle('is-open');
      }
    }
  });

  /* 뷰포트가 태블릿 이상으로 바뀌면 모바일 메뉴 상태 초기화 */
  mobileQuery.addEventListener('change', function (mq) {
    if (!mq.matches) {
      var header = document.querySelector('.header');
      closeMobileNav(header);
    }
  });
})();
