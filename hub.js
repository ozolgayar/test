document.addEventListener('DOMContentLoaded', function() {

  // Кнопка «Погрузиться» — скроллит к хабу
  var btnDive = document.getElementById('btn-dive');
  if (btnDive) {
    btnDive.addEventListener('click', function() {
      document.getElementById('hub').scrollIntoView({ behavior: 'smooth' });
    });
  }

  // Скрываем индикатор скролла при прокрутке
  var scrollHint = document.getElementById('scroll-hint');
  window.addEventListener('scroll', function() {
    if (window.scrollY > 100 && scrollHint) {
      scrollHint.style.opacity = '0';
    }
  });

  // Загружаем прогресс из localStorage
  var mod1Progress = parseInt(localStorage.getItem('nc_mod1_progress') || '0', 10);
  var mod1Status = localStorage.getItem('nc_mod1_status') || '';

  // Обновляем прогресс модуля 1
  var mod1Bar = document.getElementById('mod1-bar');
  var mod1Pct = document.getElementById('mod1-pct');
  if (mod1Bar) mod1Bar.style.width = mod1Progress + '%';
  if (mod1Pct) mod1Pct.textContent = mod1Progress + '%';

  // Если модуль 1 завершён
  if (mod1Status === 'complete') {
    var card1 = document.querySelector('[data-module="1"]');
    if (card1) {
      card1.classList.remove('unlocked');
      card1.classList.add('completed');
      card1.querySelector('.hub-card-status').textContent = '✅ Пройден';
      card1.querySelector('.hub-card-btn').textContent = 'Повторить';
    }

    // Разблокируем модуль 2
    var card2 = document.querySelector('[data-module="2"]');
    if (card2) {
      card2.classList.remove('locked');
      card2.classList.add('unlocked');
      card2.querySelector('.hub-card-status').textContent = '🟢 Доступен';
      var btn2 = card2.querySelector('.hub-card-btn');
      btn2.classList.remove('disabled');
      btn2.textContent = 'Начать →';
      // btn2.href = 'module2.html'; // раскомментируй когда будет модуль 2
    }
  }

  // Анимация появления карточек при скролле
  var cards = document.querySelectorAll('.hub-card');
  var observer = new IntersectionObserver(function(entries) {
    entries.forEach(function(entry) {
      if (entry.isIntersecting) {
        entry.target.style.opacity = '1';
        entry.target.style.transform = 'translateY(0)';
      }
    });
  }, { threshold: 0.1 });

  cards.forEach(function(card, i) {
    card.style.opacity = '0';
    card.style.transform = 'translateY(20px)';
    card.style.transition = 'all 0.5s ease ' + (i * 0.1) + 's';
    observer.observe(card);
  });

});
