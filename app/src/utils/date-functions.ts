import { intervalToDuration } from "date-fns"

export const durationFormat = (seconds: number, opts?: {isMinFormat: boolean}): string => {
  const duration = intervalToDuration({ start: 0, end: seconds })

  if (opts?.isMinFormat) {
    const formatted = [
      [duration.hours, 'h'],
      [duration.minutes, 'm'],
      [duration.seconds, 's']
    ]
    .filter(([value]) => !!value)
    .map(([value, label]) => `${(value)}${label}`)
    return formatted.join(' ')
  }

  const formatted = [
    [duration.hours, duration.hours === 1 ? 'hour' : 'hours'],
    [duration.minutes, duration.minutes === 1 ? 'minute' : 'minutes'],
    [duration.seconds, duration.seconds === 1 ? 'second' : 'seconds']
  ]
  .filter(([value]) => !!value)
  .map(([value, label]) => `${(value)} ${label}`)
  .join(', ')
  return formatted
}
