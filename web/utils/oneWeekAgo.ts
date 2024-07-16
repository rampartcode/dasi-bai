export function getDateOneWeekAgo() {
  let currentDate = new Date();
  let oneWeekAgo = new Date(currentDate.getTime() - 7 * 24 * 60 * 60 * 1000);
  return oneWeekAgo;
}