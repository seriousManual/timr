var Task = require('./Task');

function Scheduler() {
    this._tasks = [];
}

Scheduler.prototype.every = function(interval) {
    var tmpTask = new Task();

    tmpTask.interval(interval ? +interval : 1);

    this._tasks.push(tmpTask);

    return tmpTask;
};

module.exports = Scheduler;