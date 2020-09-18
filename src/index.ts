import {Interval} from "date-fns"

export type Schedule = (startDate: Date | number) => IterableIterator<Interval>
export const DateInfinity = 8640000000000000