/**
 * 회원가입 약관동의
 * - 모두 동의 ↔ 개별 3개 체크박스 연동
 * - 모든 체크박스(3개)가 체크되어 있을 때만 회원가입 버튼 활성화
 */
(function () {
  'use strict';

  var agreeAll = document.getElementById('agree_all');
  var agreeTerms = document.getElementById('agree_terms');
  var agreePrivate = document.getElementById('agree_private');
  var agreeMarketing = document.getElementById('agree_marketing');
  var submitBtn = document.getElementById('signup_submit_btn');

  if (!agreeAll || !agreeTerms || !agreePrivate || !agreeMarketing) return;

  /** 개별 약관 체크박스 3개 */
  var individualChecks = [agreeTerms, agreePrivate, agreeMarketing];

  /**
   * 3개가 전부 체크되었는지 여부
   */
  function allIndividualChecked() {
    return agreeTerms.checked && agreePrivate.checked && agreeMarketing.checked;
  }

  /**
   * "모두 동의" 상태를 개별 3개에 맞춤 (3개 전부 체크 시에만 agree_all 체크)
   */
  function syncAgreeAllFromIndividual() {
    agreeAll.checked = allIndividualChecked();
  }

  /**
   * 회원가입 버튼 활성화: 3개 전부 체크 시에만 enabled
   */
  function updateSubmitButton() {
    if (submitBtn) {
      submitBtn.disabled = !allIndividualChecked();
    }
  }

  /**
   * "모두 동의" 클릭 시: 체크면 3개 전부 체크, 해제면 3개 전부 해제
   */
  function onAgreeAllChange() {
    var checked = agreeAll.checked;
    agreeTerms.checked = checked;
    agreePrivate.checked = checked;
    agreeMarketing.checked = checked;
    updateSubmitButton();
  }

  /**
   * 개별 체크박스 변경 시: "모두 동의" 동기화 + 버튼 활성화 갱신
   */
  function onIndividualChange() {
    syncAgreeAllFromIndividual();
    updateSubmitButton();
  }

  agreeAll.addEventListener('change', onAgreeAllChange);

  individualChecks.forEach(function (input) {
    input.addEventListener('change', onIndividualChange);
  });

  /* 초기 상태: 모두 미체크이므로 버튼 비활성화 유지 */
  updateSubmitButton();
})();
