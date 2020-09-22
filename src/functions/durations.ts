export function durationToMilliseconds(duration: Duration): number {
    let values = [
        duration.years ? duration.years * 31556952000 : 0,
        duration.months ? duration.months * 2592000000 : 0,
        duration.weeks ? duration.weeks * 604800000 : 0,
        duration.days ? duration.days * 86400000 : 0,
        duration.hours ? duration.hours * 3600000 : 0,
        duration.minutes ? duration.minutes * 60000 : 0,
        duration.seconds ? duration.seconds * 1000 : 0
    ]
    return values.reduce((a, b) => a + b)
}

export function multiplyDuration(duration: Duration, factor: number): Duration {
    return {
        years: duration.years ? duration.years * factor : 0,
        months: duration.months ? duration.months * factor : 0,
        weeks: duration.weeks ? duration.weeks * factor : 0,
        days: duration.days ? duration.days * factor : 0,
        hours: duration.hours ? duration.hours * factor : 0,
        minutes: duration.minutes ? duration.minutes * factor : 0,
        seconds: duration.seconds ? duration.seconds * factor : 0,
    }
}