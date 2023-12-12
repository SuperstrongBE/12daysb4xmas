export function isActiveRightNow(startTime: number, endTime: number): boolean {
  const now = new Date();
  const s = new Date()
  s.setTime(startTime)
  const e = new Date()
  e.setTime(startTime)
  console.log(s)
  console.log(e)
  console.log(new Date().setTime(endTime))
  return now.getTime() >= startTime && now.getTime() <= endTime;


}