import {DateTimeImplementation, Schedule} from "../index"
import {ScheduleFromIntervals} from "./scheduleFromIntervals"

export const From = (
    <DT, I, D>(impl: DateTimeImplementation<DT, I, D>) =>

        function (startDate: DT): Schedule<DT, I, D> {
            return ScheduleFromIntervals(impl)(impl.createInterval(startDate, impl.InfinityDateTime))
        }
)

export const Until = (
    <DT, I, D>(impl: DateTimeImplementation<DT, I, D>) =>

        function (endDate: DT): Schedule<DT, I, D> {
            return ScheduleFromIntervals(impl)(impl.createInterval(impl.NegInfinityDateTime, endDate))
        }

)
