* from, to.
* scheduler.every().monday().run(function() {}); //<- eqv to: scheduler.every().week().at('monday').run(function() {});
* instead of scheduler.every().hour().run(function() {}) make it possible to write scheduler.every.hour.run(function() {})