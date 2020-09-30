import {Schedule} from "schedule-fns"

let mySchedule: Schedule = function* (startDate, direction = "forward") {
    yield {start: 0, end: 1}
}