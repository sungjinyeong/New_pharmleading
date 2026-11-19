/* 이벤트 탭 / 터치 스와이프 */
(() => {
  const section = document.querySelector('.main_events');
  if (!section) return;
  const track = section.querySelector('.main_events_track');
  const tabs = [...section.querySelectorAll('.event_pagination button')];
  const reduced = window.matchMedia('(prefers-reduced-motion: reduce)');
  tabs.forEach((tab, index) => {
    tab.addEventListener('click', () => {
      track.scrollTo({ left: track.clientWidth * index, behavior: reduced.matches ? 'instant' : 'smooth' });
    });
  });
  track.addEventListener('scroll', () => {
    const current = Math.round(track.scrollLeft / track.clientWidth);
    tabs.forEach((tab, index) => tab.classList.toggle('active', index === current));
  }, { passive: true });

  // 흐르는 내역을 한 번 복제해 끊김 없이 연결합니다.
  const winners = section.querySelector('.event_winners_group');
  const copy = winners.cloneNode(true);
  copy.inert = true;
  winners.after(copy);
})();

/* 웰컴 이벤트 접기 / 펼치기 */
document.querySelectorAll('.welcome_toggle').forEach((button) => {
  button.addEventListener('click', () => {
    button.closest('.welcome_event').classList.toggle('active');
  });
});

/* 퀴즈 / 설문: 답변 선택 후 참여 버튼 활성화 (참여 처리는 개발 연동) */
document.querySelectorAll('.participation_card').forEach((card) => {
  const button = card.querySelector('.participation_button');
  const syncSelection = () => {
    button.disabled = !card.querySelector('input[type="radio"]:checked');
  };
  card.addEventListener('change', syncSelection);
  syncSelection();
  window.addEventListener('pageshow', syncSelection);
});

/* 교환 SHOP: 터치 / 마우스 드래그 모두 관성 이동, 카드 단위 스냅 없음 */
(() => {
  if (typeof Swiper === 'undefined') return;
  const reducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)');
  document.querySelectorAll('.shop_swiper').forEach((element) => {
    new Swiper(element, {
      slidesPerView: 'auto',
      spaceBetween: 12,
      speed: reducedMotion.matches ? 0 : 500,
      freeMode: {
        enabled: true,
        sticky: false,
        momentum: !reducedMotion.matches,
        momentumBounce: false,
      },
      grabCursor: true,
      simulateTouch: true,
      // 상품 버튼 위에서 드래그를 시작해도 슬라이드가 움직이도록 허용합니다.
      focusableElements: 'input, select, option, textarea, video, label',
      preventClicks: true,
      preventClicksPropagation: true,
      mousewheel: { forceToAxis: true, releaseOnEdges: true },
      watchOverflow: true,
      a11y: { enabled: false },
    });
  });
})();
