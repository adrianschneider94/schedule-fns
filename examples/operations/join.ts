import {Weekends, Thursdays, joinSchedules} from "schedule-fns"

let weekendOrThursday = joinSchedules(Weekends(), Thursdays())