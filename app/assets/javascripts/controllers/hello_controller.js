window.HelloController = class extends Stimulus.Controller {
  connect() {
    console.log("Hello from Stimulus!");
    this.element.textContent = "Stimulus is working!";
  }
};
