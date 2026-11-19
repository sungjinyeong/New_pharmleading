/* 메인 이벤트: EVENT 1은 고정, 오른쪽 이벤트만 7초마다 1개 이동 */
if (typeof Swiper !== 'undefined' && document.querySelector('.main_events_swiper')) {
  new Swiper('.main_events_swiper', {
    slidesPerView: 1,
    slidesPerGroup: 1,
    spaceBetween: 14,
    loop: true,
    speed: 500,
    autoplay: {
      delay: 7000,
      disableOnInteraction: false,
    },
    a11y: { enabled: false }, // 자동 ID 생성 방지
  });
}
