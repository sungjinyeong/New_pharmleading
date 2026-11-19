/* 오늘의 당첨: 메인 / 게임 공통, 원본 목록이 영역을 넘을 때만 반복 이동 */
(() => {
  document.querySelectorAll('.event_winners').forEach((winners) => {
    const viewport = winners.querySelector('.event_winners_viewport');
    const track = winners.querySelector('.event_winners_track');
    const group = winners.querySelector('.event_winners_group');
    if (!viewport || !track || !group) return;

    let copy;
    const update = () => {
      const overflowing = viewport.clientWidth > 0 && group.getBoundingClientRect().width > viewport.clientWidth;
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
    new MutationObserver(() => {
      if (copy) copy.remove();
      copy = null;
      update();
    }).observe(group, { childList: true, characterData: true, subtree: true });
    update();
  });
})();

/* 공통 선택 목록 */
(() => {
  'use strict';

  const closeSelects = (except) => {
    document.querySelectorAll('.select_wrap .selectDiv.active').forEach((select) => {
      if (select !== except) select.classList.remove('active');
    });
  };

  document.addEventListener('click', (event) => {
    const select = event.target.closest('.select_wrap .selectDiv');
    const toggle = event.target.closest('.select_nomal');

    if (select && toggle) {
      closeSelects(select);
      select.classList.toggle('active');
      return;
    }

    if (!select || event.target.closest('.option_list a')) closeSelects();
  });

  document.addEventListener('keydown', (event) => {
    if (event.key !== 'Escape') return;
    const select = event.target.closest('.select_wrap .selectDiv.active');
    closeSelects();
    if (select) select.querySelector('.select_nomal').focus();
  });

  document.addEventListener('focusin', (event) => {
    closeSelects(event.target.closest('.select_wrap .selectDiv'));
  });
})();



/* 내역 필터: 표시 문구 선택만 처리, 실제 목록 조회는 개발 연동 */
(() => {
  const filters = document.querySelectorAll('.list_filter');
  const closeFilters = (except) => {
    filters.forEach((filter) => {
      if (filter !== except) filter.classList.remove('active');
    });
  };

  filters.forEach((filter) => {
    const toggle = filter.querySelector('.list_filter_toggle');
    const options = filter.querySelectorAll('.list_filter_options button');

    toggle.addEventListener('click', () => {
      closeFilters(filter);
      filter.classList.toggle('active');
    });

    options.forEach((option) => {
      option.addEventListener('click', () => {
        options.forEach((item) => item.classList.remove('active'));
        option.classList.add('active');
        toggle.textContent = option.textContent;
        filter.classList.remove('active');
        toggle.focus();
      });
    });

    filter.addEventListener('keydown', (event) => {
      if (event.key !== 'Escape') return;
      filter.classList.remove('active');
      toggle.focus();
    });
  });

  document.addEventListener('click', (event) => {
    closeFilters(event.target.closest('.list_filter'));
  });
  document.addEventListener('focusin', (event) => {
    closeFilters(event.target.closest('.list_filter'));
  });
})();