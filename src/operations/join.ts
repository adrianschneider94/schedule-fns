import {DateTimeImplementation, DTypes, MAX_RECURSIONS, Schedule} from "../index"
import {directionToInt, isArrayEmpty} from "../functions/misc"
import {areIntervalsConnected, joinIntervals} from "../functions/intervals"


const getFirstInterval = (
    <T extends DTypes>(impl: DateTimeImplementation<T>) =>

        function (intervals: Array<T['interval']>) {
            return [...intervals].filter(x => x !== undefined).sort((a, b) => impl.compareAsc(impl.getStart(a), impl.getStart(b)))[0]
        }

)


const getLastInterval = (
    <T extends DTypes>(impl: DateTimeImplementation<T>) =>

        function (intervals: Array<T['interval']>) {
            return [...intervals].filter(x => x !== undefined).sort((a, b) => impl.compareDesc(impl.getEnd(a), impl.getEnd(b)))[0]
        }

)


export const joinSchedules = (
    <T extends DTypes>(impl: DateTimeImplementation<T>) =>

        function (...schedules: Array<Schedule<T>>): Schedule<T> {

            return function* (startDate, direction = "forward") {
                if (isArrayEmpty(schedules)) {
                    return
                }

                let directionInt = directionToInt(direction)

                let generators = schedules.map(schedule => schedule(startDate, direction))
                let currentEntries = generators.map(generator => generator.next())
                let currentInterval: T['interval']

                if (directionInt === 1) {
                    currentInterval = getFirstInterval(impl)([...currentEntries].map(x => x?.value))
                } else {
                    currentInterval = getLastInterval(impl)([...currentEntries].map(x => x?.value))
                }
                let recursions = 0

                while (recursions <= MAX_RECURSIONS) {
                    let updated = false
                    for (const [i, entry] of currentEntries.entries()) {
                        if (entry?.value && areIntervalsConnected(impl)(currentInterval, entry.value)) {
                            currentInterval = joinIntervals(impl)(currentInterval, entry.value)
                            currentEntries[i] = generators[i].next()
                            updated = true
                        }
                    }
                    if (!updated) {
                        yield currentInterval
                        recursions = 0
                        if (currentEntries.every(x => x.done) || (directionInt === 1 && impl.isEqual(impl.getEnd(currentInterval), impl.InfinityDateTime)) || (directionInt === -1 && impl.isEqual(impl.getStart(currentInterval), impl.NegInfinityDateTime))) {
                            return
                        }
                        if (directionInt === 1) {
                            currentInterval = getFirstInterval(impl)([...currentEntries].map(x => x?.value))
                        } else {
                            currentInterval = getLastInterval(impl)([...currentEntries].map(x => x?.value))
                        }
                    }
                    recursions++
                }
                throw Error("Maximal number of recursions reached.")
            }
        }

)