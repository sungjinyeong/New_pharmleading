/* ==================== 전체 메뉴 ==================== */
(() => {
  const menu = document.querySelector('.mobile_menu');
  const opener = document.querySelector('.menu_open');
  if (!menu || !opener) return;
  const background = document.querySelectorAll('.site_header, .header_nav, .mobile_main, .site_footer');
  const closeButton = menu.querySelector('.menu_close');
  menu.inert = !menu.classList.contains('active');
  const setOpen = (open) => {
    menu.inert = !open;
    menu.classList.toggle('active', open);
    document.documentElement.classList.toggle('menu_opened', open);
    background.forEach((element) => { element.inert = open; });
    (open ? closeButton : opener).focus();
  };
  opener.addEventListener('click', () => setOpen(true));
  closeButton.addEventListener('click', () => setOpen(false));
  menu.addEventListener('click', (event) => {
    if (event.target === menu) setOpen(false);
  });
  document.addEventListener('keydown', (event) => {
    if (event.key === 'Escape' && menu.classList.contains('active')) setOpen(false);
  });
})();

/* ==================== 내비게이션: 드래그 / 선택한 메뉴 노출 ==================== */
document.querySelectorAll('.header_nav_swiper, .mypage_nav').forEach((element) => {
  const items = [...element.querySelectorAll('.swiper-wrapper > li')];
  const reducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)');
  const swiper = typeof Swiper === 'undefined' ? null : new Swiper(element, {
    slidesPerView: 'auto',
    speed: reducedMotion.matches ? 0 : 350,
    freeMode: {
      enabled: true,
      momentum: !reducedMotion.matches,
      momentumBounce: false,
    },
    grabCursor: true,
    mousewheel: { forceToAxis: true, releaseOnEdges: true },
    a11y: { enabled: false },
  });

  const reveal = (item, speed = reducedMotion.matches ? 0 : 350) => {
    if (!item) return;
    const left = item.offsetLeft;
    const right = left + item.offsetWidth;
    const current = swiper ? -swiper.translate : element.scrollLeft;
    const width = swiper ? swiper.size : element.clientWidth;
    let target = current;
    if (left < current) target = left;
    else if (right > current + width) target = right - width;

    if (swiper) {
      swiper.translateTo(Math.max(swiper.maxTranslate(), Math.min(swiper.minTranslate(), -target)), speed);
    } else if (target !== current) {
      element.scrollTo({ left: target, behavior: speed ? 'smooth' : 'instant' });
    }
  };

  element.addEventListener('click', (event) => {
    const link = event.target.closest('.swiper-wrapper > li > a');
    // 실제 주소가 있는 링크는 그대로 이동합니다.
    if (!link || link.getAttribute('href') !== '#' || link.classList.contains('referral_open')) return;
    event.preventDefault();
    const item = link.closest('li');
    items.forEach((entry) => entry.classList.toggle('active', entry === item));
    swiper?.update();
    reveal(item);
  });
  element.addEventListener('focusin', (event) => {
    const link = event.target.closest('.swiper-wrapper > li > a');
    if (link) reveal(link.closest('li'));
  });
  reveal(element.querySelector('.active'), 0);
  swiper?.on('resize', () => reveal(element.querySelector('.active'), 0));
});

/* ==================== Family site ==================== */
(() => {
  const family = document.querySelector('.footer_family');
  if (!family) return;
  document.addEventListener('click', (event) => {
    if (!family.contains(event.target) || event.target.closest('.footer_family_list a')) family.open = false;
  });
  document.addEventListener('focusin', (event) => {
    if (!family.contains(event.target)) family.open = false;
  });
  document.addEventListener('keydown', (event) => {
    if (event.key !== 'Escape' || !family.open) return;
    family.open = false;
    family.querySelector('summary').focus();
  });
})();

/* ==================== 페이지 번호 선택 ==================== */
document.querySelectorAll('.pagination').forEach((pagination) => {
  pagination.addEventListener('click', (event) => {
    const button = event.target.closest('.pagination_page');
    if (!button || button.disabled) return;
    pagination.querySelector('.pagination_page.active')?.classList.remove('active');
    button.classList.add('active');
  });
});

/* ==================== 웰컴 이벤트 접기 / 펼치기 ==================== */
document.querySelectorAll('.welcome_toggle').forEach((button) => {
  button.addEventListener('click', () => {
    button.closest('.welcome_event').classList.toggle('active');
  });
});

/* ==================== 목록 필터 선택 표시: 실제 조회는 개발 연동 ==================== */
document.addEventListener('click', (event) => {
  const filter = event.target.closest('.list_filter');
  const toggle = event.target.closest('.list_filter_toggle');
  document.querySelectorAll('.list_filter.active').forEach((item) => {
    if (item !== filter) item.classList.remove('active');
  });
  if (toggle) {
    filter.classList.toggle('active');
    return;
  }
  const option = event.target.closest('.list_filter_options button');
  if (option) {
    filter.querySelector('.list_filter_toggle').textContent = option.textContent;
    filter.querySelector('.list_filter_options .active')?.classList.remove('active');
    option.classList.add('active');
    filter.classList.remove('active');
  }
});
document.addEventListener('keydown', (event) => {
  if (event.key !== 'Escape') return;
  document.querySelectorAll('.list_filter.active').forEach((filter) => {
    filter.classList.remove('active');
    filter.querySelector('.list_filter_toggle').focus();
  });
});
