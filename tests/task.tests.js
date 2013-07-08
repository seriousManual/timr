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
                }).to.throw();
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
                expect(testTask2._from.format()).to.equal(nowMoment.format());
            });
        });

        describe('to', function() {
            it('should throw an error on invalid to date', function() {
                expect(function() {
                    new Task().to('asdf');
                }).to.throw();
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
                expect(testTask2._to.format()).to.equal(nowMoment.format());
            });
        });





//        describe('create date', function() {
//           var myTask;
//
//            beforeEach(function() {
//                myTask = new Task();
//            });
//
//            it('should', function() {
//                var now = moment().format();
//
//                myTask.every(10).seconds();
//
//                console.log( now );
//                console.log( myTask._calculateNextRun().format() );
//            });
//
//        });
//
    });

});