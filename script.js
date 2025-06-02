const username = 'sergey-92G';
const projectContainer = document.getElementById('project-list');
const showMoreBtn = document.getElementById('show-more-btn');

let allRepos = [];
let visibleCount = 2;

function renderProjects() {
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

  if (visibleCount >= allRepos.length) {
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
    projectContainer.innerHTML = '<p>Ошибка загрузки проектов</p>';
    console.error('Ошибка при загрузке репозиториев:', error);
  }
}

showMoreBtn.addEventListener('click', () => {
  visibleCount += 4;
  renderProjects();
});

fetchRepos();
