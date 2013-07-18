var util = require('util');
var EventEmitter = require('events').EventEmitter;

var moment = require('moment');

var Run = require('./Run');

/**
 * represents a periodically executed task
 *
 * @constructor
 */
function Task() {
    EventEmitter.call(this);

    this._from = moment();
    this._to = null;
    this._interval = null;
    this._modifier = null;
    this._currentRun = null;

    this._name = null;
}
util.inherits(Task, EventEmitter);

/**
 * returns the name of a certain task (if set), build an identificator otherwise
 *
 * @return {string}
 */
Task.prototype.ident = function() {
    return this._name || this._createName();
};

/**
 * returns the name of a certain task (if set)
 *
 * @param name
 * @return {*}
 */
Task.prototype.name = function(name) {
    this._name = name;

    return this;
};

/**
 * creates the identificator
 *
 * @return {String}
 * @private
 */
Task.prototype._createName = function() {
    return  (this._from ? this._from.format() : 'x') + '-' +
            (this._to ? this._to.format() : 'x') + '_' +
            this._interval + '_' +
            this._modifier;
};

/**
 * executes the target of the task
 */
Task.prototype.execute = function() {
    this.emit('execute');
};

/**
 * cancels all scheduled runs
 */
Task.prototype.clear = function () {
    if (this._currentRun) {
        this._currentRun.clear();
    }
};

/**
 * states if a run is scheduled
 *
 * @return {Boolean}
 */
Task.prototype.scheduled = function () {
    return this._currentRun !== null;
};

/**
 * triggers the task to be executed
 *
 * @param client
 * @return {*}
 */
Task.prototype.run = function (client) {
    this._schedule(true);

    if(client) {
        this.on('execute', client);
    }

    return this;
};

/**
 * schedules the next execution of a task
 *
 * @param initial
 * @private
 */
Task.prototype._schedule = function(initial) {
    var that = this;
    initial = !!initial;

    if(this.scheduled()) {
        return;
    }

    var timeNextRun = this._calculateNextRun(initial);

    if(!timeNextRun) {
        return;
    }

    this._currentRun = new Run(timeNextRun);

    this._currentRun.execute(function() {
        that._currentRun = null;

        that.execute();

        //rescheduling
        that._schedule(false);
    });
};

/**
 * calculates when the next run has to be done
 *
 * @param initial
 * @return {*}
 * @private
 */
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
/**
 * sts the interval of the task execution
 *
 * @param interval
 * @return {*}
 */
Task.prototype.every = function(interval) {
    this._interval = (interval ? +interval : 1);

    return this;
};

/**
 * sets the execution modifier to day
 *
 * @type {Function}
 */
Task.prototype.days = Task.prototype.day = function () {
    this._modifier = 'days';

    return this;
};

/**
 * sets the execution modifier to hour
 *
 * @type {Function}
 */
Task.prototype.hour = Task.prototype.hours = function () {
    this._modifier = 'hours';

    return this;
};

/**
 * sets the execution modifier to minute
 *
 * @type {Function}
 */
Task.prototype.minute = Task.prototype.minutes = function () {
    this._modifier = 'minutes';

    return this;
};

/**
 * sets the execution modifier to second
 *
 * @type {Function}
 */
Task.prototype.second = Task.prototype.seconds = function () {
    this._modifier = 'seconds';

    return this;
};

/**
 * sets the timestamp of the first execution
 *
 * @param from
 * @return {*}
 */
Task.prototype.from = function(from) {
    if(moment(from).isValid()) {
        this._from = moment(from);
    } else {
        throw new Error('invalid from date');
    }

    return this;
};

/**
 * sets the timestamp after that no execution schould be performed anymore
 *
 * @param to
 * @return {*}
 */
Task.prototype.to = function(to) {
    if(moment(to).isValid()) {
        this._to = moment(to);
    } else {
        throw new Error('invalid to date');
    }

    return this;
};

module.exports = Task;