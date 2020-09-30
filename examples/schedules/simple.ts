import {parseISO} from "date-fns"

import {From, Until} from "schedule-fns"

let from = From(parseISO("2020-09-01T00:00Z"))
console.log(from(parseISO("2020-08-01T00:00Z")).next().value)
// { start: 2020-09-01T00:00:00.000Z, end: +275760-09-13T00:00:00.000Z }

let until = Until(parseISO("2020-09-01T00:00Z"))
console.log(until(parseISO("2020-08-01T00:00Z")).next().value)
// { start: 2020-08-01T00:00:00.000Z, end: 2020-09-01T00:00:00.000Z }