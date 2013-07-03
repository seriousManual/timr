var Task = require('./lib/Task');
var Scheduler = require('./lib/Scheduler');

module.exports = function() {
    var myScheduler = new Scheduler();

    var tmpF = function() {
        var myTask = new Task();

        myScheduler.addTask(myTask);

        return myTask;
    };

    tmpF.scheduler = myScheduler;

    return tmpF;
};