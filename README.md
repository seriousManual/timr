# timr

work in progress!

## invocation
```javascript
var timr = require('../');

var scheduler = timr();

////every 5 seconds
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
```

## tests
`npm test`