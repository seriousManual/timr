var timeUnits = require('./timeUnits');
var Task = require('./Task');

function Scheduler() {
    this._tasks = [];
}

Scheduler.prototype.every = function(interval) {
    var tmpTask = new Task();

    tmpTask.interval(interval ? +interval : 1);

    this._tasks.push(tmpTask);

    //TODO: schedule job when the run statement has been invoked

    return tmpTask;
};

Scheduler.prototype._schedule = function(task) {
    var timeToNextRun = this._calculateNextRun(task);

    var foo = function() {

    };

    var timerHandle = setTimeout(braten, timeToNextRun);

    task.timerHandle(timerHandle);
};

Scheduler.prototype._calculateNextRun = function(task) {
    return 1000;
};

module.exports = Scheduler;