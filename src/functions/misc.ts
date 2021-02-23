import {DateTimeImplementation, direction, DTypes, Schedule} from "../index"

/**
 * Determines if an array is empty.
 *
 * @param array
 * @internal
 * @category Miscellaneous
 */
export function isArrayEmpty<T>(array: Array<T>) {
    return array.length === 0
}


export const isWithinSchedule = (
    <T extends DTypes>(impl: DateTimeImplementation<T>) =>

        function (date: T['datetime'], schedule: Schedule<T>) {
            let generator = schedule(date)
            let interval = generator.next()?.value as T['interval'] | undefined

            if (interval === undefined) {
                return false
            }

            return impl.intervalContains(interval, date)
        }

)


export function directionToInt(direction: direction): 1 | -1 {
    if (direction === "forward") {
        return 1
    } else if (direction === "backward") {
        return -1
    } else if (direction === 1) {
        return 1
    } else if (direction === -1) {
        return -1
    } else {
        throw Error(`${direction} is not a valid direction.`)
    }
}


/**
 * Take the first n elements from an iterator.
 *
 * @param iterable
 * @param n
 */
export function* take<T>(iterable: IterableIterator<T>, n: number): IterableIterator<T> {
    let i = 0
    for (let value of iterable) {
        i++
        if (i > n) {
            break
        }
        yield value
    }
}

