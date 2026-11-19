/* 모바일 전체 메뉴 열기 / 닫기 */
(() => {
  const menu = document.querySelector('.mobile_menu');
  const opener = document.querySelector('.menu_open');
  if (!menu || !opener) return;
  const header = document.querySelector('.site_header');
  const navigation = document.querySelector('.header_nav');
  const main = document.querySelector('.mobile_main');
  const footer = document.querySelector('.site_footer');
  const closeButton = menu.querySelector('.menu_close');
  menu.inert = !menu.classList.contains('active');
  const setOpen = (open) => {
    menu.inert = !open;
    menu.classList.toggle('active', open);
    document.documentElement.classList.toggle('menu_opened', open);
    header.inert = open;
    if (navigation) navigation.inert = open;
    main.inert = open;
    if (footer) footer.inert = open;
    if (open) closeButton.focus();
    else opener.focus();
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

/* 공통 내비게이션: 넓으면 한 줄 분배, 넘치면 자유로운 관성 드래그 */
(() => {
  const element = document.querySelector('.header_nav_swiper');
  if (!element) return;
  const items = [...element.querySelectorAll('.header_nav_list > li')];
  const reducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)');
  const duration = () => reducedMotion.matches ? 0 : 350;
  const swiper = typeof Swiper === 'undefined' ? null : new Swiper(element, {
    slidesPerView: 'auto',
    spaceBetween: 0,
    speed: duration(),
    freeMode: {
      enabled: true,
      sticky: false,
      momentum: !reducedMotion.matches,
      momentumBounce: false,
    },
    grabCursor: true,
    simulateTouch: true,
    mousewheel: { forceToAxis: true, releaseOnEdges: true },
    watchOverflow: true,
    preventClicks: true,
    preventClicksPropagation: true,
    a11y: { enabled: false },
  });

  const reveal = (item, speed = duration()) => {
    if (!item) return;
    const left = item.offsetLeft;
    const right = left + item.offsetWidth;
    if (!swiper) {
      if (left < element.scrollLeft) element.scrollTo({ left, behavior: speed ? 'smooth' : 'instant' });
      else if (right > element.scrollLeft + element.clientWidth) element.scrollTo({ left: right - element.clientWidth, behavior: speed ? 'smooth' : 'instant' });
      return;
    }
    const currentLeft = -swiper.translate;
    let target = currentLeft;
    if (left < currentLeft) target = left;
    else if (right > currentLeft + swiper.size) target = right - swiper.size;
    const translate = Math.max(swiper.maxTranslate(), Math.min(swiper.minTranslate(), -target));
    swiper.translateTo(translate, speed);
  };

  items.forEach((item) => {
    const link = item.querySelector('a');
    link.addEventListener('click', (event) => {
      // 퍼블리싱용 임시 링크. 실제 페이지 주소 연결 후에는 페이지 이동을 따릅니다.
      if (link.getAttribute('href') !== '#') return;
      event.preventDefault();
      items.forEach((entry) => entry.classList.toggle('active', entry === item));
      if (swiper) swiper.update();
      reveal(item);
    });
    link.addEventListener('focus', () => reveal(item));
  });
  reveal(items.find((item) => item.classList.contains('active')), 0);
  if (swiper) swiper.on('resize', () => reveal(items.find((item) => item.classList.contains('active')), 0));
})();

/* Family site: 위로 펼침, 바깥 클릭 / 포커스 이동 / Escape 시 닫기 */
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
