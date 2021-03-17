import {DateTimeImplementation, DTypes, Schedule} from "../index"
import {addDurations} from "../functions"
import {directionToInt} from "../functions/misc"


export const RegularSchedule = (
    <T extends DTypes>(impl: DateTimeImplementation<T>) =>

        function (oneStartMoment: T['datetime'], duration: T['duration'], period: T['duration']): Schedule<T> {
            return function* (startDate, direction = "forward") {
                let directionInt = directionToInt(direction)
                let numberOfPeriods: number = 0

                if (impl.isEqualOrBefore(oneStartMoment, startDate)) {
                    numberOfPeriods = Math.floor(impl.differenceInMilliseconds(startDate, oneStartMoment) / impl.roughDurationToMilliseconds(period))

                    if (directionInt === 1 && impl.isEqualOrBefore(impl.addDuration(oneStartMoment, addDurations(impl)(impl.multiplyDuration(period, numberOfPeriods), duration)), startDate)) {
                        numberOfPeriods += 1
                    }
                }

                let firstIntervalStartsAt = impl.addDuration(oneStartMoment, impl.multiplyDuration(period, numberOfPeriods))

                let i = 0
                while (true) {
                    let start = impl.addDuration(firstIntervalStartsAt, impl.multiplyDuration(period, i))

                    let interval = impl.createInterval(
                        start,
                        impl.addDuration(start, duration)
                    )

                    if (directionInt === 1 && impl.isWithinInterval(startDate, interval)) {
                        yield impl.createInterval(startDate, impl.getEnd(interval))
                    } else if (directionInt === -1 && impl.isWithinInterval(startDate, interval)) {
                        yield impl.createInterval(impl.getStart(interval), startDate)
                    } else {
                        yield interval
                    }
                    i += directionInt
                }
            }
        }

)