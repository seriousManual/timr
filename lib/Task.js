var util = require('util');
var EventEmitter = require('events').EventEmitter;

var moment = require('moment');

function Task() {
    EventEmitter.call(this);

    this._from = moment();
    this._to = null;
    this._interval = null;
    this._modifier = null;
    this._timerHandle = null;

    this._name = null;
}
util.inherits(Task, EventEmitter);

Task.prototype.ident = function() {
    return this._name || this._createName();
};

Task.prototype.name = function(name) {
    this._name = name;

    return this;
};

Task.prototype._createName = function() {
    return  (this._from ? this._from.format() : 'x') + '-' +
            (this._to ? this._to.format() : 'x') + '_' +
            this._interval + '_' +
            this._modifier;
};

Task.prototype.execute = function() {
    this.emit('execute');
};

Task.prototype.clear = function () {
    if (this._timerHandle) {
        clearTimeout(this._timerHandle);
    }
};

Task.prototype.timerHandle = function (handle) {
    if (handle !== undefined) {
        this._timerHandle = handle;
    }

    return this._timerHandle;
};

Task.prototype.scheduled = function () {
    return this._timerHandle !== null;
};

Task.prototype.run = function (client) {
    this.schedule(true);

    if(client) {
        this.on('execute', client);
    }


    return this;
};

Task.prototype.schedule = function(initial) {
    initial = !!initial;

    if(this.scheduled()) {
        return;
    }

    var that = this;
    var nextRun = this._calculateNextRun(initial);

    if(!nextRun) {
        return;
    }

    var timeToNextRun = nextRun.valueOf() - moment().valueOf();

    var timerHandle = setTimeout(function() {
        that.timerHandle(null);

        that.execute();

        //rescheduling
        that.schedule(false);
    }, timeToNextRun);

    that.timerHandle(timerHandle);
};

Task.prototype._calculateNextRun = function(initial) {
    var now = moment();

    if(this._to && now.valueOf() > this._to.valueOf()) {
        return;
    }

    if(this._from && now.valueOf() < this._from.valueOf()) {
        return this._from;
    } else {
        if(initial) {
            return now;
        } else {
            return now.add(this._modifier, this._interval);
        }
    }
};

//------------------------ modifiers -------------------------------------

Task.prototype.every = function(interval) {
    this._interval = (interval ? +interval : 1);

    return this;
};

Task.prototype.days = Task.prototype.day = function () {
    this._modifier = 'days';

    return this;
};

Task.prototype.hour = Task.prototype.hours = function () {
    this._modifier = 'hours';

    return this;
};

Task.prototype.minute = Task.prototype.minutes = function () {
    this._modifier = 'minutes';

    return this;
};

Task.prototype.second = Task.prototype.seconds = function () {
    this._modifier = 'seconds';

    return this;
};

Task.prototype.from = function(from) {
    if(moment(from).isValid()) {
        this._from = moment(from);
    } else {
        throw new Error('invalid from date');
    }

    return this;
};

Task.prototype.to = function(to) {
    if(moment(to).isValid()) {
        this._to = moment(to);
    } else {
        throw new Error('invalid to date');
    }

    return this;
};

module.exports = Task;