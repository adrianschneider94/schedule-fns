# schedule-fns

This package provides functions to work with schedules (work hours, opening hours etc.).
Its implementation and style are based on [date-fns](https://github.com/date-fns/date-fns).

## Installation

    npm i schedule-fns
    
## Usage

```typescript
import {addDuration, DailySchedule, Holidays, joinSchedules, subtractSchedules, take, Weekends} from "schedule-fns"
import {parseISO} from "date-fns"

// Define the schedule: Mo-Fr, 08:00-16:00, break from 12:30 to 13:30, German timezone.
// Our worker doesn't work on weekends and holidays.
let workHours = DailySchedule("08:00", "17:00", {timeZone: "Europe/Berlin"})

let breaks = DailySchedule("12:30", "13:30")
// You can drop the timezone, schedule-fns will use the system timezone then
let weekends = Weekends()
let holidays = Holidays("DE", "BY") // Exclude holidays

let schedule = subtractSchedules(workHours, joinSchedules(weekends, breaks, holidays))

// We want to know when 47 hours have passed in the schedule to determine the project deadline
// We'll start the project at 15:20 on Tuesday, April the 28st (German timezone)
let projectStart = parseISO("2020-04-28T15:20:00.000+0200")

// Let's look at the next 3 intervals
for (let interval of take(schedule(projectStart), 3)) {
    console.log(interval)
}
// { start: 2020-04-28T13:20:00.000Z, end: 2020-04-28T15:00:00.000Z }
// { start: 2020-04-29T06:00:00.000Z, end: 2020-04-29T10:30:00.000Z }
// { start: 2020-04-29T11:30:00.000Z, end: 2020-04-29T15:00:00.000Z }


// 47 hours are 5 full working days and 7 hours. But May the 1st is a public holiday in Germany.
// So we should finish on Thursday, May the 7th at 14:20.
let projectEnd = addDuration(projectStart, {hours: 47}, schedule)
console.log(projectEnd) // 2020-05-07T12:20:00.000Z which is 14:20 in German time

```

## API
### Schedules
#### DailySchedule

```typescript
import {DailySchedule, take} from "schedule-fns"
import {parseISO} from "date-fns"

let startDate = parseISO("2020-09-01T00:00Z")

let workHours = DailySchedule("08:00", "17:00") // Uses the system timezone
for (let interval of take(workHours(startDate), 3)) {
    console.log(interval)
}
// { start: 2020-09-01T06:00:00.000Z, end: 2020-09-01T15:00:00.000Z }
// { start: 2020-09-02T06:00:00.000Z, end: 2020-09-02T15:00:00.000Z }
// { start: 2020-09-03T06:00:00.000Z, end: 2020-09-03T15:00:00.000Z }

let workHoursInNewYork = DailySchedule("08:00", "17:00", {timeZone: "America/New_York"})
for (let interval of take(workHoursInNewYork(startDate), 3)) {
    console.log(interval)
}
// { start: 2020-09-01T12:00:00.000Z, end: 2020-09-01T21:00:00.000Z }
// { start: 2020-09-02T12:00:00.000Z, end: 2020-09-02T21:00:00.000Z }
// { start: 2020-09-03T12:00:00.000Z, end: 2020-09-03T21:00:00.000Z }

let partyHoursInTokyo = DailySchedule("10 pm", "3 am", {timeZone: "Asia/Tokyo", timeFormat: "h a"})
for (let interval of take(partyHoursInTokyo(startDate), 3)) {
    console.log(interval)
}
// { start: 2020-09-01T13:00:00.000Z, end: 2020-09-01T18:00:00.000Z }
// { start: 2020-09-02T13:00:00.000Z, end: 2020-09-02T18:00:00.000Z }
// { start: 2020-09-03T13:00:00.000Z, end: 2020-09-03T18:00:00.000Z }
```

#### RegularSchedule
```typescript
import {parseISO} from "date-fns"
import {RegularSchedule, take} from "schedule-fns"

let newYear = parseISO("2020-01-01T00:00:00.000+0200")
let everySixWeeksForOneDay = RegularSchedule(newYear, {days: 1}, {weeks: 6})

let startDate = parseISO("2020-09-01T00:00Z")
for (let interval of take(everySixWeeksForOneDay(startDate), 3)) {
    console.log(interval)
}
// { start: 2020-09-08T21:00:00.000Z, end: 2020-09-09T21:00:00.000Z }
// { start: 2020-10-20T21:00:00.000Z, end: 2020-10-21T21:00:00.000Z }
// { start: 2020-12-01T22:00:00.000Z, end: 2020-12-02T22:00:00.000Z } 
```

#### ScheduleFromIntervals

```typescript
import {Interval, parseISO} from "date-fns"
import {ScheduleFromIntervals, take} from "schedule-fns"


let intervals: Array<Interval> = [
    {start: parseISO("2020-08-22T00:00:00.000+0200"), end: parseISO("2020-08-31T00:00:00.000+0200")},
    {start: parseISO("2020-12-24T14:00:00.000+0200"), end: parseISO("2021-01-08T00:00:00.000+0200")}
]
let myHolidays = ScheduleFromIntervals(...intervals)

let startDate = parseISO("2020-01-01T00:00Z")
for (let interval of take(myHolidays(startDate), 3)) {
    console.log(interval)
}
// { start: 2020-08-21T22:00:00.000Z, end: 2020-08-30T22:00:00.000Z }
// { start: 2020-12-24T12:00:00.000Z, end: 2021-01-07T22:00:00.000Z } 
```

#### Holidays
```typescript
import {Holidays, take} from "schedule-fns"
import {parseISO} from "date-fns"

let publicHolidaysInBavaria = Holidays("DE", "BY", {types: ["public"]})

let startDate = parseISO("2020-09-01T00:00Z")
for (let interval of take(publicHolidaysInBavaria(startDate), 3)) {
    console.log(interval)
}
// { start: 2020-10-02T22:00:00.000Z, end: 2020-10-03T22:00:00.000Z }
// { start: 2020-10-31T23:00:00.000Z, end: 2020-11-01T23:00:00.000Z }
// { start: 2020-12-24T23:00:00.000Z, end: 2020-12-26T23:00:00.000Z } 
```

The holiday calender is created by the excellent [date-holidays](https://github.com/commenthol/date-holidays) package.
The signature of `Holidays` matches the signature of date-holidays `init` method. For details consult date-holidays documentation.

#### Weekdays
```typescript
import {Mondays, take, Thursdays, Weekends, WorkingDays} from "schedule-fns"
import {parseISO} from "date-fns"

let startDate = parseISO("2020-09-01T00:00Z")

let mondays = Mondays()
for (let interval of take(mondays(startDate), 3)) {
    console.log(interval)
}
// { start: 2020-09-06T22:00:00.000Z, end: 2020-09-07T22:00:00.000Z }
// { start: 2020-09-13T22:00:00.000Z, end: 2020-09-14T22:00:00.000Z }
// { start: 2020-09-20T22:00:00.000Z, end: 2020-09-21T22:00:00.000Z }

let thursdaysInJapan = Thursdays("Asia/Tokyo")
for (let interval of take(thursdaysInJapan(startDate), 3)) {
    console.log(interval)
}
// { start: 2020-09-02T15:00:00.000Z, end: 2020-09-03T15:00:00.000Z }
// { start: 2020-09-09T15:00:00.000Z, end: 2020-09-10T15:00:00.000Z }
// { start: 2020-09-16T15:00:00.000Z, end: 2020-09-17T15:00:00.000Z }

let weekends = Weekends()
for (let interval of take(weekends(startDate), 3)) {
    console.log(interval)
}
// { start: 2020-09-04T22:00:00.000Z, end: 2020-09-06T22:00:00.000Z }
// { start: 2020-09-11T22:00:00.000Z, end: 2020-09-13T22:00:00.000Z }
// { start: 2020-09-18T22:00:00.000Z, end: 2020-09-20T22:00:00.000Z }

let workingDays = WorkingDays()
for (let interval of take(workingDays(startDate), 3)) {
    console.log(interval)
}
// { start: 2020-09-01T00:00:00.000Z, end: 2020-09-04T22:00:00.000Z }
// { start: 2020-09-06T22:00:00.000Z, end: 2020-09-11T22:00:00.000Z }
// { start: 2020-09-13T22:00:00.000Z, end: 2020-09-18T22:00:00.000Z } 
```

#### Simple Schedules
```typescript
import {parseISO} from "date-fns"

import {From, Until} from "schedule-fns"

let from = From(parseISO("2020-09-01T00:00Z"))
console.log(from(parseISO("2020-08-01T00:00Z")).next().value)
// { start: 2020-09-01T00:00:00.000Z, end: +275760-09-13T00:00:00.000Z }

let until = Until(parseISO("2020-09-01T00:00Z"))
console.log(until(parseISO("2020-08-01T00:00Z")).next().value)
// { start: 2020-08-01T00:00:00.000Z, end: 2020-09-01T00:00:00.000Z } 
```

### Operations
#### Invert
```typescript
import {DailySchedule, invertSchedule, take} from "schedule-fns"
import {parseISO} from "date-fns"

let workHours = DailySchedule("08:00", "17:00", {timeZone: "Etc/UTC"})
let offHours = invertSchedule(workHours)


let startDate = parseISO("2020-09-01T10:00:00Z")
for (let interval of take(offHours(startDate), 3)) {
    console.log(interval)
}
// { start: 2020-09-01T17:00:00.000Z, end: 2020-09-02T08:00:00.000Z }
// { start: 2020-09-02T17:00:00.000Z, end: 2020-09-03T08:00:00.000Z }
// { start: 2020-09-03T17:00:00.000Z, end: 2020-09-04T08:00:00.000Z } 
```
#### Join
```typescript
import {joinSchedules, take, Thursdays, Weekends} from "schedule-fns"
import {parseISO} from "date-fns"

let weekendOrThursday = joinSchedules(Weekends(), Thursdays())

let startDate = parseISO("2020-09-01T10:00:00Z")
for (let interval of take(weekendOrThursday(startDate), 3)) {
    console.log(interval)
}

// { start: 2020-09-02T22:00:00.000Z, end: 2020-09-03T22:00:00.000Z }
// { start: 2020-09-04T22:00:00.000Z, end: 2020-09-06T22:00:00.000Z }
// { start: 2020-09-09T22:00:00.000Z, end: 2020-09-10T22:00:00.000Z } 
```

#### Intersect
```typescript
import {DailySchedule, intersectSchedules, Mondays, take} from "schedule-fns"
import {parseISO} from "date-fns"

let mondayEvenings = intersectSchedules(DailySchedule("20:00", "00:00", {timeZone: "Etc/UTC"}), Mondays("Etc/UTC"))

let startDate = parseISO("2020-09-02")
for (let interval of take(mondayEvenings(startDate), 3)) {
    console.log(interval)
}
// { start: 2020-09-07T20:00:00.000Z, end: 2020-09-08T00:00:00.000Z }
// { start: 2020-09-14T20:00:00.000Z, end: 2020-09-15T00:00:00.000Z }
// { start: 2020-09-21T20:00:00.000Z, end: 2020-09-22T00:00:00.000Z } 
```

#### Subtract
```typescript
import {DailySchedule, subtractSchedules, take} from "schedule-fns"
import {parseISO} from "date-fns"

let workHours = DailySchedule("08:00", "17:00")
let breaks = DailySchedule("12:30", "13:30")
let workTime = subtractSchedules(workHours, breaks)

let startDate = parseISO("2020-09-02")
for (let interval of take(workTime(startDate), 3)) {
    console.log(interval)
}
// { start: 2020-09-02T06:00:00.000Z, end: 2020-09-02T10:30:00.000Z }
// { start: 2020-09-02T11:30:00.000Z, end: 2020-09-02T15:00:00.000Z }
// { start: 2020-09-03T06:00:00.000Z, end: 2020-09-03T10:30:00.000Z } 
```

#### Symmetric Difference
```typescript
import {DailySchedule, symmetricDifferenceOfSchedules, take} from "schedule-fns"
import {parseISO} from "date-fns"

let hoursWorker1 = DailySchedule("08:00", "17:00")
let hoursWorker2 = DailySchedule("09:00", "18:00")
let onlyOneWorkerAvailable = symmetricDifferenceOfSchedules(hoursWorker1, hoursWorker2)

let startDate = parseISO("2020-09-02")
for (let interval of take(onlyOneWorkerAvailable(startDate), 3)) {
    console.log(interval)
}
// { start: 2020-09-02T06:00:00.000Z, end: 2020-09-02T07:00:00.000Z }
// { start: 2020-09-02T15:00:00.000Z, end: 2020-09-02T16:00:00.000Z }
// { start: 2020-09-03T06:00:00.000Z, end: 2020-09-03T07:00:00.000Z } 
```

#### Shift
```typescript
import {parseISO} from "date-fns"

import {Mondays, shiftSchedule, take} from "schedule-fns"

let mondayNoonToTuesdayNoon = shiftSchedule(Mondays("Etc/UTC"), {hours: 12})

let startDate = parseISO("2020-09-02")
for (let interval of take(mondayNoonToTuesdayNoon(startDate), 3)) {
    console.log(interval)
}
// { start: 2020-09-07T12:00:00.000Z, end: 2020-09-08T12:00:00.000Z }
// { start: 2020-09-14T12:00:00.000Z, end: 2020-09-15T12:00:00.000Z }
// { start: 2020-09-21T12:00:00.000Z, end: 2020-09-22T12:00:00.000Z } 
```

### Miscellaneous
#### Add Duration
```typescript
import {addDuration, DailySchedule} from "schedule-fns"
import {parseISO} from "date-fns"

let schedule = DailySchedule("08:00", "17:00")
let projectEnd = addDuration(parseISO("2020-09-01T10:00:00+0200"), {hours: 13}, schedule)

console.log(projectEnd)
// 2020-09-02T12:00:00.000Z 
```
#### isWithinSchedule
```typescript
import {parseISO} from "date-fns"
import {DailySchedule, isWithinSchedule} from "schedule-fns"

let schedule = DailySchedule("08:00", "17:00")
console.log(isWithinSchedule(parseISO("2020-01-08T111:00:00.000+0100"), schedule)) // true
console.log(isWithinSchedule(parseISO("2020-01-08T03:00:00.000+0100"), schedule)) // false
 
```
