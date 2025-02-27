//= require stimulus
//= require ./hello_controller
//= require ./modal_controller

const application = Stimulus.Application.start();

// Manually register each controller
application.register("hello", HelloController);
application.register("modal", ModalController);
