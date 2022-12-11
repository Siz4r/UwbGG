import moment from "moment";

export const truncate = (text: string, n: number) =>
    (text.length > n) ? text.slice(0, n-1) + '...' : text;

export const timeDiff = (startDate: Date, endDate: Date): string => {
    const diff = moment(endDate).diff(moment(startDate))
    const diffDuration = moment.duration(diff)

    if (diffDuration.weeks() > 0) return diffDuration.weeks() + ' weeks'
    else if (diffDuration.days() > 0) return diffDuration.days() + ' days'
    else if (diffDuration.hours() > 0) return diffDuration.hours() + ' hours'
    else if (diffDuration.minutes() > 0) return diffDuration.minutes() + ' min'

    return diffDuration.seconds() + ' sec'
}
