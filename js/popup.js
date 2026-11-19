/* 공통 팝업: active로 표시하고 스크롤과 포커스를 함께 관리합니다. */
(() => {
  'use strict';

  const popups = [...document.querySelectorAll('.popup')];
  if (!popups.length) return;
  const opened = [];
  const returnFocus = new Map();
  const focusable = (popup) => [...popup.querySelectorAll('button, a[href], input, select, textarea, [tabindex]')]
    .filter((element) => !element.disabled && element.tabIndex >= 0 && element.getClientRects().length);
  const focusPopup = (popup) => {
    const target = popup.querySelector('.exchange_phone') || focusable(popup)[0] || popup;
    target.focus({ preventScroll: true });
  };
  const syncPopups = () => {
    const previousTop = opened[opened.length - 1];
    for (let index = opened.length - 1; index >= 0; index--) {
      if (!opened[index].classList.contains('active')) opened.splice(index, 1);
    }
    popups.forEach((popup) => {
      if (popup.classList.contains('active') && !opened.includes(popup)) {
        returnFocus.set(popup, document.activeElement);
        opened.push(popup);
      }
    });
    opened.forEach((popup, index) => {
      popup.style.zIndex = 'calc(var(--z_modal) + ' + index + ')';
    });
    document.documentElement.classList.toggle('popup_opened', opened.length > 0);
    const top = opened[opened.length - 1];
    if (top && top !== previousTop) focusPopup(top);
    if (!top && previousTop) {
      const target = returnFocus.get(previousTop);
      if (target && target.isConnected && !target.closest('.popup')) target.focus({ preventScroll: true });
    }
  };
  const closePopup = (popup) => {
    popup.classList.remove('active');
    syncPopups();
  };

  popups.forEach((popup) => {
    popup.tabIndex = -1;
    new MutationObserver(syncPopups).observe(popup, { attributes: true, attributeFilter: ['class'] });
    popup.addEventListener('click', (event) => {
      if (event.target.closest('.result_confirm, .popup_close')) closePopup(popup);
      else if (event.target === popup && popup.classList.contains('exchange_popup')) closePopup(popup);
    });
  });
  document.addEventListener('keydown', (event) => {
    const top = opened[opened.length - 1];
    if (!top) return;
    if (event.key === 'Escape') {
      event.preventDefault();
      closePopup(top);
    } else if (event.key === 'Tab') {
      const items = focusable(top);
      const first = items[0] || top;
      const last = items[items.length - 1] || top;
      if (event.shiftKey && (document.activeElement === first || !items.includes(document.activeElement))) {
        event.preventDefault();
        last.focus();
      } else if (!event.shiftKey && (document.activeElement === last || !items.includes(document.activeElement))) {
        event.preventDefault();
        first.focus();
      }
    }
  });
  syncPopups();
})();

/* 공통 교환 팝업 */
(() => {
  'use strict';

  const popup = document.querySelector('.exchange_popup');
  if (!popup) return;
  const form = popup.querySelector('.exchange_form');
  const phone = popup.querySelector('.exchange_phone');

  document.addEventListener('click', (event) => {
    if (!event.target.closest('.shop_product')) return;
    if (form) form.reset();
    popup.classList.add('active');
  });
  if (phone) phone.addEventListener('input', () => {
    phone.value = phone.value.replace(/\D/g, '').slice(0, 11);
  });
  // 실제 교환 처리는 개발에서 연동합니다.
  if (form) form.addEventListener('submit', (event) => event.preventDefault());
})();
