export function formatDate(dateString: string): string {
  // Parse the input date string into a Date object
  const date = new Date(dateString);

  const dateOfMoth = date.getDay();

  // Get the day of the week (0-6, where 0 is Sunday)
  const dayOfWeek = date.getDay();

  const dayNames = ["Sun", "Mon", "Tue", "Wed", "Thur", "Fri", "Sat"];

  // Get the month name (0-11, where 0 is January)
  const month = date.getMonth();
  const monthNames = [
    "January",
    "February",
    "March",
    "April",
    "May",
    "June",
    "July",
    "August",
    "September",
    "October",
    "November",
    "December",
  ];

  // Get the year
  const year = date.getFullYear();

  // Format the date string
  const formattedDate = `${dayNames[dayOfWeek]}, ${dateOfMoth} ${monthNames[month]} ${year}`;

  return formattedDate;
}
