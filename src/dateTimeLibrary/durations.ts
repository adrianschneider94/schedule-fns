import {DateTimeLibrary} from "./index"

/**
 * Sums up durations.
 *
 * @param durations
 *
 * @internal
 */
export function addDurations<DT, I, D>(this: DateTimeLibrary<DT, I, D>, ...durations: Array<D>) {
    return durations.reduce((aggregate, current) => this.durationSum(aggregate, current))
}