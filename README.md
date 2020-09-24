# schedule-fns

This package provides functions to work with schedules (work hours, opening hours etc.).
Its implementation and style are based on [date-fns](https://github.com/date-fns/date-fns).

## Installation

    npm i schedule-fns
    
## Usage

```typescript
import {addDuration, DailySchedule, joinSchedules, subtractSchedules, Weekends} from "schedule-fns"
import {parseISO} from "date-fns"

// Define the schedule: Mo-Fr, 08:00-16:00, break from 12:30 to 13:30, German timezone
let workHours = DailySchedule("08:00", "17:00", "Europe/Berlin")
let breaks = DailySchedule("12:30", "13:30")  // You can drop the timezone, schedule-fns will use the system timezone then
let weekends = Weekends()

let schedule = subtractSchedules(workHours, joinSchedules(weekends, breaks))

// We want to know when 46 hours have passed in the schedule to determine the project deadline
// We start at 15:20 on Monday, August the 31st (German timezone)
let projectStart = parseISO("2020-08-31T15:20:00.000+0200")

// 46 hours are 5 full working days and 71 hours. So we should finish on Tuesday, September the 5th at 14:20.
let projectEnd = addDuration(projectStart, {hours: 47}, schedule)
console.log(projectEnd.toISOString()) // 2020-09-08T12:20:00.000Z which is 14:20 in German time
```

## API
### Schedules
#### DailySchedule

```typescript
import {DailySchedule} from "schedule-fns"

let workHours = DailySchedule("08:00", "17:00") // Uses the system timezone
let workHoursInNewYork = DailySchedule("08:00", "17:00", "America/New_York")
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

let workHours = DailySchedule("08:00", "17:00", "Europe/Berlin")
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

### Miscellaneous
#### Add Duration
```typescript
import {DailySchedule, addDuration} from "schedule-fns"

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
