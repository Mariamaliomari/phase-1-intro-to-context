// Your code here

function createEmployeeRecord (details){
    return {
        firstName: details[0],
        familyName: details[1],
        title: details[2],
        payPerHour: details[3],
        timeInEvents: [],
        timeOutEvents: []
    }
}

function createEmployeeRecords(employeeDetailsData) {
    return employeeDetailsData.map(function(details){
        return createEmployeeRecord(details)
    })
}

let createTimeInEvent = function(employee, stampedDate){
    let [date, hour] = stampedDate.split(' ')

    employee.timeInEvents.push({
        type: "TimeIn",
        hour: parseInt(hour, 10),
        date: date
    })

    return employee
}

let createTimeOutEvent = function(employee, stampedDate){
    let [date, hour] = stampedDate.split(' ')

    employee.timeOutEvents.push({
        type: "TimeOut",
        hour: parseInt(hour, 10),
        date: date
    })

    return employee
}

function  hoursWorkedOnDate (employee, seekDate){
    let eventIn = employee.timeInEvents.find(function(employ){
        return employ.date === seekDate
    })

    let eventOut = employee.timeOutEvents.find(function(employ){
        return employ.date === seekDate
    })

    return (eventOut.hour - eventIn.hour) / 100
}

function  wagesEarnedOnDate (employee, dateSeek){
    let rawWages = hoursWorkedOnDate(employee, dateSeek)
        * employee.payPerHour
    return parseFloat(rawWages.toString())
}
function allWagesFor (employee){
    return  employee.timeInEvents.reduce(function(accumulator, currentDate){
        return accumulator + wagesEarnedOnDate( employee, currentDate)
    })
}

let findEmployeeByFirstName = function(srcArray, firstName) {
  return srcArray.find(function(record){
    return record.firstName === firstName
  })
}

let calculatePayroll = function(arrayOfEmployeeRecords){
    return arrayOfEmployeeRecords.reduce(function(memo, record){
        return memo + allWagesFor(record)
    }, 0)
}
function allWagesFor (employee){
    let acceptableDates = employee.timeInEvents.map(function(employee){
        return employee.date
    })

    let payable = acceptableDates.reduce(function (accumulator,currentDate){
        return accumulator + wagesEarnedOnDate(employee, currentDate)
    }, 0)

    return payable
}

function findEmployeeByFirstName (srcArray, firstName) {
  return srcArray.find(function(currentrecords){
    return currentrecords.firstName === firstName

  })
}
function  calculatePayroll(arrayEmployeeRecords){
    return arrayEmployeeRecords.reduce(function(accumulator, currentRecord){
        return accumulator + allWagesFor(currentRecord)
    }, 0)
}