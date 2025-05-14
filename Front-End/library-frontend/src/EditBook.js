import React, { useEffect, useState } from "react";
import axios from "axios";
import { useParams, useNavigate, Link } from "react-router-dom";
import "./EditBook.css";

const genres = [
  "Horror",
  "Suspense",
  "Action",
  "Science Fiction",
  "Childrens",
  "History",
];

const EditBook = () => {
  const { id } = useParams();
  const navigate = useNavigate();

  const [title, setTitle] = useState("");
  const [author, setAuthor] = useState("");
  const [genre, setGenre] = useState(genres[0]);
  const [year, setYear] = useState("");

  useEffect(() => {
    axios
      .get(`http://localhost:5000/api/books/${id}`)
      .then((res) => {
        const book = res.data;
        setTitle(book.title);
        setAuthor(book.author);
        setGenre(book.genre);
        setYear(book.year);
      })
      .catch((err) => console.error("Error loading book:", err));
  }, [id]);

  const handleSubmit = (e) => {
    e.preventDefault();

    axios
      .put(`http://localhost:5000/api/books/${id}`, {
        title,
        author,
        genre,
        year,
      })
      .then(() => navigate(`/books/${id}`))
      .catch((err) => console.error("Update failed:", err));
  };

  return (
    <div className="edit-container">
      <div className="edit-card">
        <h2>Edit Book</h2>
        <form onSubmit={handleSubmit} className="edit-form">
          <div className="form-group">
            <label>Book Title</label>
            <input
              type="text"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              required
            />
          </div>
          <div className="form-group">
            <label>Author</label>
            <input
              type="text"
              value={author}
              onChange={(e) => setAuthor(e.target.value)}
              required
            />
          </div>
          <div className="form-group">
            <label>Genre</label>
            <select value={genre} onChange={(e) => setGenre(e.target.value)} required>
              {genres.map((g, idx) => (
                <option key={idx} value={g}>
                  {g}
                </option>
              ))}
            </select>
          </div>
          <div className="form-group">
            <label>Publish Year</label>
            <input
              type="number"
              value={year}
              onChange={(e) => setYear(e.target.value)}
              required
            />
          </div>
          <button type="submit" className="update-btn">Update Book</button>
        </form>
        <Link to={`/books/${id}`} className="back-link">← Back to Details</Link>
      </div>
    </div>
  );
};

export default EditBook;
