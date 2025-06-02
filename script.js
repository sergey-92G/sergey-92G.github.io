document.addEventListener('DOMContentLoaded', function () {
  // Сворачивание блоков по заголовкам <h2>
  document.querySelectorAll('section h2').forEach(header => {
    const section = header.parentElement;
    const content = Array.from(section.children).filter(el => el !== header);
    const container = document.createElement('div');
    container.classList.add('collapsible-content');
    content.forEach(el => container.appendChild(el));
    section.appendChild(container);

    // Иконка + поворот
    header.classList.add('toggleable', 'collapsed');
    container.classList.add('collapsed');

    header.addEventListener('click', () => {
      container.classList.toggle('collapsed');
      header.classList.toggle('collapsed');
    });
  });

  // Кнопка печати
  const printBtn = document.getElementById('print-btn');
  if (printBtn) {
    printBtn.addEventListener('click', () => {
      window.print();
    });
  }

  // Показ скрытых проектов (если используется)
  const showMoreStaticBtn = document.getElementById('show-more-btn');
  if (showMoreStaticBtn) {
    const hiddenProjects = document.querySelectorAll('.extra-project');
    showMoreStaticBtn.addEventListener('click', () => {
      hiddenProjects.forEach(project => project.style.display = 'block');
      showMoreStaticBtn.style.display = 'none';
    });
  }

  // Загрузка проектов с GitHub
  const username = 'sergey-92G';
  const projectContainer = document.getElementById('project-list');
  const showMoreBtn = document.getElementById('show-more-btn');

  let allRepos = [];
  let visibleCount = 2;

  function renderProjects() {
    if (!projectContainer) return;

    projectContainer.innerHTML = '';

    allRepos.slice(0, visibleCount).forEach(repo => {
      const div = document.createElement('div');
      div.classList.add('project');

      const descriptionHtml = repo.description
        ? repo.description
        : `<a href="https://github.com/${username}/${repo.name}#readme" target="_blank">📘 Читать README.md</a>`;

      div.innerHTML = `
        <h3><a href="${repo.html_url}" target="_blank">${repo.name}</a></h3>
        <p><strong>Язык:</strong> ${repo.language || 'Не указан'}</p>
        <p>${descriptionHtml}</p>
      `;
      projectContainer.appendChild(div);
    });

    if (visibleCount >= allRepos.length && showMoreBtn) {
      showMoreBtn.style.display = 'none';
    }
  }

  async function fetchRepos() {
    try {
      const response = await fetch(`https://api.github.com/users/${username}/repos?sort=updated`);
      const data = await response.json();
      allRepos = data.filter(repo => !repo.fork);
      renderProjects();
    } catch (error) {
      if (projectContainer) {
        projectContainer.innerHTML = '<p>Ошибка загрузки проектов</p>';
      }
      console.error('Ошибка при загрузке репозиториев:', error);
    }
  }

  if (showMoreBtn && projectContainer) {
    showMoreBtn.addEventListener('click', () => {
      visibleCount += 4;
      renderProjects();
    });
  }

  fetchRepos();
});
