import {DateTimeImplementation, DTypes, Schedule} from "../index"
import {ScheduleFromIntervals} from "./scheduleFromIntervals"

export const From = (
    <T extends DTypes>(impl: DateTimeImplementation<T>) =>

        function (startDate: T['datetime']): Schedule<T> {
            return ScheduleFromIntervals(impl)(impl.createInterval(startDate, impl.InfinityDateTime))
        }
)

export const Until = (
    <T extends DTypes>(impl: DateTimeImplementation<T>) =>

        function (endDate: T['datetime']): Schedule<T> {
            return ScheduleFromIntervals(impl)(impl.createInterval(impl.NegInfinityDateTime, endDate))
        }

)
