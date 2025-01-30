// Function to get today's date in YYYY-MMM-DD format
const getTodaysDate = () => {
  const today = new Date();
  const yyyy = today.getFullYear();
  const monthNames = [
    "Jan",
    "Feb",
    "Mar",
    "Apr",
    "May",
    "Jun",
    "Jul",
    "Aug",
    "Sep",
    "Oct",
    "Nov",
    "Dec",
  ];
  const mm = monthNames[today.getMonth()]; // Get month name
  const dd = String(today.getDate()).padStart(2, "0");
  return `${yyyy}-${mm}-${dd}`;
};

export default getTodaysDate;
