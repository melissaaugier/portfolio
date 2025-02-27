//= require stimulus
//= require ./hello_controller

const application = Stimulus.Application.start();

// Manually register each controller
application.register("hello", HelloController);
