/* 공통 팝업 열기 / 닫기 */
(() => {
  const targets = {
    quiz_retry_open: '.quiz_retry',
    quiz_correct_open: '.quiz_correct',
    quiz_gate_open: '.quiz_gate',
    shop_product: '.exchange_popup',
    game_payment_open: '.game_payment_popup',
    game_result_open: '.game_result',
    game_point_open: '.game_point_result',
  };
  document.addEventListener('click', (event) => {
    const trigger = event.target.closest(Object.keys(targets).map((name) => '.' + name).join(', '));
    if (trigger) {
      if (trigger.classList.contains('quiz_gate_open') && trigger.closest('.participation_card.finish')) return;
      const name = Object.keys(targets).find((name) => trigger.classList.contains(name));
      const popup = document.querySelector('.popup' + targets[name]);
      if (popup) {
        event.preventDefault();
        popup.querySelector('.exchange_form')?.reset();
        popup.classList.add('active');
      }
      return;
    }

    const popup = event.target.closest('.popup');
    if (popup && (event.target === popup || event.target.closest('.popup_close, .popup_confirm, .result_confirm'))) {
      event.preventDefault();
      popup.classList.remove('active');
    }
  });

  document.addEventListener('keydown', (event) => {
    if (event.key !== 'Escape') return;
    const popup = [...document.querySelectorAll('.popup.active')].pop();
    if (popup) popup.classList.remove('active');
  });

  document.querySelector('.exchange_phone')?.addEventListener('input', (event) => {
    event.target.value = event.target.value.replace(/\D/g, '').slice(0, 11);
  });
  // 실제 교환 처리는 개발 연동
  document.querySelector('.exchange_form')?.addEventListener('submit', (event) => event.preventDefault());
})();
