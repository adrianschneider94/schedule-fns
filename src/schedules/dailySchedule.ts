import {DateTimeImplementation, Schedule} from "../index"
import {directionToInt} from "../functions/misc"


export const DailySchedule = (
    <DT, I, D>(impl: DateTimeImplementation<DT, I, D>) =>

        function (startTime: string, endTime: string, options?: { timeZone?: string }): Schedule<DT, I, D> {
            let timeZone = options?.timeZone

            return function* (startDate, direction = 1) {
                let directionInt = directionToInt(direction)

                let day = impl.startOfDay(startDate, timeZone)
                let dayBefore = impl.addDays(day, -1)
                let overMidnight: boolean = impl.isAfter(impl.parseTimeAtGivenDay(startTime, day, timeZone), impl.parseTimeAtGivenDay(endTime, day, timeZone))

                let firstInterval = impl.createInterval(
                    overMidnight ? impl.parseTimeAtGivenDay(startTime, dayBefore, timeZone) : impl.parseTimeAtGivenDay(startTime, day, timeZone),
                    impl.parseTimeAtGivenDay(endTime, day, timeZone)
                )

                let i = 0
                while (true) {
                    let interval = impl.createInterval(
                        impl.addDays(impl.getStart(firstInterval), i),
                        impl.addDays(impl.getEnd(firstInterval), i)
                    )
                    i += directionInt

                    if ((directionInt === 1 && impl.isAfter(startDate, impl.getEnd(interval))) || (directionInt === -1 && impl.isBefore(startDate, impl.getStart(interval)))) {
                        continue
                    }

                    if (impl.isWithinInterval(startDate, interval)) {
                        if (directionInt === 1) {
                            yield impl.createInterval(
                                startDate,
                                impl.getEnd(interval)
                            )
                        } else {
                            yield impl.createInterval(
                                impl.getStart(interval),
                                startDate
                            )
                        }
                    } else {
                        yield interval
                    }
                }
            }
        }
)
