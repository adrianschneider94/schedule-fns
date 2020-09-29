import {parseISO} from "date-fns"
import {RegularSchedule} from "schedule-fns"

let newYear = parseISO("2021-01-01T00:00:00.000+0200")
let everySixWeeksForOneDay = RegularSchedule(newYear, {days: 1}, {weeks: 6})