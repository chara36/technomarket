// Интерактивность сайта ТехноМаркет
document.addEventListener('DOMContentLoaded', () => {
  // Показать / скрыть дополнительный текст
  const showMoreButton = document.querySelector('#showMore');
  const moreText = document.querySelector('#moreText');
  if (showMoreButton && moreText) {
    showMoreButton.addEventListener('click', () => {
      const isHidden = moreText.classList.toggle('d-none');
      showMoreButton.textContent = isHidden ? 'Подробнее' : 'Скрыть';
      showMoreButton.setAttribute('aria-expanded', String(!isHidden));
    });
  }

  // Проверка формы без перезагрузки страницы
  const contactForm = document.querySelector('#contactForm');
  if (contactForm) {
    const nameInput = document.querySelector('#name');
    const emailInput = document.querySelector('#email');
    const commentInput = document.querySelector('#comment');
    const formMessage = document.querySelector('#formMessage');

    contactForm.addEventListener('submit', (event) => {
      event.preventDefault();
      const name = nameInput.value.trim();
      const email = emailInput.value.trim();
      const comment = commentInput.value.trim();

      if (!name || !email || !email.includes('@') || !comment) {
        formMessage.textContent = 'Заполни все поля и проверь правильность email.';
        formMessage.className = 'form-message error';
        return;
      }

      formMessage.textContent = `Спасибо, ${name}! Форма заполнена корректно.`;
      formMessage.className = 'form-message success';
      contactForm.reset();
    });
  }

  // Получение проектов из локального JSON и создание карточек
  const projectsContainer = document.querySelector('#projects');
  if (projectsContainer) {
    fetch('./data/projects.json')
      .then((response) => {
        if (!response.ok) throw new Error('Не удалось загрузить данные');
        return response.json();
      })
      .then((projects) => {
        projectsContainer.innerHTML = projects.map((project) => `
          <article class="project-card">
            <p class="eyebrow">ПРОЕКТ</p>
            <h3>${project.title}</h3>
            <p>${project.description}</p>
            <span class="project-tech">${project.tech}</span>
          </article>
        `).join('');
      })
      .catch(() => {
        projectsContainer.innerHTML = '<p class="form-message error">Не удалось загрузить проекты. Проверьте файл data/projects.json.</p>';
      });
  }
});
