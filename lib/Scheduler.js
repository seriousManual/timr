var timeUnits = require('./timeUnits');

function Scheduler() {
    this._tasks = [];
}

Scheduler.prototype.addTask = function(task) {
    this._tasks.push(task);
};

module.exports = Scheduler;