# timr

timr offers a scheduling interface for a cron like job execution.

## example
```javascript
var moment = require('moment');

var timr = require('../');

var scheduler = timr();

////every 15 seconds
scheduler().every(15).seconds().run(function() {
    console.log( 'every 15 seconds' );
});

//start 30 seconds from now, execute every 10 seconds, end in 5 minutes from now
var from = moment).add('seconds', 30);
var to = moment().add('minutes', 5);

scheduler()
    .from(from)
    .to(to)
    .every(10).seconds()
    .run(function() {
        console.log( 'now+30s every 10s until now+5m' );
    });
```

## scheduler
a scheduler holds a collection of tasks. every task is created via the task construction function.

### create a task construction function
```javascript
var timr = require('../');

var taskConstructor = timr();
```

the scheduler object is exposed at the task constructor:
```javascript
var timr = require('../');

var taskConstructor = timr();

console.log( taskConstructor.scheduler );
```

when a attached task is executed, the parent scheduler also emits a execution event
```javascript
var timr = require('../');

var taskConstructor = timr();

taskConstructor.scheduler.on('execute', function(name, task) {
    //universal handler for all tasks attached to the scheduler
});
```

## tests
`npm test`