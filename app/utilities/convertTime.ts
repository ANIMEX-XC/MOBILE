export const convertTime = (time: string) => {
  const date = new Date(time)

  const options: Intl.DateTimeFormatOptions = {
    year: 'numeric',
    month: 'long',
    day: 'numeric',
    hour: 'numeric',
    minute: 'numeric',
    second: 'numeric',
    hour12: true,
    timeZoneName: 'short'
  }
  return date.toLocaleString('en-US', options)
}
