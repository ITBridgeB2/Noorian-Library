import React, { useState } from "react";
import axios from "axios";
import { useNavigate, Link } from "react-router-dom";
import "./AddBook.css";

const genres = [
  "Horror",
  "Suspense",
  "Action",
  "Science Fiction",
  "Childrens",
  "History",
];

const AddBook = () => {
  const [title, setTitle] = useState("");
  const [author, setAuthor] = useState("");
  const [genre, setGenre] = useState(genres[0]);
  const [year, setYear] = useState("");
  const navigate = useNavigate();

  const handleSubmit = (e) => {
    e.preventDefault();

    axios
      .post("http://localhost:5000/api/books", {
        title,
        author,
        genre,
        year,
      })
      .then(() => navigate("/"))
      .catch((err) => console.error("Error adding book:", err));
  };

  return (
    <div className="form-container">
      <div>
        <h1>Add New Book</h1>
        <form onSubmit={handleSubmit}>
          <input
            type="text"
            placeholder="Book Title"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            required
          />
          <input
            type="text"
            placeholder="Author"
            value={author}
            onChange={(e) => setAuthor(e.target.value)}
            required
          />
          <select
            value={genre}
            onChange={(e) => setGenre(e.target.value)}
            required
          >
            {genres.map((g, idx) => (
              <option key={idx} value={g}>
                {g}
              </option>
            ))}
          </select>
          <input
            type="number"
            placeholder="Publish Year"
            value={year}
            onChange={(e) => setYear(e.target.value)}
            required
          />
          <button type="submit">Add Book</button>
        </form>
        <Link to="/" className="back-link">
          ← Back to Home
        </Link>
      </div>
    </div>
  );
};

export default AddBook;
