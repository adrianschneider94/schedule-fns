import {Mondays, DailySchedule, intersectSchedules} from "schedule-fns"

let mondayEvenings = intersectSchedules(DailySchedule("20:00", "02:00"), Mondays())