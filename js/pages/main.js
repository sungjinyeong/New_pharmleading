/* 웰컴 이벤트 펼치기: Swiper 로드 여부와 별개로 실행합니다. */
(() => {
  'use strict';

  const event = document.querySelector('.welcome_event');
  const toggle = event?.querySelector('.welcome_toggle');
  const panel = event?.querySelector('.welcome_panel');
  if (!event || !toggle || !panel) return;

  toggle.addEventListener('click', () => {
    const expanded = event.classList.toggle('active');
    panel.inert = !expanded;
  });
})();
