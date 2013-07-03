var moment = require('moment');

var timr = require('../');

var scheduler = timr();

////every 15 seconds
scheduler().every(15).seconds().run(function() {
    console.log( 'every 15 seconds' );
});

scheduler()
    .from(moment().add('seconds', 30))
    .to(moment().add('minutes', 5))
    .every(10).seconds()
    .run(function() {
        console.log( 'now+30s every 10s until now+5m' );
    });

//every minute
scheduler().every().minute().run(function() {
    console.log( 'every minute' );
});

//every hour
scheduler().every().hour().run(function() {
    console.log( 'every hour' );
});

//every 2 hours
scheduler().every(2).hours().run(function() {
    console.log( 'every 2 hours' );
});

//every day
scheduler().every().day().run(function() {
    console.log( 'every day' );
});
//every second day
scheduler().every(2).days().run(function() {
    console.log( 'every 2 days' );
});