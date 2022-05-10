/* Your Code Here */
function createEmployeeRecord(employeeInfo) {
    const employeeObj = {
        firstName: employeeInfo[0],
        familyName: employeeInfo[1],
        title: employeeInfo[2],
        payPerHour: employeeInfo[3],
        timeInEvents: [],
        timeOutEvents: [],
    };
    return employeeObj
}

function createEmployeeRecords(employeeArray) {
    return employeeArray.map(employee => createEmployeeRecord(employee))
}

function createTimeInEvent(dateStamp) {
    let [date, hour] = dateStamp.split(' ');
    
    this.timeInEvents.push({
        type: 'TimeIn',
        hour: parseInt(hour, 10),
        date,
    });
    
    return this;

};

function createTimeOutEvent(dateStamp) {
    let [date, hour] = dateStamp.split(' ');
    
    this.timeOutEvents.push({
        type: 'TimeOut',
        hour: parseInt(hour, 10),
        date,
    });
    
    return this;
}

function hoursWorkedOnDate(date) {
    let inTime = this.timeInEvents.find(function(e) {
        return e.date === date
    })
    let outTime = this.timeOutEvents.find(function(e) {
        return e.date === date
    })
    // const amtOfDays = this['timeInEvents'].length
    // const totalHours = []
    // for (let i = 0; i < amtOfDays; i++) {
    //     if (this.timeInEvents[i].date === date) {
    //         if (this.timeInEvents[i].date === this.timeOutEvents[i].date) {
    //             totalHours.push((this.timeOutEvents[i].hour - this.timeInEvents[i].hour) / 100)
    //         }
    //     }
    // }
    return (outTime.hour - inTime.hour) / 100
}

function wagesEarnedOnDate(date) {
    return hoursWorkedOnDate.call(this, date) * this.payPerHour
}

function findEmployeeByFirstName(employees, firName) {
    return employees.find(employee => employee.firstName === firName)
}

// function calculatePayroll(employees) {
//     const allPay = employees.reduce(function(accum, employee) {
//         return accum + allWagesFor.call(employee)
//     }, 0)
//     return allPay
// }
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

function calculatePayroll(employees) {
    return employees.reduce(function(accum, employee) {
        return accum + allWagesFor.call(employee)
    }, 0)
    //return allPay
}





const csvDataEmployees = [
    ["Thor", "Odinsson", "Electrical Engineer", 45],
    ["Loki", "Laufeysson-Odinsson", "HR Representative", 35],
    ["Natalia", "Romanov", "CEO", 150],
    ["Darcey", "Lewis", "Intern", 15],
    ["Jarvis", "Stark", "CIO", 125],
    ["Anthony", "Stark", "Angel Investor", 300]
  ]

  const csvTimesIn = [
    ["Thor", ["2018-01-01 0800", "2018-01-02 0800", "2018-01-03 0800"]],
    ["Loki", ["2018-01-01 0700", "2018-01-02 0700", "2018-01-03 0600"]],
    ["Natalia", ["2018-01-03 1700", "2018-01-05 1800", "2018-01-03 1300"]],
    ["Darcey", ["2018-01-01 0700", "2018-01-02 0800", "2018-01-03 0800"]],
    ["Jarvis", ["2018-01-01 0500", "2018-01-02 0500", "2018-01-03 0500"]],
    ["Anthony", ["2018-01-01 1400", "2018-01-02 1400", "2018-01-03 1400"]]
  ]

  const csvTimesOut = [
    ["Thor", ["2018-01-01 1600", "2018-01-02 1800", "2018-01-03 1800"]],
    ["Loki", ["2018-01-01 1700", "2018-01-02 1800", "2018-01-03 1800"]],
    ["Natalia", ["2018-01-03 2300", "2018-01-05 2300", "2018-01-03 2300"]],
    ["Darcey", ["2018-01-01 1300", "2018-01-02 1300", "2018-01-03 1300"]],
    ["Jarvis", ["2018-01-01 1800", "2018-01-02 1800", "2018-01-03 1800"]],
    ["Anthony", ["2018-01-01 1600", "2018-01-02 1600", "2018-01-03 1600"]]
  ]
  const employeeRecords = createEmployeeRecords(csvDataEmployees)
  employeeRecords.forEach(function (rec) {
    let timesInRecordRow = csvTimesIn.find(function (row) {
      return rec.firstName === row[0]
    })

    let timesOutRecordRow = csvTimesOut.find(function (row) {
      return rec.firstName === row[0]
    })

    timesInRecordRow[1].forEach(function(timeInStamp){
      createTimeInEvent.call(rec, timeInStamp)
    })

    timesOutRecordRow[1].forEach(function(timeOutStamp){
      createTimeOutEvent.call(rec, timeOutStamp)
    })
  })
calculatePayroll(employeeRecords)