const express = require("express");
const mysql = require("mysql2");
const cors = require("cors");

const app = express();
app.use(cors());
app.use(express.json());

const db = mysql.createConnection({
  host: "localhost",
  user: "root",
  password: "noor", // your MySQL password
  database: "library"
});

// Create Book
app.post("/api/books", (req, res) => {
 console.log("Received data:", req.body); // Add this line
  const { title, author, genre, year } = req.body;

  db.query(
    "INSERT INTO books (title, author, genre, year) VALUES (?, ?, ?, ?)",
    [title, author, genre, year],
    (err, result) => {
      if (err) return res.status(500).send(err);
      res.json({ id: result.insertId });
    }
  );
});

// Get All Books or Filter by Genre
app.get("/api/books", (req, res) => {
  const { genre } = req.query;
  let sql = "SELECT * FROM books";
  const values = [];

  if (genre) {
    sql += " WHERE genre = ?";
    values.push(genre);
  }

  db.query(sql, values, (err, result) => {
    if (err) return res.status(500).json({ error: err.message });
    res.json(result);
  });
});

// Get Book by ID
app.get("/api/books/:id", (req, res) => {
  const sql = "SELECT * FROM books WHERE id = ?";
  db.query(sql, [req.params.id], (err, result) => {
    if (err) return res.status(500).json({ error: err.message });
    res.json(result[0]);
  });
});

// Update Book
app.put("/api/books/:id", (req, res) => {
  const { title, author, genre, year } = req.body;
  const sql = "UPDATE books SET title=?, author=?, genre=?, year=? WHERE id=?";
  db.query(sql, [title, author, genre, year, req.params.id], (err) => {
    if (err) return res.status(500).json({ error: err.message });
    res.json({ message: "Book updated successfully" });
  });
});

// Delete Book
app.delete("/api/books/:id", (req, res) => {
  const sql = "DELETE FROM books WHERE id = ?";
  db.query(sql, [req.params.id], (err) => {
    if (err) return res.status(500).json({ error: err.message });
    res.json({ message: "Book deleted successfully" });
  });
});

app.listen(5000, () => {
  console.log("Server is running on port 5000");
});
