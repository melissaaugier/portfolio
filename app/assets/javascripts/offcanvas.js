document.addEventListener('turbo:load', function () {
  function handleProjectOffcanvas(offcanvas) {
    const offcanvasBody = offcanvas.querySelector('.offcanvas-body');
    const closeButton = offcanvas.querySelector('.btn-close'); // Select close button
    let lastScrollTop = 200;
    let expanded = false;

    if (offcanvasBody) {
      offcanvasBody.addEventListener('scroll', function () {
        const currentScrollTop = offcanvasBody.scrollTop;

        if (currentScrollTop > lastScrollTop && !expanded) {
          // Scrolling down → Expand to full screen
          offcanvas.style.height = '100vh';
          expanded = true;
        } else if (currentScrollTop < lastScrollTop && expanded) {
          // Scrolling up → Reduce height gradually
          offcanvas.style.height = '80vh';

          setTimeout(() => {
            if (offcanvasBody.scrollTop <= 20) {
              offcanvas.style.height = '60vh';
              expanded = false;
            }
          }, 300);
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
