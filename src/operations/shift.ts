import {DateTimeImplementation, DTypes, Schedule} from "../index"


export const shiftSchedule = (
    <T extends DTypes>(impl: DateTimeImplementation<T>) =>

        function (schedule: Schedule<T>, duration: T['duration']): Schedule<T> {
            return function* (startDate, direction) {
                let generator = schedule(impl.addDuration(startDate, impl.multiplyDuration(duration, -1)), direction)
                for (let entry of generator) {
                    yield impl.createInterval(impl.addDuration(impl.getStart(entry), duration), impl.addDuration(impl.getEnd(entry), duration))
                }
            }
        }

)