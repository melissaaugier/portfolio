document.addEventListener('turbo:load', function () {
  // Function to handle the offcanvas behavior for project-offcanvas
  function handleProjectOffcanvas(offcanvas) {
    const offcanvasBody = offcanvas.querySelector('.offcanvas-body');
    let lastScrollTop = 200;

    // Scroll event listener for adjusting offcanvas height (only for project-offcanvas)
    if (offcanvasBody) {
      offcanvasBody.addEventListener('scroll', function () {
        const currentScrollTop = offcanvasBody.scrollTop;

        if (currentScrollTop > lastScrollTop) {
          // Scrolling down → Expand to full screen
          offcanvas.style.height = '100vh';
        } else if (currentScrollTop === 0) {
          // Reset height when scrolled back to top
          offcanvas.style.height = '60vh';
        }

        lastScrollTop = currentScrollTop;
      });
    }
  }

  // Function to handle the offcanvas sliding effect
  function handleOffcanvasSlide(offcanvas, direction = 'Y') {
    const transformProperty = direction === 'X' ? 'translateX' : 'translateY';

    offcanvas.addEventListener('show.bs.offcanvas', function () {
      this.style.transform = `${transformProperty}(0)`; // Slide in
    });

    offcanvas.addEventListener('hide.bs.offcanvas', function () {
      this.style.transform = `${transformProperty}(100%)`; // Slide out
    });
  }

  // Apply custom height adjustment only to project-offcanvas
  document.querySelectorAll('.project-offcanvas').forEach(offcanvas => {
    handleProjectOffcanvas(offcanvas); // Apply height adjustments
    handleOffcanvasSlide(offcanvas, 'Y'); // Apply vertical slide effect
  });

  // Apply only the sliding effect to offcanvas-end (no height adjustment)
  document.querySelectorAll('.offcanvas.offcanvas-end').forEach(offcanvas => {
    handleOffcanvasSlide(offcanvas, 'X'); // Apply horizontal slide effect only
  });
});
