window.ModalController = class extends Stimulus.Controller {
    static targets = ["modal"];
  
    openModal(event) {
      console.log('openModal');
  
      // Get the index from the clicked element
      const index = event.currentTarget.dataset.index;
  
      // Find the modal using the index
      this.modalTarget = document.querySelector(`#projectModal${index}`);
  
      if (!this.modalTarget) {
        console.error('Modal not found');
        return;
      }
  
      // Show the modal using Bootstrap's Modal API
      const modalInstance = new bootstrap.Modal(this.modalTarget);
      modalInstance.show();
      this.showBackdrop();
    }
  
    closeModal() {
      if (!this.modalTarget) return;
  
      const modalInstance = bootstrap.Modal.getInstance(this.modalTarget);
      modalInstance.hide();
      this.hideBackdrop();
    }
  
    showBackdrop() {
      console.log('showBackdrop');
      const backdrop = document.createElement('div');
      backdrop.className = 'modal-backdrop fade show';
      document.body.appendChild(backdrop);
    }
  
    hideBackdrop() {
      const backdrop = document.querySelector('.modal-backdrop');
      if (backdrop) {
        backdrop.classList.remove('show');
        setTimeout(() => backdrop.remove(), 300);
      }
    }
  };
  