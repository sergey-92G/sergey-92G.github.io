document.addEventListener('DOMContentLoaded', function () {
  // Кнопка "Показать ещё"
  const showMoreBtn = document.getElementById('show-more-btn');
  if (showMoreBtn) {
    const hiddenProjects = document.querySelectorAll('.extra-project');
    showMoreBtn.addEventListener('click', () => {
      hiddenProjects.forEach(project => project.style.display = 'block');
      showMoreBtn.style.display = 'none';
    });
  }

  // Сворачивание блоков по заголовкам <h2>
  document.querySelectorAll('section h2').forEach(header => {
    const section = header.parentElement;
    const content = Array.from(section.children).filter(el => el !== header);
    const container = document.createElement('div');
    container.classList.add('collapsible-content');
    content.forEach(el => container.appendChild(el));
    section.appendChild(container);

    header.addEventListener('click', () => {
      container.classList.toggle('collapsed');
    });
  });
});
// Кнопка печати
const printBtn = document.getElementById('print-btn');
if (printBtn) {
  printBtn.addEventListener('click', () => {
    window.print();
  });
}

