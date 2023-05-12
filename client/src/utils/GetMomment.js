import moment from "moment";

export const GetMomment = (date) => {
    const now = moment();
    const diff = moment.duration(now.diff(date));
    const minutesAgo = Math.floor(diff.asMinutes());
    const hoursAgo = Math.floor(diff.asHours())
    const daysAgo = Math.floor(diff.asDays())
    const weeksAgo = Math.floor(diff.asWeeks())
    const monthsAgo = Math.floor(diff.asMonths())
    const yearsAgo = Math.floor(diff.years())


    if (yearsAgo > 0) {
        return `${yearsAgo} years`
    } else if (monthsAgo > 0) {
        return `${monthsAgo} months `
    } else if (weeksAgo > 0) {
        return `${weeksAgo} weeks`
    } else if (daysAgo > 0) {
        return `${daysAgo} days`
    } else if (hoursAgo > 0) {
        return `${hoursAgo} hours`
    } else if (minutesAgo > 0) {
        return `${minutesAgo} minutes`
    } else {
        return 'just a second'
    }
}
