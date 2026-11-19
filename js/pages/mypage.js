/* 추천인 등록 팝업 열기 */
(() => {
  const popup = document.querySelector('.referral_popup');
  if (!popup) return;

  document.querySelectorAll('.referral_open').forEach((button) => {
    button.addEventListener('click', (event) => {
      event.preventDefault();
      popup.classList.add('active');
    });
  });
})();

/* 문의 내용과 답변 펼치기/접기 */
(() => {
  'use strict';

  document.querySelectorAll('.inquiry_toggle').forEach((button) => {
    button.addEventListener('click', () => {
      button.closest('.inquiry_item').classList.toggle('active');
    });
  });
})();
