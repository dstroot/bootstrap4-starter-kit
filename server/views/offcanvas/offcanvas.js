$(() => {
  $('[data-toggle="offcanvas"]').on('click', () => {
    $('.offcanvas-collapse').toggleClass('open');
  });
});
