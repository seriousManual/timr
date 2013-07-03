var util = require('util');
var EventEmitter = require('events').EventEmitter;

function Scheduler() {
    this._tasks = [];
}

util.inherits(Scheduler, EventEmitter);

Scheduler.prototype.addTask = function(task) {
    var that = this;

    this._tasks.push(task);

    task.on('execute', function() {
        that.emit('execute', task.ident(), task);
    });
};

module.exports = Scheduler;