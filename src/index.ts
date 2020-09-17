import {Interval} from "date-fns"

export type Schedule = (startDate: Date | number) => () => IterableIterator<Interval>
