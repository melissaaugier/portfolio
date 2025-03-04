document.addEventListener('turbo:load', function () {
  function handleProjectOffcanvas(offcanvas) {
    const offcanvasBody = offcanvas.querySelector('.offcanvas-body');
    let lastScrollTop = 0;
    let expanded = false; // Track if it is currently expanded

    if (offcanvasBody) {
      offcanvasBody.addEventListener('scroll', function () {
        const currentScrollTop = offcanvasBody.scrollTop;

        if (currentScrollTop > lastScrollTop && !expanded) {
          // Scrolling down → Expand to full screen
          offcanvas.style.height = '100vh';
          expanded = true; // Mark as expanded
        } else if (currentScrollTop < lastScrollTop && expanded) {
          // Scrolling up → Reduce height gradually
          offcanvas.style.height = '90vh'; // Adjust to a mid-point before resetting fully
          setTimeout(() => {
            if (offcanvasBody.scrollTop === 0) {
              offcanvas.style.height = '60vh'; // Reset height when fully scrolled up
              expanded = false; // Mark as not expanded
            }
          }, 300);
        }

        lastScrollTop = currentScrollTop;
      });
    }
  }

  function handleOffcanvasSlide(offcanvas, direction = 'Y') {
    const transformProperty = direction === 'X' ? 'translateX' : 'translateY';

    offcanvas.addEventListener('show.bs.offcanvas', function () {
      this.style.transform = `${transformProperty}(0)`;
    });

    offcanvas.addEventListener('hide.bs.offcanvas', function () {
      this.style.transform = `${transformProperty}(100%)`;
    });
  }

  document.querySelectorAll('.project-offcanvas').forEach(offcanvas => {
    handleProjectOffcanvas(offcanvas);
    handleOffcanvasSlide(offcanvas, 'Y');
  });

  document.querySelectorAll('.offcanvas.offcanvas-end').forEach(offcanvas => {
    handleOffcanvasSlide(offcanvas, 'X');
  });
});
