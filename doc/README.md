# schedule-fns

This package provides functions to work with schedules (work hours, opening hours etc.).
Its implementation and style are based on [date-fns](https://github.com/date-fns/date-fns).

## Installation

    npm i schedule-fns
    
## Usage

```typescript
// #include<examples/basic.ts>
```

## API
### Schedules
#### DailySchedule

```typescript
// #include<examples/schedules/dailySchedule.ts>
```

#### RegularSchedule
```typescript
// #include<examples/schedules/regularSchedule.ts> 
```

#### ScheduleFromIntervals

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
