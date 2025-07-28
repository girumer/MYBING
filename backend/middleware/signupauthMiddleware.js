const validateSignupInput = (req, res, next) => {
    const { username, password, role } = req.body;
  
    if (!username || !password || !role) {
      return res.status(400).json({ message: "All fields are required" });
    }
  
    if (password.length < 6) {
      return res.status(400).json({ message: "Password must be at least 6 characters" });
    }
  
    next();
  };
  
  module.exports = { validateSignupInput };
  