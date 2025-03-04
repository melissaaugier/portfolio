document.addEventListener('turbo:load', function () {
  // Function to handle the offcanvas behavior for project-offcanvas
  function handleProjectOffcanvas(offcanvas) {
    const offcanvasBody = offcanvas.querySelector('.offcanvas-body');
    const closeButton = offcanvas.querySelector('.btn-close'); // Select close button
    let lastScrollTop = 400;
    let expanded = false;

    // Scroll event listener for adjusting offcanvas height (only for project-offcanvas)
    if (offcanvasBody) {
      offcanvasBody.addEventListener('scroll', function () {
        const currentScrollTop = offcanvasBody.scrollTop;

        if (currentScrollTop > lastScrollTop) {
          // Scrolling down → Expand to full screen
          offcanvas.style.height = '100vh';
          expanded = true;
        } else if (currentScrollTop < lastScrollTop && expanded) {
          // Scrolling up → Reduce height gradually
          offcanvas.style.height = '90vh';

          if (offcanvasBody.scrollTop <= 400) {
            offcanvas.style.height = '60vh';
            expanded = false;
          }
        }

        lastScrollTop = currentScrollTop;
      });

      // Ensure close button is always visible
      new ResizeObserver(() => {
        if (window.innerHeight < 700) { // If Safari UI hides top bar
          closeButton.style.position = 'absolute';
          closeButton.style.top = '10px';
        } else {
          closeButton.style.position = 'relative';
        }
      }).observe(document.body);
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
