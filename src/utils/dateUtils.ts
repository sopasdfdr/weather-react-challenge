export const formatDate = (dateStr: string, type: number) => {
  const date = new Date(dateStr);
  const day = date.getDate();
  const month = date.toLocaleString('en-US', { month: 'short' });
  const year = date.getFullYear();

  // Get hours and minutes in 24-hour format
  const hours = String(date.getHours()).padStart(2, '0'); // Pad with zero if needed
  const minutes = String(date.getMinutes()).padStart(2, '0'); // Pad with zero if needed

  return type == 1 ? `${day} ${month} ${year}` : `${day} ${month} ${year} at ${hours}:${minutes}`;
};
