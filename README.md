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
import {DailySchedule} from "schedule-fns"

let workHours = DailySchedule("08:00", "17:00") // Uses the system timezone
let workHoursInNewYork = DailySchedule("08:00", "17:00", {timeZone: "America/New_York"})
let partyHoursInTokyo = DailySchedule("10 pm", "3 am", {timeZone: "Asia/Tokyo", timeFormat: "h a"})
```

#### RegularSchedule
```typescript
import {parseISO} from "date-fns"
import {RegularSchedule} from "schedule-fns"

let newYear = parseISO("2021-01-01T00:00:00.000+0200")
let everySixWeeksForOneDay = RegularSchedule(newYear, {days: 1}, {weeks: 6}) 
```

#### ScheduleFromIntervals

```typescript
import {Interval, parseISO} from "date-fns"
import {ScheduleFromIntervals} from "schedule-fns"


let intervals: Array<Interval> = [
    {start: parseISO("2020-08-22T00:00:00.000+0200"), end: parseISO("2020-08-31T00:00:00.000+0200")},
    {start: parseISO("2020-12-24T14:00:00.000+0200"), end: parseISO("2021-01-08T00:00:00.000+0200")}
]
let myHolidays = ScheduleFromIntervals(...intervals) 
```

#### Holidays
```typescript
import {Holidays} from "schedule-fns"

let holidaysInBavaria = Holidays("DE", "BY", {types: ["school"]}) 
```

The holiday calender is created by the excellent [date-holidays](https://github.com/commenthol/date-holidays) package.
The signature of `Holidays` matches the signature of date-holidays `init` method. For details consult date-holidays documentation.

#### Weekdays
```typescript
import {Mondays, Thursdays, Weekends, WorkingDays} from "schedule-fns"

let mondays = Mondays()
let thursdaysInJapan = Thursdays("Asia/Tokyo")
let weekends = Weekends()
let workingDays = WorkingDays() 
```
### Operations
#### Invert
```typescript
import {DailySchedule, invertSchedule} from "schedule-fns"

let workHours = DailySchedule("08:00", "17:00", {timeZone: "Europe/Berlin"})
let offHours = invertSchedule(workHours) 
```
#### Join
```typescript
import {Weekends, Thursdays, joinSchedules} from "schedule-fns"

let weekendOrThursday = joinSchedules(Weekends(), Thursdays()) 
```

#### Intersect
```typescript
import {Mondays, DailySchedule, intersectSchedules} from "schedule-fns"

let mondayEvenings = intersectSchedules(DailySchedule("20:00", "02:00"), Mondays()) 
```

#### Subtract
```typescript
import {DailySchedule, subtractSchedules} from "schedule-fns"

let workHours = DailySchedule("08:00", "17:00")
let breaks = DailySchedule("12:30", "13:30")
let workTime = subtractSchedules(workHours, breaks) 
```

#### Symmetric Difference
```typescript
import {DailySchedule, symmetricDifferenceOfSchedules} from "schedule-fns"

let hoursWorker1 = DailySchedule("08:00", "17:00")
let hoursWorker2 = DailySchedule("09:00", "18:00")
let onlyOneWorkerAvailable = symmetricDifferenceOfSchedules(hoursWorker1, hoursWorker2) 
```

#### Shift
```typescript
import {parseISO} from "date-fns"

import {Mondays, shiftSchedule, take} from "schedule-fns"

let mondayNoonToTuesdayNoon = shiftSchedule(Mondays("Europe/Berlin"), {hours: 12})

let startDate = parseISO("2020-09-02")
for (let interval of take(mondayNoonToTuesdayNoon(startDate), 3)) {
    console.log(interval)
} 
```

### Miscellaneous
#### Add Duration
```typescript
import {addDuration, DailySchedule} from "schedule-fns"

let schedule = DailySchedule("08:00", "17:00")
let projectEnd = addDuration(new Date(), {hours: 13}, schedule)
 
```
#### isWithinSchedule
```typescript
import {parseISO} from "date-fns"
import {DailySchedule, isWithinSchedule} from "schedule-fns"

let schedule = DailySchedule("08:00", "17:00")
console.log(isWithinSchedule(parseISO("2020-01-08T111:00:00.000+0100"), schedule)) // true
console.log(isWithinSchedule(parseISO("2020-01-08T03:00:00.000+0100"), schedule)) // false
 
```
