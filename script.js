document.addEventListener('DOMContentLoaded', function () {
    const button = document.getElementById('theme-toggle');
    const body = document.body;
  
    // Проверка сохранённой темы
    const savedTheme = localStorage.getItem('theme');
    if (savedTheme) {
      body.className = savedTheme;
      updateButtonText();
    }
  
    button.addEventListener('click', function () {
      body.classList.toggle('dark-theme');
      body.classList.toggle('light-theme');
  
      // Сохраняем выбор
      localStorage.setItem('theme', body.className);
      updateButtonText();
    });
  
    function updateButtonText() {
      button.textContent = body.classList.contains('dark-theme') ? 'Светлая тема' : 'Тёмная тема';
    }
  });

  document.addEventListener('DOMContentLoaded', function () {
    const btn = document.getElementById('show-more-btn');
    const hiddenProjects = document.querySelectorAll('.extra-project');
  
    btn.addEventListener('click', () => {
      hiddenProjects.forEach(project => project.style.display = 'block');
      btn.style.display = 'none'; // скрываем кнопку после нажатия
    });
  });
  
  