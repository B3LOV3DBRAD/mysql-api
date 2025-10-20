import express from "express";
import mysql from "mysql2";
import dotenv from "dotenv";

dotenv.config();
const app = express();
app.use(express.json());

// Database connection
const db = mysql.createConnection({
  host: process.env.DB_HOST,
  user: process.env.DB_USER,
  password: process.env.DB_PASSWORD,
  database: process.env.DB_NAME,
});

db.connect(err => {
  if (err) throw err;
  console.log("✅ Connected to MySQL!");
});

// Base route
app.get("/", (req, res) => {
  res.send("API is running...");
});

// Create
app.post("/users", (req, res) => {
  const { name, email } = req.body;
  db.query(
    "INSERT INTO users (name, email) VALUES (?, ?)",
    [name, email],
    (err, result) => {
      if (err) return res.status(500).json({ error: err });
      res.status(201).json({ id: result.insertId, name, email });
    }
  );
});

// Read
app.get("/users", (req, res) => {
  db.query("SELECT * FROM users", (err, results) => {
    if (err) return res.status(500).json({ error: err });
    res.json(results);
  });
});

// Update
app.put("/users/:id", (req, res) => {
  const { id } = req.params;
  const { name, email } = req.body;
  db.query(
    "UPDATE users SET name=?, email=? WHERE id=?",
    [name, email, id],
    err => {
      if (err) return res.status(500).json({ error: err });
      res.json({ message: "✅ User updated" });
    }
  );
});

// Delete
app.delete("/users/:id", (req, res) => {
  const { id } = req.params;
  db.query("DELETE FROM users WHERE id=?", [id], err => {
    if (err) return res.status(500).json({ error: err });
    res.json({ message: "🗑️ User deleted" });
  });
});

app.listen(3000, () => console.log("🚀 Server running on port 3000"));
