/**
 * FAQ 아코디언
 */
(function () {
  'use strict';

  var triggers = document.querySelectorAll('[data-faq-trigger]');
  if (!triggers.length) return;

  /**
   * 열려 있는 패널의 트리거를 찾아 닫음
   */
  function closeOthers(excludeTrigger) {
    triggers.forEach(function (btn) {
      if (btn === excludeTrigger) return;
      if (btn.getAttribute('aria-expanded') === 'true') {
        var panelId = btn.getAttribute('aria-controls');
        var panel = panelId ? document.getElementById(panelId) : null;
        if (panel) {
          panel.hidden = true;
        }
        btn.setAttribute('aria-expanded', 'false');
      }
    });
  }

  /**
   * 클릭한 항목의 패널 열기/닫기
   */
  function toggle(trigger) {
    var isExpanded = trigger.getAttribute('aria-expanded') === 'true';
    var panelId = trigger.getAttribute('aria-controls');
    var panel = panelId ? document.getElementById(panelId) : null;

    if (isExpanded) {
      if (panel) panel.hidden = true;
      trigger.setAttribute('aria-expanded', 'false');
    } else {
      closeOthers(trigger);
      if (panel) panel.hidden = false;
      trigger.setAttribute('aria-expanded', 'true');
    }
  }

  triggers.forEach(function (btn) {
    btn.addEventListener('click', function () {
      toggle(btn);
    });
  });
})();
