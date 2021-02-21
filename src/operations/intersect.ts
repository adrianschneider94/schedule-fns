import {DateTimeImplementation, MAX_RECURSIONS, Schedule} from "../index"
import {directionToInt, isArrayEmpty} from "../functions/misc"
import {intersectIntervals} from "../functions/intervals"

export const intersectSchedules = (
    <DT, I, D>(impl: DateTimeImplementation<DT, I, D>) =>

        function (...schedules: Array<Schedule<DT, I, D>>): Schedule<DT, I, D> {
            return function* (startDate, direction = "forward") {
                if (isArrayEmpty(schedules)) {
                    return
                }

                let directionInt = directionToInt(direction)

                let generators = schedules.map(schedule => schedule(startDate, direction))
                let currentEntries = generators.map(generator => generator.next())
                let recursions = 0
                while (recursions <= MAX_RECURSIONS) {
                    if (currentEntries.some(entry => entry?.value === undefined)) {
                        return
                    }
                    try {
                        let intersection = intersectIntervals(impl)(...currentEntries.map(x => x.value))
                        yield intersection
                        recursions = 0
                        currentEntries = currentEntries.map((entry, i) => {
                            if ((directionInt === 1 && impl.isEqualOrBefore(entry.value.end, impl.getEnd(intersection))) || (directionInt === -1 && impl.isEqualOrAfter(entry.value.start, impl.getStart(intersection)))) {
                                return generators[i].next()
                            } else {
                                return entry
                            }
                        })
                    } catch (e) {
                        let i: number
                        if (directionInt === 1) {
                            let firstEnd = impl.getEnd([...currentEntries].sort((a, b) => impl.compareAsc(impl.getEnd(a.value), impl.getEnd(b.value)))[0].value)
                            i = currentEntries.findIndex(x => impl.isEqual(x.value.end, firstEnd))
                        } else {
                            let lastStart = impl.getStart([...currentEntries].sort((a, b) => impl.compareDesc(impl.getStart(a.value), impl.getStart(b.value)))[0].value)
                            i = currentEntries.findIndex(x => impl.isEqual(x.value.start, lastStart))
                        }
                        currentEntries[i] = generators[i].next()
                    }
                    recursions++
                }
                throw Error("Maximal number of recursions reached.")
            }
        }

)