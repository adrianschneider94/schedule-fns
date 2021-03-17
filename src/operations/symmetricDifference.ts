import {DateTimeImplementation, DTypes, Schedule} from "../index"

import {joinSchedules} from "./join"
import {subtractSchedules} from "./subtract"
import {intersectSchedules} from "./intersect"

export const symmetricDifferenceOfSchedules = (
    <T extends DTypes>(impl: DateTimeImplementation<T>) =>

        function (left: Schedule<T>, right: Schedule<T>): Schedule<T> {
            return subtractSchedules(impl)(joinSchedules(impl)(left, right), intersectSchedules(impl)(left, right))
        }
)