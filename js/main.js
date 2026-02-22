(function () {
  'use strict';

  function initBannerSwiper() {
    var bannerEl = document.querySelector('.banner-swiper');
    if (!bannerEl) return;

    if (typeof Swiper === 'undefined') return;

    new Swiper('.banner-swiper', {
      loop: true,
      autoplay: {
        delay: 3000,
        disableOnInteraction: false
      },
      effect: 'slide',
      speed: 600
    });
  }

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', initBannerSwiper);
  } else {
    initBannerSwiper();
  }
})();
