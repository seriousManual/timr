var moment = require('moment');

var timr = require('../');

var scheduler = timr();

scheduler()
    .every(10).seconds()
    .run(function() {
      console.log( 'execution1' );
    })
    .run(function() {
        console.log( 'execution2' );
    })
    .run(function() {
        console.log( 'execution3' );
    });