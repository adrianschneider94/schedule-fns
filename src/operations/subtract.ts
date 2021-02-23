import {DateTimeImplementation, DTypes, Schedule} from "../index"
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
    <T extends DTypes>(impl: DateTimeImplementation<T>) =>

        function (left: Schedule<T>, right: Schedule<T>): Schedule<T> {
            return intersectSchedules(impl)(left, invertSchedule(impl)(right))
        }

)