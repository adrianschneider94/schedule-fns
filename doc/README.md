# schedule-fns

This package provides functions to work with schedules (work hours, opening hours etc.).
Its implementation and style are based on [date-fns](https://github.com/date-fns/date-fns).

## Contents
* [Installation](#installation)
* [Example](#example)
* [API](#api)
* [Implementation](#implementation)

## Installation

    npm i schedule-fns
    
## Example

```typescript
// #include<examples/basic.ts>
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
// #include<examples/schedules/dailySchedule.ts>
```

#### Regular Schedule
```typescript
// #include<examples/schedules/regularSchedule.ts> 
```

#### Schedule from Intervals

```typescript
// #include<examples/schedules/scheduleFromIntervals.ts> 
```

#### Holidays
```typescript
// #include<examples/schedules/holidays.ts> 
```

The holiday calender is created by the excellent [date-holidays](https://github.com/commenthol/date-holidays) package.
The signature of `Holidays` matches the signature of date-holidays `init` method. For details consult date-holidays documentation.

#### Weekdays
```typescript
// #include<examples/schedules/weekdays.ts> 
```

#### Simple Schedules
```typescript
// #include<examples/schedules/simple.ts> 
```

### Operations
#### Invert
```typescript
// #include<examples/operations/invert.ts> 
```
#### Join
```typescript
// #include<examples/operations/join.ts> 
```

#### Intersect
```typescript
// #include<examples/operations/intersect.ts> 
```

#### Subtract
```typescript
// #include<examples/operations/subtract.ts> 
```

#### Symmetric Difference
```typescript
// #include<examples/operations/symmetricDifference.ts> 
```

#### Shift
```typescript
// #include<examples/operations/shift.ts> 
```

### Miscellaneous
#### Add Duration
```typescript
// #include<examples/miscellaneous/addDuration.ts> 
```
#### isWithinSchedule
```typescript
// #include<examples/miscellaneous/isWithinSchedule.ts> 
```

## Implementation
### Definition of a schedule
The basis of schedule-fns is the definition of a schedule:

```typescript
type Schedule = (startDate: Date | number, direction?: direction) => IterableIterator<Interval>
```

It is a generator that receives a date and a direction (defaults to "forward") and yields intervals.

So the simplest formal schedule would be

```typescript
// #include<examples/implementation/simplestSchedule.ts> 
```

However, it is not a valid schedule, as there are further specifications that define a schedule.<br/> 
If the direction is ``"forward"`` or ``1``:
  * ``interval[i].start > interval[i-1].end``
  * ``interval[i].start >= startDate``
  
If the direction is ``backward`` or ``-1``:
  * ``interval[i].end < interval[i-1].start``
  * ``interval[i].end <= startDate``
  
So to make our schedule valid, we have to handle the edge cases.

```typescript
// #include<examples/implementation/simpleSchedule.ts> 
```

But most of the time, we would just use a predefined schedule to achieve what 
we want:

```typescript
let mySchedule = ScheduleFromIntervals({start: 0, end: 1})
```

which already handles all the edge cases.