import {DateTimeImplementation, Schedule} from "../index"


export const shiftSchedule = (
    <DT, I, D>(impl: DateTimeImplementation<DT, I, D>) =>

        function (schedule: Schedule<DT, I, D>, duration: D): Schedule<DT, I, D> {
            return function* (startDate, direction) {
                let generator = schedule(impl.addDuration(startDate, impl.multiplyDuration(duration, -1)), direction)
                for (let entry of generator) {
                    yield impl.createInterval(impl.addDuration(impl.getStart(entry), duration), impl.addDuration(impl.getEnd(entry), duration))
                }
            }
        }

)