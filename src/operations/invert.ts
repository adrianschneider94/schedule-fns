import {DateTimeImplementation, DTypes, Schedule} from "../index"
import {directionToInt} from "../functions/misc"


export const invertSchedule = (
    <T extends DTypes>(impl: DateTimeImplementation<T>) =>

        function (schedule: Schedule<T>): Schedule<T> {
            return function* (startDate, direction = "forward") {
                let directionInt = directionToInt(direction)

                let generator = schedule(startDate, direction)
                let res = generator.next()

                if (res.done) {
                    if (directionInt === 1) {
                        yield impl.createInterval(startDate, impl.InfinityDateTime)
                    } else if (directionInt === -1) {
                        yield impl.createInterval(impl.NegInfinityDateTime, startDate)
                    }
                }

                if (!res.done) {
                    let last = res.value
                    if (directionInt === 1 && !impl.isEqual(startDate, impl.getStart(last))) {
                        yield impl.createInterval(startDate, impl.getStart(last))
                    } else if (directionInt === -1 && !impl.isEqual(startDate, impl.getEnd(last))) {
                        yield impl.createInterval(impl.getEnd(last), startDate)
                    }

                    for (const interval of generator) {
                        if (directionInt === 1) {
                            yield impl.createInterval(impl.getEnd(last), impl.getStart(interval))
                        } else {
                            yield impl.createInterval(impl.getEnd(interval), impl.getStart(last))
                        }
                        last = interval
                    }

                    if (directionInt === 1 && last && !impl.isEqual(impl.getEnd(last), impl.InfinityDateTime)) {
                        yield impl.createInterval(impl.getEnd(last), impl.InfinityDateTime)
                    } else if (directionInt === -1 && last && !impl.isEqual(impl.getEnd(last), impl.NegInfinityDateTime)) {
                        yield impl.createInterval(impl.NegInfinityDateTime, impl.getStart(last))
                    }
                }
            }
        }

)