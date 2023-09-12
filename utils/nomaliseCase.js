// Custom middleware to normalize case
function normalizeCase(req, res, next) {
  // Normalize the email or username to lowercase (or uppercase)
  if (req.body.email || req.body.full_name) {
    req.body.email = req?.body?.email.toLowerCase(); // You can also use toUpperCase()
    req.body.full_name = req.body.full_name.toLowerCase(); // You can also use toUpperCase()
  }
  // Add similar normalization for other fields if needed

  next();
}

module.exports = normalizeCase;
