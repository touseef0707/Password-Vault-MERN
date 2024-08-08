/**
 * Parses and formats a date string into 'dd-MM-yyyy, HH:mm:ss' format.
 *
 * @param {string} dateStr - The ISO date string to parse.
 * @returns {string} - The formatted date string.
 */
const formatDate = (dateStr) => {
    try {
      const date = new Date(dateStr);
  
      // Extract date components
      const day = String(date.getDate()).padStart(2, '0');
      const month = String(date.getMonth() + 1).padStart(2, '0'); // Months are zero-based
      const year = date.getFullYear();
      const hours = String(date.getHours()).padStart(2, '0');
      const minutes = String(date.getMinutes()).padStart(2, '0');
      const seconds = String(date.getSeconds()).padStart(2, '0');
  
      // Format the date string
      return `${day}-${month}-${year} ${hours}:${minutes}:${seconds}`;
    } catch (error) {
      console.error('Error formatting date:', error);
      return '';
    }
  };
  
  export default formatDate;
  