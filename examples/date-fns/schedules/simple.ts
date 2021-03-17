import {formatIntervalISO, From, Until} from "schedule.js/date-fns"
import {parseISO} from "date-fns"

let from = From(parseISO("2020-09-01T00:00Z"))
console.log(formatIntervalISO(from(parseISO("2020-08-01T00:00Z")).next().value))
// 2020-09-01T02:00:00+02:00/275760-09-13T02:00:00+02:00

let until = Until(parseISO("2020-09-01T00:00Z"))
console.log(formatIntervalISO(until(parseISO("2020-08-01T00:00Z")).next().value))
// 2020-08-01T02:00:00+02:00/2020-09-01T02:00:00+02:00