/* Your Code Here */

function createEmployeeRecord(array){
    const newEmployee = {
        firstName: array[0],
        familyName: array[1],
        title: array[2],
        payPerHour: array[3],
        timeInEvents: [],
        timeOutEvents: []
    }
    return newEmployee;
}

function createEmployeeRecords(array){
    const newArray = [];
    for(const element of array){
        newArray.push(createEmployeeRecord(element));
    }
    return newArray;
}

function createTimeInEvent(dateTime){
    this.timeInEvents.push({
        type: "TimeIn",
        hour: parseInt(dateTime.split(" ")[1], 10),
        date: dateTime.split(" ")[0]
    })
    return this;
}

function createTimeOutEvent(dateTime){
    this.timeOutEvents.push({
        type: "TimeOut",
        hour: parseInt(dateTime.split(" ")[1], 10),
        date: dateTime.split(" ")[0]
    })
    return this;
}

function hoursWorkedOnDate(targetDate){
    let hours = 0;
    for(let i = 0; i < this.timeOutEvents.length; i++){
        if(this.timeOutEvents[i].date === targetDate){
            hours = (this.timeOutEvents[i].hour - this.timeInEvents[i].hour) / 100;
        }
    }
    return hours;
}

function wagesEarnedOnDate(targetDate){
    return hoursWorkedOnDate.call(this, targetDate) * this.payPerHour;
}

/*
 We're giving you this function. Take a look at it, you might see some usage
 that's new and different. That's because we're avoiding a well-known, but
 sneaky bug that we'll cover in the next few lessons!

 As a result, the lessons for this function will pass *and* it will be available
 for you to use if you need it!
 */

const allWagesFor = function () {
    const eligibleDates = this.timeInEvents.map(function (e) {
        return e.date
    })

    const payable = eligibleDates.reduce(function (memo, d) {
        return memo + wagesEarnedOnDate.call(this, d)
    }.bind(this), 0) // <== Hm, why did we need to add bind() there? We'll discuss soon!

    return payable
}

function findEmployeeByFirstName(srcArray, firstName){
    return srcArray.find((employee) => {
        return employee.firstName === firstName
    })
}

function calculatePayroll(employees){
    return employees.reduce((accumulator, currentValue) => {
        return accumulator + allWagesFor.call(currentValue);
    }, 0);    
}