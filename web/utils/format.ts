export function formatDate(date: string) {
  const newDate = new Date(date);

  return Intl.DateTimeFormat("pt", {
    day: "numeric",
    month: "short",
    year: "numeric",
  }).format(newDate);
}
