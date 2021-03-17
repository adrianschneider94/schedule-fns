import {DateTimeImplementation, DTypes, MAX_RECURSIONS, Schedule} from "../index"


export type DurationObject = {
    years?: number,
    quarters?: number,
    months?: number,
    weeks?: number,
    days?: number,
    hours?: number,
    minutes?: number,
    seconds?: number
    milliseconds?: number
}


export const addDurations = (
    <T extends DTypes>(impl: DateTimeImplementation<T>) =>

        function (...durations: Array<T['duration']>) {
            return durations.reduce((aggregate, current) => impl.durationSum(aggregate, current))
        }

)

export const addDurationWithinSchedule = (
    <T extends DTypes>(impl: DateTimeImplementation<T>) =>

        function (date: T['datetime'], duration: T['duration'], schedule: Schedule<T>): T['datetime'] {
            let durationLeft = duration
            let generator = schedule(date)
            let i = 0
            while (i <= MAX_RECURSIONS) {
                i++
                let block = generator.next() as IteratorYieldResult<T['interval']>
                if (block.value === undefined) {
                    throw Error("Duration does not fit into the given schedule!")
                } else {
                    let next = impl.addDuration(impl.getStart(block.value), durationLeft)
                    if (impl.intervalContains(block.value, next) || impl.isEqual(impl.getEnd(block.value), next)) {
                        return next
                    } else {
                        durationLeft = impl.durationDifference(durationLeft, impl.intervalToDuration(block.value))
                    }
                }
            }
            throw Error("Maximal number of recursions reached.")
        }

)
