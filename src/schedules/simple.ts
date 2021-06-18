import {Schedule} from "../index"
import {ScheduleFnsLibrary} from "../implementations"

export function From<DT, I, D>(this: ScheduleFnsLibrary<DT, I, D>, startDate: DT): Schedule<DT, I, D> {
    return this.ScheduleFromIntervals(this.createInterval(startDate, this.infinityDateTime))
}

export function Until<DT, I, D>(this: ScheduleFnsLibrary<DT, I, D>, endDate: DT): Schedule<DT, I, D> {
    return this.ScheduleFromIntervals(this.createInterval(this.negativeInfinityDateTime, endDate))
}
