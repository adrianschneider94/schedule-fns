import {DateTimeImplementation, Schedule} from "../index"
import {mergeIntervals} from "../functions/intervals"
import {directionToInt} from "../functions/misc"


export const ScheduleFromIntervals = (
    <DT, I, D>(impl: DateTimeImplementation<DT, I, D>) =>

        function (...intervals: Array<I>): Schedule<DT, I, D> {
            return function* (startDate, direction = "forward") {
                let directionInt = directionToInt(direction)

                if (directionInt === 1) {
                    intervals = mergeIntervals(impl)(...intervals).filter(interval => impl.isEqualOrAfter(impl.getEnd(interval), startDate))
                } else {
                    intervals = mergeIntervals(impl)(...intervals).filter(interval => impl.isEqualOrBefore(impl.getStart(interval), startDate)).reverse()
                }

                for (const interval of intervals) {
                    if (directionInt === 1 && impl.isWithinInterval(startDate, interval)) {
                        yield impl.createInterval(startDate, impl.getEnd(interval))
                    } else if (directionInt === -1 && impl.isWithinInterval(startDate, interval)) {
                        yield impl.createInterval(impl.getStart(interval), startDate)
                    } else {
                        yield interval
                    }
                }
            }
        }

)