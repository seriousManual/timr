var moment = require('moment');

var timr = require('../');

var scheduler = timr();

var myTask = scheduler().every(10).seconds();

myTask.on('execute', function() {
    console.log( 'execution1' );
});

myTask.on('execute', function() {
    console.log( 'execution2' );
});

myTask.on('execute', function() {
    console.log( 'execution3' );
});

myTask.run();