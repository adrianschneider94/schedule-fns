import {Mondays, Thursdays, Weekends, WorkingDays} from "schedule-fns"

let mondays = Mondays()
let thursdaysInJapan = Thursdays("Asia/Tokyo")
let weekends = Weekends()
let workingDays = WorkingDays()