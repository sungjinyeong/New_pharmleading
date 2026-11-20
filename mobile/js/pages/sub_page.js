/* ==================== PC와 같은 active / is_completed 상태로 정답 펼치기 ==================== */
(() => {
  'use strict';

  document.querySelectorAll('.quiz_answer_toggle').forEach((button) => {
    const answer = button.closest('.quiz_answer');
    if (!answer || answer.classList.contains('is_completed')) return;
    const updateLabel = () => {
      const expanded = answer.classList.contains('active');
      button.textContent = expanded ? '정답 닫기' : '정답 보기';
    };
    updateLabel();
    button.addEventListener('click', () => {
      answer.classList.toggle('active');
      updateLabel();
    });
  });
})();
