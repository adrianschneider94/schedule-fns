import {DateTimeImplementation, Schedule} from "../index"

import {joinSchedules} from "./join"
import {subtractSchedules} from "./subtract"
import {intersectSchedules} from "./intersect"

export const symmetricDifferenceOfSchedules = (
    <DT, I, D>(impl: DateTimeImplementation<DT, I, D>) =>

        function (left: Schedule<DT, I, D>, right: Schedule<DT, I, D>): Schedule<DT, I, D> {
            return subtractSchedules(impl)(joinSchedules(impl)(left, right), intersectSchedules(impl)(left, right))
        }
)