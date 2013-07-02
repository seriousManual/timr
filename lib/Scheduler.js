var timeUnits = require('./timeUnits');
var Task = require('./Task');

function Scheduler() {
    this._tasks = [];
}

Scheduler.prototype.every = function(interval) {
    var tmpTask = new Task();

    tmpTask.interval(interval ? +interval : 1);

    this._tasks.push(tmpTask);

    //TODO: schedule job when the run statement has been invoked (eventhandler for the run statement?)

    return tmpTask;
};

Scheduler.prototype._schedule = function(task) {
    var that = this;
    var timeToNextRun = this._calculateNextRun(task);

    var timerHandle = setTimeout(function() {
        task.run();

        //rescheduling
        that._schedule(task);
    }, timeToNextRun);

    task.timerHandle(timerHandle);
};

Scheduler.prototype._calculateNextRun = function(task) {
    return 1000;
};

module.exports = Scheduler;