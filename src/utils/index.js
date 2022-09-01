export const getReadableDate = d => {
  const months = [
    'Jan',
    'Feb',
    'Mar',
    'Apr',
    'May',
    'Jun',
    'Jul',
    'Aug',
    'Sep',
    'Oct',
    'Nov',
    'Dec',
  ]
  const date = d.getDate()
  const month = months[d.getMonth()]
  const year = d.getFullYear()

  return `${date} ${month} ${year}`
}
