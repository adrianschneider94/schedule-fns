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
// #include<examples/luxon/basic.ts>
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
// #include<examples/luxon/schedules/dailySchedule.ts>
```

#### Regular Schedule
```typescript
// #include<examples/luxon/schedules/regularSchedule.ts> 
```

#### Schedule from Intervals

```typescript
// #include<examples/luxon/schedules/scheduleFromIntervals.ts> 
```

#### Holidays
```typescript
// #include<examples/luxon/schedules/holidays.ts> 
```

The holiday calender is created by the excellent [date-holidays](https://github.com/commenthol/date-holidays) package.
The signature of `Holidays` matches the signature of date-holidays `init` method. For details consult date-holidays documentation.

#### Weekdays
```typescript
// #include<examples/luxon/schedules/weekdays.ts> 
```

#### Simple Schedules
```typescript
// #include<examples/luxon/schedules/simple.ts> 
```

### Operations
#### Invert
```typescript
// #include<examples/luxon/operations/invert.ts> 
```
#### Join
```typescript
// #include<examples/luxon/operations/join.ts> 
```

#### Intersect
```typescript
// #include<examples/luxon/operations/intersect.ts> 
```

#### Subtract
```typescript
// #include<examples/luxon/operations/subtract.ts> 
```

#### Symmetric Difference
```typescript
// #include<examples/luxon/operations/symmetricDifference.ts> 
```

#### Shift
```typescript
// #include<examples/luxon/operations/shift.ts> 
```

### Miscellaneous
#### Add Duration
```typescript
// #include<examples/luxon/miscellaneous/addDuration.ts> 
```
#### isWithinSchedule
```typescript
// #include<examples/luxon/miscellaneous/isWithinSchedule.ts> 
```

## Implementation
### Definition of a schedule
The basis of schedule.js is the definition of a schedule:

```typescript
type Schedule = (startDate: Date | number, direction?: direction) => IterableIterator<Interval>
```

It is a generator that receives a date and a direction (defaults to "forward") and yields intervals.
