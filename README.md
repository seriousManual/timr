# timr

work in progress!

## invocation
```javascript
var timr = require('../');

var scheduler = timr();

//every two minutes
scheduler.every(2).minutes().run(function() {});
//every minute
scheduler.every().minute().run(function() {});

//every 10 seconds
scheduler.every(10).seconds().run(function() {});

//every hour
scheduler.every().hour().run(function() {});

//every 2 hours
scheduler.every(2).hours().run(function() {});

//every day
scheduler.every().day().run(function() {});
//every second day
scheduler.every(2).days().run(function() {});
```

## tests
`npm test`