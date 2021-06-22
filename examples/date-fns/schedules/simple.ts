import {From, Until} from "schedule.js/date-fns"
import {formatISO, parseISO} from "date-fns"

let from = From(parseISO("2020-09-01T00:00Z"))
let interval = from(parseISO("2020-08-01T00:00Z")).next().value
console.log(formatISO(interval.start) + "/" + formatISO(interval.end))
// 2020-09-01T02:00:00+02:00/275760-09-13T02:00:00+02:00

let until = Until(parseISO("2020-09-01T00:00Z"))
interval = until(parseISO("2020-08-01T00:00Z")).next().value
console.log(formatISO(interval.start) + "/" + formatISO(interval.end))
// 2020-08-01T02:00:00+02:00/2020-09-01T02:00:00+02:00