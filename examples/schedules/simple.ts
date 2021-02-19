import {From, parseISO, Until} from "schedule-fns"

let from = From(parseISO("2020-09-01T00:00Z"))
console.log(from(parseISO("2020-08-01T00:00Z")).next().value.toISO())
// 2020-09-01T02:00:00.000+02:00/+10000-01-01T00:59:59.999+01:00

let until = Until(parseISO("2020-09-01T00:00Z"))
console.log(until(parseISO("2020-08-01T00:00Z")).next().value.toISO())
// 2020-08-01T02:00:00.000+02:00/2020-09-01T02:00:00.000+02:00