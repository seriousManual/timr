# timr [![Build Status](https://travis-ci.org/seriousManual/timr.png)](https://travis-ci.org/seriousManual/timr)

[![NPM](https://nodei.co/npm/timr.png)](https://nodei.co/npm/timr/)

[![NPM](https://nodei.co/npm-dl/timr.png?months=3)](https://nodei.co/npm/timr/)

timr offers a scheduling interface for a cron like job execution.

## installation

````bash
npm install timr
````

## example
```javascript
var moment = require('moment');

var timr = require('timr');

var scheduler = timr();

////every 15 seconds
scheduler().every(15).seconds().run(function() {
    console.log( 'every 15 seconds' );
});

//start 30 seconds from now, execute every 10 seconds, end in 5 minutes from now
var from = moment().add('seconds', 30);
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

### creates a task construction function
```javascript
var timr = require('timr');

var taskConstructor = timr();
```

the scheduler object is exposed at the task constructor:
```javascript
var timr = require('timr');

var taskConstructor = timr();

console.log( taskConstructor.scheduler );
```

when a attached task is executed, the parent scheduler also emits a execution event
```javascript
var timr = require('timr');

var taskConstructor = timr();

//...create some tasks...

taskConstructor.scheduler.on('execute', function(name, task) {
    //universal handler for all tasks attached to the scheduler
});
```

## task

### modifiers
specify how often and when a task should be performed.

#### when
via the methods `.from(timestamp)` and `.to(timestamp)` the period of time can be specified in which the task should be performed.
these methods can be used in every combination or can be omitted completely. (which would case a task to run instantly and indefinitely.

#### how often
the quantifier `.every(n)` in combination with a interval modifier like `.hour()`, `.minute()` etc defines how often a task gets executed.

for example the expression `task.every(2).minutes()` executes the task every 2 minutes.
there are five interval modifiers: `.second()`, `.minute()`, `.hour()`, `.day()`, `.month()`
for every modifier also the plural form is valid. (e.g. `.minutes()` instead of `.minute()`)

### creation
tasks geht automatically attached to the parent scheduler object
```javascript
var myTask = taskConstructor();
```

there are multiple ways of invoking a task.

#### anonymous (one callback)
creates the task, configures it to run every minute and runs the callback assigned in the run handler
```javascript
taskConstructor().every().minute().run(function() { ... });
```

#### anonymous (multiple callbacks)
creates the task, configures it to run every minute and runs each callback.
```javascript
taskConstructor()
  .every().minute()
  .run(function() { ... })
  .run(function() { ... })
  .run(function() { ... });
```

#### named (event handler attached to the task)
creates the task, configures it to run every minute and runs the callback assigned in the run handler.

 `run` has to be called.
```javascript
var myTask = taskConstructor().every().minute();

myTask.on('execute', function() {
  // ...
});

myTask.on('execute', function() {
  // ...
});

myTask.run();
```

#### event handler attached to the scheduler
creates the task, configures it to run every minute and runs the callback assigned in the run handler.

 `run` has to be called.
```javascript
taskConstructor().every().minute().run();
taskConstructor().every(2).hours().run();

taskConstructor.scheduler.on('execute', function(name, task) {
  // gets invoked every minute and every second hour
});
```

## tests
`npm test`
