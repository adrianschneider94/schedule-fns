import {Schedule} from "schedule-fns"

let mySchedule: Schedule = function* (startDate, direction = "forward") {
    if (0 < startDate && startDate < 1 && (direction === "forward" || direction === 1)){
        yield {start: startDate, end: 1}
    } else if (0 < startDate && startDate < 1 && (direction === "backward" || direction === -1)) {
        yield {start: 0, end: startDate}
    } else if (
        (startDate >= 1 && (direction === "forward" || direction === 1)) ||
        (startDate <= 1 && (direction === "backward" || direction === -1))
    ) {
        return
    } else {
        yield {start: 0, end: 1}
    }
}