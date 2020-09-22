import {DateInfinity, Schedule} from "../index"
import {isEqual} from "date-fns"

export function invertSchedule(schedule: Schedule): Schedule {
    return function* (startDate) {
        let generator = schedule(startDate)
        let last = generator.next().value
        if (last === undefined) {
            yield {start: startDate, end: DateInfinity}
        } else if (!isEqual(startDate, last.start)) {
            yield {start: startDate, end: last.start}
        }
        for (const interval of generator) {
            yield {start: last.end, end: interval.start}
            last = interval
        }
        if (last && !isEqual(last.end, DateInfinity)) {
            yield {start: last.end, end: DateInfinity}
        }
    }
}