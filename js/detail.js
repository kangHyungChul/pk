/**
 * 상품 상세 페이지 스크립트
 * - 탭 전환 (신용카드 / 휴대폰)
 * - 수량 +/- 1, 최소 0 / 최대 10, +10 버튼으로 최대 설정
 * - 총 구매수량 >= 1 && 결제 동의 체크 시 결제하기 활성화
 */
(function () {
  'use strict';

  var MIN_QTY = 0;
  var MAX_QTY = 10;

  /**
   * 패널 내 수량 input들의 합 (총 구매 수량)
   */
  function getTotalQuantity(panel) {
    if (!panel) return 0;
    var inputs = panel.querySelectorAll('.detail-quantity__input');
    var total = 0;
    for (var i = 0; i < inputs.length; i++) {
      total += parseInt(inputs[i].value, 10) || 0;
    }
    return total;
  }

  /**
   * 수량 값을 0~10으로 고정 후 input에 반영
   */
  function clampAndSetInput(input, value) {
    var num = parseInt(value, 10);
    if (isNaN(num)) num = MIN_QTY;
    num = Math.max(MIN_QTY, Math.min(MAX_QTY, num));
    input.value = String(num);
    return num;
  }

  /**
   * 해당 패널의 결제하기 버튼 활성/비활성
   * - 총 구매수량 >= 1 이고 결제 동의 체크일 때만 활성화
   */
  function updateSubmitForPanel(panel) {
    if (!panel) return;
    var total = getTotalQuantity(panel);
    var checkbox = panel.querySelector('input[type="checkbox"]');
    var submitBtn = panel.querySelector('.detail__submit');
    if (!submitBtn) return;

    var agreed = checkbox ? checkbox.checked : false;
    var enabled = total >= 1 && agreed;

    submitBtn.disabled = !enabled;
    submitBtn.classList.toggle('is-disabled', !enabled);
  }

  /**
   * 한 패널에 대해 수량 +/- , +10(최대), input 변경 바인딩
   */
  function bindQuantityPanel(panel) {
    if (!panel) return;

    var rows = panel.querySelectorAll('.detail-quantity');
    for (var r = 0; r < rows.length; r++) {
      var row = rows[r];
      var minusBtn = row.querySelector('.detail-quantity__btn--minus');
      var plusBtn = row.querySelector('.detail-quantity__btn--plus');
      var input = row.querySelector('.detail-quantity__input');
      var maxBtn = row.querySelector('.detail-quantity__max');

      if (!input) continue;

      if (minusBtn) {
        minusBtn.addEventListener('click', function () {
          var inp = this.closest('.detail-quantity').querySelector('.detail-quantity__input');
          var val = parseInt(inp.value, 10) || 0;
          clampAndSetInput(inp, val - 1);
          updateSubmitForPanel(inp.closest('.detail-panel'));
        });
      }

      if (plusBtn) {
        plusBtn.addEventListener('click', function () {
          var inp = this.closest('.detail-quantity').querySelector('.detail-quantity__input');
          var val = parseInt(inp.value, 10) || 0;
          clampAndSetInput(inp, val + 1);
          updateSubmitForPanel(inp.closest('.detail-panel'));
        });
      }

      if (maxBtn) {
        maxBtn.addEventListener('click', function () {
          var inp = this.closest('.detail-quantity').querySelector('.detail-quantity__input');
          clampAndSetInput(inp, MAX_QTY);
          updateSubmitForPanel(inp.closest('.detail-panel'));
        });
      }

      input.addEventListener('input', function () {
        clampAndSetInput(this, this.value);
        updateSubmitForPanel(this.closest('.detail-panel'));
      });
      input.addEventListener('change', function () {
        clampAndSetInput(this, this.value);
        updateSubmitForPanel(this.closest('.detail-panel'));
      });
    }

    var checkbox = panel.querySelector('input[type="checkbox"]');
    if (checkbox) {
      checkbox.addEventListener('change', function () {
        updateSubmitForPanel(panel);
      });
    }
  }

  /**
   * 탭 전환 초기화 + 전환 시 활성 패널의 결제하기 상태 갱신
   */
  function initDetailTabs() {
    var tabList = document.querySelector('.detail-tabs');
    if (!tabList) return;

    var tabs = tabList.querySelectorAll('.detail-tab');
    var panels = document.querySelectorAll('.detail-panel');
    if (!tabs.length || !panels.length) return;

    function setActiveTab(activeTab) {
      var tabId = activeTab.getAttribute('data-tab');

      tabs.forEach(function (tab) {
        var isActive = tab === activeTab;
        tab.classList.toggle('is-active', isActive);
        tab.setAttribute('aria-selected', isActive ? 'true' : 'false');
      });

      panels.forEach(function (panel) {
        var isActive = panel.getAttribute('data-tab-panel') === tabId;
        panel.classList.toggle('is-active', isActive);
        if (isActive) updateSubmitForPanel(panel);
      });
    }

    tabs.forEach(function (tab) {
      tab.addEventListener('click', function () {
        setActiveTab(tab);
      });
    });
  }

  function init() {
    var panels = document.querySelectorAll('.detail-panel');
    for (var i = 0; i < panels.length; i++) {
      bindQuantityPanel(panels[i]);
    }
    initDetailTabs();

    // 초기 로드 시 활성 패널 결제하기 상태 적용
    var activePanel = document.querySelector('.detail-panel.is-active');
    if (activePanel) updateSubmitForPanel(activePanel);
  }

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', init);
  } else {
    init();
  }
})();
