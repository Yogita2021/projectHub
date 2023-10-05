// index.js

const express = require("express");
const session = require("express-session");
const bcrypt = require("bcryptjs");
const db = require("./db"); // Import the database connection
const app = express();

// Middleware
app.use(express.json());
app.use(
  session({
    secret: "secret",
    resave: false,
    saveUninitialized: false,
  })
);

// Authentication middleware
function authenticateUser(req, res, next) {
  if (req.session && req.session.userId) {
    return next(); // User is authenticated
  } else {
    res.status(401).json({ message: "Unauthorized" });
  }
}

// Routes
app.post("/login", (req, res) => {
  const { username, password } = req.body;

  // Replace this with your actual user authentication logic
  const query = "SELECT * FROM users WHERE username = ?";
  db.query(query, [username], (err, results) => {
    if (err) {
      return res.status(500).json({ message: "Internal Server Error" });
    }

    if (results.length === 0) {
      return res.status(401).json({ message: "Unauthorized" });
    }

    const user = results[0];
    if (bcrypt.compareSync(password, user.password)) {
      req.session.userId = user.id; // Store user ID in the session
      return res.json({ message: "Logged in successfully" });
    } else {
      return res.status(401).json({ message: "Unauthorized" });
    }
  });
});

app.get("/logout", (req, res) => {
  req.session.destroy();
  res.json({ message: "Logged out successfully" });
});

app.get("/user", authenticateUser, (req, res) => {
  // Access authenticated user's data here
  // You can fetch user data from the database using req.session.userId
  res.json({ message: "Authenticated user data" });
});

// Start server
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
