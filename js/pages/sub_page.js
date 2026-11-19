/* quiz_page / pharm_think 공통 UI: active 클래스 추가/삭제로 정답 펼치기/접기 */
(() => {
  'use strict';

  document.querySelectorAll('.quiz_answer_toggle').forEach((button) => {
    const answer = button.closest('.quiz_answer');
    if (!answer) return;
    const updateLabel = () => {
      button.textContent = answer.classList.contains('active') ? '정답 닫기' : '정답 보기';
    };
    updateLabel();
    button.addEventListener('click', () => {
      answer.classList.toggle('active');
      updateLabel();
    });
  });
})();

/* 설문 화면: 문항 선택 및 투표완료 상태 표시 */
(() => {
  'use strict';

  const vote = document.querySelector('.think_vote_form');
  if (!vote) return;
  const button = vote.querySelector('.think_vote_submit');
  const inputs = vote.querySelectorAll('.think_option input');

  inputs.forEach((input) => {
    input.addEventListener('change', () => {
      inputs.forEach((item) => {
        item.checked = item === input;
        item.closest('.think_option').classList.toggle('active', item === input);
      });
      button.disabled = false;
    });
  });

  button.addEventListener('click', () => {
    vote.classList.add('active');
    button.textContent = '투표완료';
    button.disabled = true;
    inputs.forEach((input) => { input.disabled = true; });
    vote.querySelector('.think_opinion').disabled = true;
  });
})();

/* 운영규칙 펼치기/접기 */
(() => {
  'use strict';

  const button = document.querySelector('.think_rules_toggle');
  if (!button) return;
  const panel = document.querySelector('.think_rules');
  if (!panel) return;

  button.addEventListener('click', () => {
    panel.classList.toggle('active');
  });
})();
