import React, { useEffect, useState } from "react";
import axios from "axios";
import { useParams, useNavigate, Link } from "react-router-dom";
import "./BookDetails.css";

const BookDetails = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [book, setBook] = useState(null);

  useEffect(() => {
    axios
      .get(`http://localhost:5000/api/books/${id}`)
      .then((res) => setBook(res.data))
      .catch((err) => console.error("Failed to fetch book:", err));
  }, [id]);

  const handleDelete = () => {
    axios
      .delete(`http://localhost:5000/api/books/${id}`)
      .then(() => navigate("/books"))
      .catch((err) => console.error("Delete failed:", err));
  };

  if (!book) return <div className="details-container">Loading...</div>;

return (
  <>
    <h1 className="page-title">Book Details</h1>
    <div className="details-container">
      <div className="details-card">
        <div className="book-info">
          <p><strong>Book Title :</strong> {book.title}</p>
          <p><strong>Author :</strong> {book.author}</p>
          <p><strong>Genre :</strong> {book.genre}</p>
          <p><strong>Published Year :</strong> {book.year}</p>
        </div>
        <div className="btn-group">
          <button onClick={() => navigate(`/edit/${book.id}`)} className="edit-btn">Edit Book</button>
          <button onClick={handleDelete} className="delete-btn">Delete Book</button>
        </div>
        <Link to="/" className="back-link">← Back to Home</Link>
      </div>
    </div>
  </>
);
};

export default BookDetails;
