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
The basis of schedule.js is the definition of a schedule:

```typescript
type Schedule = (startDate: Date | number, direction?: direction) => IterableIterator<Interval>
```

It is a generator that receives a date and a direction (defaults to "forward") and yields intervals.
