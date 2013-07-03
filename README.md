# timr

timr offers a scheduling interface for a cron like job execution.

## invocation
```javascript
var moment = require('moment');

var timr = require('../');

var scheduler = timr();

////every 15 seconds
scheduler().every(15).seconds().run(function() {
    console.log( 'every 15 seconds' );
});

//start 30 seconds from now, execute every 10 seconds, end in 5 minutes from now
scheduler()
    .from(moment().add('seconds', 30))
    .to(moment().add('minutes', 5))
    .every(10).seconds()
    .run(function() {
        console.log( 'now+30s every 10s until now+5m' );
    });
```

## tests
`npm test`