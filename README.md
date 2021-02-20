# schedule.js

This package provides functions to work with schedules (work hours, opening hours etc.).

## Contents
* [Installation](#installation)
* [Example](#example)
* [API](#api)
* [Implementation](#implementation)

## Installation

    npm i schedule.js
    
## Example

```typescript
import {DailySchedule, Holidays, joinSchedules, subtractSchedules, Weekends} from "schedule.js"

// Define the schedule: Mo-Fr, 08:00-17:00, break from 12:30 to 13:30
// Our worker doesn't work on weekends and holidays.
let workHours = DailySchedule("08:00", "17:00")
let breaks = DailySchedule("12:30", "13:30")
let weekends = Weekends()
let holidays = Holidays("DE", "BY") // Exclude holidays

let schedule = subtractSchedules(workHours, joinSchedules(weekends, breaks, holidays))

```

## API
### Overview

* [Schedules](#schedules)
  * [Daily Schedule](#daily-schedule)
  * [Regular Schedule](#regular-schedule)
  * [Schedule from Intervals](#schedule-from-intervals)
  * [Holidays](#holidays)
  * [Weekdays](#weekdays)
  * [Simple Schedules](#simple-schedules)
* [Operations](#operations)
  * [Invert](#invert)
  * [Join](#join)
  * [Intersect](#intersect)
  * [Subtract](#subtract)
  * [Symmetric Difference](#symmetric-difference)
  * [Shift](#shift)
* [Miscellaneous](#miscellaneous)
  * [Add Duration](#add-duration)
  * [Is within Schedule](#iswithinschedule)

### Schedules
#### Daily Schedule

```typescript
import {DailySchedule, parseISO, take} from "schedule.js"

let startDate = parseISO("2020-09-01T00:00Z")

let workHours = DailySchedule("08:00", "17:00")
for (let interval of take(workHours(startDate), 3)) {
    console.log(interval.toISO())
}
// 2020-09-01T08:00:00.000+02:00/2020-09-01T17:00:00.000+02:00
// 2020-09-02T08:00:00.000+02:00/2020-09-02T17:00:00.000+02:00
// 2020-09-03T08:00:00.000+02:00/2020-09-03T17:00:00.000+02:00


// Normally schedule.js will take the local time zone. However you can specify
// a custom IANA time zone.
let workHoursInTokyo = DailySchedule("08:00", "21:00", {timeZone: "Asia/Tokyo"})
for (let interval of take(workHoursInTokyo(startDate), 3)) {
    console.log(interval.toISO())
}
// 2020-09-01T02:00:00.000+02:00/2020-09-01T21:00:00.000+09:00
// 2020-09-02T08:00:00.000+09:00/2020-09-02T21:00:00.000+09:00
// 2020-09-03T08:00:00.000+09:00/2020-09-03T21:00:00.000+09:00
```

#### Regular Schedule
```typescript
import {durationFromDurationObject, parseISO, RegularSchedule, take} from "schedule.js"

let newYear = parseISO("2020-01-01T00:00:00.000+0100")
let everySixWeeksForOneDay = RegularSchedule(newYear, durationFromDurationObject({days: 1}), durationFromDurationObject({weeks: 6}))

let startDate = parseISO("2020-09-01T00:00Z")
for (let interval of take(everySixWeeksForOneDay(startDate), 3)) {
    console.log(interval.toISO())
}
// 2020-09-09T00:00:00.000+02:00/2020-09-10T00:00:00.000+02:00
// 2020-10-21T00:00:00.000+02:00/2020-10-22T00:00:00.000+02:00
// 2020-12-02T00:00:00.000+01:00/2020-12-03T00:00:00.000+01:00 
```

#### Schedule from Intervals

```typescript
import {Interval, intervalFromISOStrings, parseISO, ScheduleFromIntervals, take} from "schedule.js"


let intervals: Array<Interval> = [
    intervalFromISOStrings({
        start: "2020-08-22T00:00:00.000+0200",
        end: "2020-08-31T00:00:00.000+0200"
    }),
    intervalFromISOStrings({
        start: "2020-12-24T14:00:00.000+0100",
        end: "2021-01-08T00:00:00.000+0100"
    })
]
let myHolidays = ScheduleFromIntervals(...intervals)

let startDate = parseISO("2020-01-01T00:00Z")
for (let interval of take(myHolidays(startDate), 3)) {
    console.log(interval.toISO())
}
// 2020-08-22T00:00:00.000+02:00/2020-08-31T00:00:00.000+02:00
// 2020-12-24T14:00:00.000+01:00/2021-01-08T00:00:00.000+01:00 
```

#### Holidays
```typescript
import {Holidays, parseISO, take} from "schedule.js"

let publicHolidaysInBavaria = Holidays("DE", "BY", {types: ["public"]})

let startDate = parseISO("2020-09-01T00:00Z")
for (let interval of take(publicHolidaysInBavaria(startDate), 3)) {
    console.log(interval.toISO())
}
// 2020-10-03T00:00:00.000+02:00/2020-10-04T00:00:00.000+02:00
// 2020-11-01T00:00:00.000+01:00/2020-11-02T00:00:00.000+01:00
// 2020-12-25T00:00:00.000+01:00/2020-12-27T00:00:00.000+01:00 
```

The holiday calender is created by the excellent [date-holidays](https://github.com/commenthol/date-holidays) package.
The signature of `Holidays` matches the signature of date-holidays `init` method. For details consult date-holidays documentation.

#### Weekdays
```typescript
import {Mondays, parseISO, take, Weekends, WorkingDays} from "schedule.js"

let startDate = parseISO("2020-09-01T00:00Z")

let mondays = Mondays()
for (let interval of take(mondays(startDate), 3)) {
    console.log(interval.toISO())
}
// 2020-09-07T00:00:00.000+02:00/2020-09-08T00:00:00.000+02:00
// 2020-09-14T00:00:00.000+02:00/2020-09-15T00:00:00.000+02:00
// 2020-09-21T00:00:00.000+02:00/2020-09-22T00:00:00.000+02:00

let weekends = Weekends()
for (let interval of take(weekends(startDate), 3)) {
    console.log(interval.toISO())
}
// 2020-09-05T00:00:00.000+02:00/2020-09-07T00:00:00.000+02:00
// 2020-09-12T00:00:00.000+02:00/2020-09-14T00:00:00.000+02:00
// 2020-09-19T00:00:00.000+02:00/2020-09-21T00:00:00.000+02:00

let workingDays = WorkingDays()
for (let interval of take(workingDays(startDate), 3)) {
    console.log(interval.toISO())
}
// 2020-09-01T02:00:00.000+02:00/2020-09-05T00:00:00.000+02:00
// 2020-09-07T00:00:00.000+02:00/2020-09-12T00:00:00.000+02:00
// 2020-09-14T00:00:00.000+02:00/2020-09-19T00:00:00.000+02:00

let workingDaysInTokyo = WorkingDays({timeZone: "Asia/Tokyo"})
for (let interval of take(workingDaysInTokyo(startDate), 3)) {
    console.log(interval.toISO())
}
// 2020-09-01T02:00:00.000+02:00/2020-09-05T00:00:00.000+09:00
// 2020-09-07T00:00:00.000+09:00/2020-09-12T00:00:00.000+09:00
// 2020-09-14T00:00:00.000+09:00/2020-09-19T00:00:00.000+09:00 
```

#### Simple Schedules
```typescript
import {From, parseISO, Until} from "schedule.js"

let from = From(parseISO("2020-09-01T00:00Z"))
console.log(from(parseISO("2020-08-01T00:00Z")).next().value.toISO())
// 2020-09-01T02:00:00.000+02:00/+10000-01-01T00:59:59.999+01:00

let until = Until(parseISO("2020-09-01T00:00Z"))
console.log(until(parseISO("2020-08-01T00:00Z")).next().value.toISO())
// 2020-08-01T02:00:00.000+02:00/2020-09-01T02:00:00.000+02:00 
```

### Operations
#### Invert
```typescript
import {DailySchedule, invertSchedule, parseISO, take} from "schedule.js"

let workHours = DailySchedule("08:00", "17:00")
let offHours = invertSchedule(workHours)


let startDate = parseISO("2020-09-01T10:00:00Z")
for (let interval of take(offHours(startDate), 3)) {
    console.log(interval.toISO())
}
// 2020-09-01T17:00:00.000+02:00/2020-09-02T08:00:00.000+02:00
// 2020-09-02T17:00:00.000+02:00/2020-09-03T08:00:00.000+02:00
// 2020-09-03T17:00:00.000+02:00/2020-09-04T08:00:00.000+02:00 
```
#### Join
```typescript
import {joinSchedules, parseISO, take, Thursdays, Weekends} from "schedule.js"

let weekendOrThursday = joinSchedules(Weekends(), Thursdays())

let startDate = parseISO("2020-09-01T10:00:00Z")
for (let interval of take(weekendOrThursday(startDate), 3)) {
    console.log(interval.toISO())
}

// 2020-09-03T00:00:00.000+02:00/2020-09-04T00:00:00.000+02:00
// 2020-09-05T00:00:00.000+02:00/2020-09-07T00:00:00.000+02:00
// 2020-09-10T00:00:00.000+02:00/2020-09-11T00:00:00.000+02:00 
```

#### Intersect
```typescript
import {DailySchedule, intersectSchedules, Mondays, parseISO, take} from "schedule.js"

let mondayEvenings = intersectSchedules(DailySchedule("20:00", "00:00"), Mondays())

let startDate = parseISO("2020-09-02")
for (let interval of take(mondayEvenings(startDate), 3)) {
    console.log(interval.toISO())
}
// 2020-09-07T20:00:00.000+02:00/2020-09-08T00:00:00.000+02:00
// 2020-09-14T20:00:00.000+02:00/2020-09-15T00:00:00.000+02:00
// 2020-09-21T20:00:00.000+02:00/2020-09-22T00:00:00.000+02:00 
```

#### Subtract
```typescript
import {DailySchedule, parseISO, subtractSchedules, take} from "schedule.js"

let workHours = DailySchedule("08:00", "17:00")
let breaks = DailySchedule("12:30", "13:30")
let workTime = subtractSchedules(workHours, breaks)

let startDate = parseISO("2020-09-02")
for (let interval of take(workTime(startDate), 3)) {
    console.log(interval.toISO())
}
// 2020-09-02T08:00:00.000+02:00/2020-09-02T12:30:00.000+02:00
// 2020-09-02T13:30:00.000+02:00/2020-09-02T17:00:00.000+02:00
// 2020-09-03T08:00:00.000+02:00/2020-09-03T12:30:00.000+02:00 
```

#### Symmetric Difference
```typescript
import {DailySchedule, parseISO, symmetricDifferenceOfSchedules, take} from "schedule.js"

let hoursWorker1 = DailySchedule("08:00", "17:00")
let hoursWorker2 = DailySchedule("09:00", "18:00")
let onlyOneWorkerAvailable = symmetricDifferenceOfSchedules(hoursWorker1, hoursWorker2)

let startDate = parseISO("2020-09-02")
for (let interval of take(onlyOneWorkerAvailable(startDate), 3)) {
    console.log(interval.toISO())
}
// 2020-09-02T08:00:00.000+02:00/2020-09-02T09:00:00.000+02:00
// 2020-09-02T17:00:00.000+02:00/2020-09-02T18:00:00.000+02:00
// 2020-09-03T08:00:00.000+02:00/2020-09-03T09:00:00.000+02:00 
```

#### Shift
```typescript
import {durationFromDurationObject, Mondays, parseISO, shiftSchedule, take} from "schedule.js"

let mondayNoonToTuesdayNoon = shiftSchedule(Mondays(), durationFromDurationObject({hours: 12}))

let startDate = parseISO("2020-09-02")
for (let interval of take(mondayNoonToTuesdayNoon(startDate), 3)) {
    console.log(interval.toISO())
}
// 2020-09-07T12:00:00.000+02:00/2020-09-08T12:00:00.000+02:00
// 2020-09-14T12:00:00.000+02:00/2020-09-15T12:00:00.000+02:00
// 2020-09-21T12:00:00.000+02:00/2020-09-22T12:00:00.000+02:00 
```

### Miscellaneous
#### Add Duration
```typescript
import {addDurationWithinSchedule, DailySchedule, durationFromDurationObject, parseISO} from "schedule.js"

let schedule = DailySchedule("08:00", "17:00")
let projectEnd = addDurationWithinSchedule(parseISO("2020-09-01T10:00:00Z"), durationFromDurationObject({hours: 13}), schedule)

console.log(projectEnd.toISO())
// 2020-09-02T16:00:00.000+02:00 
```
#### isWithinSchedule
```typescript
import {DailySchedule, isWithinSchedule, parseISO} from "schedule.js"

let schedule = DailySchedule("08:00", "17:00")
console.log(isWithinSchedule(parseISO("2020-01-08T11:00:00.000+0100"), schedule)) // true
console.log(isWithinSchedule(parseISO("2020-01-08T03:00:00.000+0100"), schedule)) // false
 
```

## Implementation
### Definition of a schedule
The basis of schedule.js is the definition of a schedule:

```typescript
type Schedule = (startDate: Date | number, direction?: direction) => IterableIterator<Interval>
```

It is a generator that receives a date and a direction (defaults to "forward") and yields intervals.
