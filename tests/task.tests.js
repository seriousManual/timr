var expect = require('chai').expect;
var sinon = require('sinon');
var moment = require('moment');

var Task = require('../lib/Task');

describe('timr', function() {
    describe('tasks', function() {
        describe('from', function() {
            it('should throw an error on invalid from date', function() {
                expect(function() {
                    new Task().from('asdf');
                }).to.throw(/invalid timestamp/);
            });

            it('should accept all kinds of dates', function() {
                var nowMoment = moment();
                var nowDate = new Date(nowMoment.format());
                var nowString = nowMoment.toString();

                var testTask1 = new Task().from(nowMoment);
                var testTask2 = new Task().from(nowDate);
                var testTask3 = new Task().from(nowString);

                expect(testTask1._from.format()).to.equal(nowMoment.format());
                expect(testTask2._from.format()).to.equal(nowMoment.format());
                expect(testTask3._from.format()).to.equal(nowMoment.format());
            });
        });

        describe('to', function() {
            it('should throw an error on invalid to date', function() {
                expect(function() {
                    new Task().to('asdf');
                }).to.throw(/invalid timestamp/);
            });

            it('should accept all kinds of dates', function() {
                var nowMoment = moment();
                var nowDate = new Date(nowMoment.format());
                var nowString = nowMoment.toString();

                var testTask1 = new Task().to(nowMoment);
                var testTask2 = new Task().to(nowDate);
                var testTask3 = new Task().to(nowString);

                expect(testTask1._to.format()).to.equal(nowMoment.format());
                expect(testTask2._to.format()).to.equal(nowMoment.format());
                expect(testTask3._to.format()).to.equal(nowMoment.format());
            });
        });

        describe('identification', function() {
            var myTask;
            var NAME = 'foo';

            beforeEach(function() {
                myTask = new Task();
            });

            it('should set a name', function() {
                myTask.name(NAME);
                expect(myTask._name).to.equal(NAME);
            });

            it('should create a name', function() {
                var from = moment('2013-01-01');
                myTask._from = from;
                myTask._interval = 'm';
                myTask._modifier = '1';

                expect(myTask.ident()).to.equal(from.format() + '-x_m_1');
            });

            it('should return the name if set', function() {
                myTask.name(NAME);
                expect(myTask.ident()).to.equal(NAME);
            });

            it('should return the created name if no name is set', function() {
                var from = moment('2013-01-01');
                myTask._from = from;
                myTask._interval = 'm';
                myTask._modifier = '1';

                expect(myTask.ident()).to.equal(from.format() + '-x_m_1');
            });
        });

        describe('execution', function() {
            var myTask;
            var event = false;

            before(function() {
                myTask = new Task();
                myTask.on('execute', function() {
                    event = true;
                });

                myTask.execute();
            });

            it('should emit an execution event', function() {
                expect(event).to.be.true;
            });
        });

        describe('clear', function() {
            var mock = {
                clear: sinon.spy()
            };

            it('should should call clear on the Run', function() {
                myTask = new Task();
                myTask._currentRun = mock;

                myTask.clear();

                expect(mock.clear.called).to.be.true;
            });
        });

        describe('scheduled', function() {
            it('should return true', function() {
                var t = new Task();
                t._currentRun = true;

                expect(t.scheduled()).to.be.true;
            });

            it('should return false', function() {
                var t = new Task();

                expect(t.scheduled()).to.be.false;
            });
        });

        describe('modifiers', function () {
            describe('month', function() {
                var t;

                beforeEach(function() {
                    t = new Task();
                });

                it('should be equal', function() {
                    var m = moment().add(1, 'month');

                    t.every(1).month();

                    expect(t._calculateNextRun(false).format()).to.be.equal(m.format());
                });

                it('should be equal', function() {
                    var m = moment().add(2, 'months');

                    t.every(2).months();

                    expect(t._calculateNextRun(false).format()).to.be.equal(m.format());
                });
            });
        });
    });

});