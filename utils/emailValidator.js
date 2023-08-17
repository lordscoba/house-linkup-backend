// Basic email validation function
function isValidEmail(email) {
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  //   return emailRegex.test(email);
  const test = emailRegex.test(email);
  if (test) {
    const validExtensions = ['com', 'net', 'org', 'edu']; // Add more valid extensions as needed

    const parts = email.split('@');
    if (parts.length !== 2) {
      return false; // Invalid email format
    }

    const domainParts = parts[1].split('.');
    if (domainParts.length !== 2) {
      return false; // Invalid domain format
    }

    const extension = domainParts[1];
    return validExtensions.includes(extension);
  }
}

module.exports = isValidEmail;
