/* ==================== 내역과 문의 펼치기 ==================== */
document.querySelectorAll('.points_toggle, .inquiry_toggle').forEach((button) => {
  button.addEventListener('click', () => {
    button.closest('.points_item, .inquiry_item').classList.toggle('active');
  });
});

/* ==================== 문의 등록은 개발에서 연결 ==================== */
document.querySelector('.inquiry_form')?.addEventListener('submit', (event) => {
  event.preventDefault();
});
