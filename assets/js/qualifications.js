/* ==========================================================
   QUALIFICATIONS PAGE FILTERING
   ========================================================== */

document.addEventListener('DOMContentLoaded', function () {

  const buttons = document.querySelectorAll(
    '[data-qualification-filter]'
  );

  const cards = document.querySelectorAll(
    '[data-qualification-category]'
  );

  const status = document.getElementById(
    'qualification-filter-status'
  );

  if (!buttons.length || !cards.length) {
    return;
  }

  buttons.forEach(function (button) {

    button.addEventListener('click', function () {

      const category = button.dataset.qualificationFilter;

      let visible = 0;

      buttons.forEach(function (item) {

        const selected = item === button;

        item.classList.toggle('is-active', selected);

        item.setAttribute(
          'aria-pressed',
          String(selected)
        );

      });

      cards.forEach(function (card) {

        const show =
          category === 'all' ||
          card.dataset.qualificationCategory === category;

        card.hidden = !show;

        if (show) {
          visible += 1;
        }

      });

      if (status) {
        status.textContent =
          'Showing ' +
          visible +
          ' ' +
          (visible === 1 ? 'qualification' : 'qualifications') +
          '.';
      }

    });

  });

});
