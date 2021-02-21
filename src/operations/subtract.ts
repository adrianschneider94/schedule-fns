import {DateTimeImplementation, Schedule} from "../index"
import {intersectSchedules} from "./intersect"
import {invertSchedule} from "./invert"

/**
 * Subtracts one schedule from another.
 *
 * @param left
 * @param right
 * @category Operations
 */
export const subtractSchedules = (
    <DT, I, D>(impl: DateTimeImplementation<DT, I, D>) =>

        function (left: Schedule<DT, I, D>, right: Schedule<DT, I, D>): Schedule<DT, I, D> {
            return intersectSchedules(impl)(left, invertSchedule(impl)(right))
        }

)