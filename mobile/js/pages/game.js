/* 쿠폰 / 포인트 선택 표시. 실제 사용 및 추첨 처리는 개발 연동 */
document.querySelectorAll('.game_payment_option').forEach((button) => {
  button.addEventListener('click', () => {
    button.closest('.game_payment_options').querySelectorAll('.game_payment_option').forEach((item) => {
      item.classList.toggle('active', item === button);
    });
  });
});

/* 병 열림 연출만 담당합니다. 추첨/결과 팝업 연결은 백엔드에서 처리합니다. */
(() => {
  'use strict';

  const list = document.querySelector('.game_vitamins');
  if (!list) return;
  const buttons = [...list.querySelectorAll('.game_vitamin')];
  const reducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)');

  // 병 입구에서 한 번 퍼지는 기존 입자 효과.
  function burst(button) {
    if (reducedMotion.matches) return;
    const colors = ['var(--color_yellow)', 'var(--color_blue)', 'var(--color_green)', 'var(--color_red)', 'var(--color_blue)'];
    const particles = button.querySelector('.game_particles');
    for (let i = 0; i < 18; i++) {
      const particle = document.createElement('span');
      const angle = i / 18 * Math.PI * 2;
      particle.className = 'game_particle';
      particle.style.cssText = `--particle-color:${colors[i % colors.length]}; --x:${Math.cos(angle) * (55 + Math.random() * 45)}px; --y:${Math.sin(angle) * 70 - 50}px; --spin:${Math.random() * 540}deg; --delay:${Math.random() * .12}s`;
      particles.append(particle);
    }
  }

  buttons.forEach(button => button.addEventListener('click', () => {
    if (list.classList.contains('is_busy')) return;
    list.classList.add('is_busy');
    buttons.forEach(item => { item.disabled = true; });
    button.classList.add('is_selected', 'is_shaking');

    setTimeout(() => {
      button.classList.remove('is_shaking');
      burst(button);
      button.classList.add('is_open');
    }, reducedMotion.matches ? 0 : 650);

    // 연출 후 초기화하여 다시 클릭 가능. 팝업은 별도로 active로 제어합니다.
    setTimeout(() => {
      button.classList.remove('is_selected', 'is_open');
      button.querySelector('.game_particles').replaceChildren();
      list.classList.remove('is_busy');
      buttons.forEach(item => { item.disabled = false; });
    }, reducedMotion.matches ? 400 : 2800);
  }));
})();

/* 당첨 내역이 넘칠 때만 한 번 복제해 이어서 흐르게 합니다. */
(() => {
  const viewport = document.querySelector('.game_winners_viewport');
  if (!viewport) return;
  const track = viewport.querySelector('.game_winners_track');
  const group = track.querySelector('.game_winners_group');
  let copy;
  const update = () => {
    const overflowing = group.scrollWidth > viewport.clientWidth;
    if (overflowing && !copy) {
      copy = group.cloneNode(true);
      copy.inert = true;
      track.append(copy);
    } else if (!overflowing && copy) {
      copy.remove();
      copy = null;
    }
    track.classList.toggle('active', overflowing);
  };
  const resize = new ResizeObserver(update);
  resize.observe(viewport);
  resize.observe(group);
  update();
})();
