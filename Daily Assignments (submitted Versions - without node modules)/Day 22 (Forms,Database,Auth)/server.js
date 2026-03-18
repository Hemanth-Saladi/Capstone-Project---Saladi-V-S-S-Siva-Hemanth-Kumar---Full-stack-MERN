require("dotenv").config();
const express = require("express");
const bodyParser = require("body-parser");
const mongoose = require("mongoose");
const session = require("express-session");
const passport = require("passport");
const LocalStrategy = require("passport-local").Strategy;
const bcrypt = require("bcrypt");

const app = express();

app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

app.use(session({
  secret: process.env.SESSION_SECRET,
  resave: false,
  saveUninitialized: false
}));

app.use(passport.initialize());
app.use(passport.session());

mongoose.connect(process.env.MONGO_URI)
  .then(() => console.log("MongoDB connected"))
  .catch((err) => console.error("MongoDB connection error:", err));

const userSchema = new mongoose.Schema({
  name: String,
  email: String,
  password: String,
  role: { type: String, default: "user" }
});

const User = mongoose.model("User", userSchema);

passport.use(new LocalStrategy({ usernameField: "email" }, async (email, password, done) => {
  try {
    const user = await User.findOne({ email });
    if (!user) return done(null, false);

    const match = await bcrypt.compare(password, user.password);
    if (!match) return done(null, false);

    return done(null, user);
  } catch (err) {
    return done(err);
  }
}));

passport.serializeUser((user, done) => done(null, user.id));
passport.deserializeUser(async (id, done) => {
  const user = await User.findById(id);
  done(null, user);
});

app.get("/register", (req, res) => {
  res.send(`
    <form method="POST" action="/register">
      <input type="text" name="name" placeholder="Enter name" required />
      <input type="email" name="email" placeholder="Enter email" required />
      <input type="password" name="password" placeholder="Enter password" required />
      <input type="text" name="role" placeholder="Enter role (user/admin)" required />
      <button type="submit">Register</button>
    </form>
  `);
});

app.post("/register", async (req, res) => {
  try {
    const { name, email, password, role } = req.body;
    const hashedPassword = await bcrypt.hash(password, 10);

    const newUser = new User({ name, email, password: hashedPassword, role });
    await newUser.save();

    res.send(`Registration successful for ${name}`);
  } catch (error) {
    res.status(500).send("Error saving user");
  }
});

app.get("/login", (req, res) => {
  res.send(`
    <form method="POST" action="/login">
      <input type="email" name="email" placeholder="Enter email" required />
      <input type="password" name="password" placeholder="Enter password" required />
      <button type="submit">Login</button>
    </form>
  `);
});

app.post("/login",
  passport.authenticate("local", {
    failureRedirect: "/login-failure"
  }),
  (req, res) => {
    res.send("Login successful");
  }
);

app.get("/login-failure", (req, res) => {
  res.send("Login failed");
});

function isAdmin(req, res, next) {
  if (req.isAuthenticated() && req.user.role === "admin") {
    return next();
  }
  return res.status(403).send("Access Denied");
}

app.get("/admin", isAdmin, (req, res) => {
  res.send("Welcome, Admin!");
});

app.listen(4000, () => {
  console.log("Server running on http://localhost:4000");
});