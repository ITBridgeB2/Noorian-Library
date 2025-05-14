import React, { useEffect, useState } from "react";
import axios from "axios";
import { useLocation, useNavigate, Link } from "react-router-dom";
import "./BookList.css";

const BookList = () => {
  const [books, setBooks] = useState([]);
  const location = useLocation();
  const navigate = useNavigate();

  const genreQuery = new URLSearchParams(location.search).get("genre");

  useEffect(() => {
    const fetchBooks = async () => {
      try {
        const res = await axios.get("http://localhost:5000/api/books", {
          params: genreQuery ? { genre: genreQuery } : {},
        });
        setBooks(res.data);
      } catch (err) {
        console.error("Error fetching books:", err);
      }
    };

    fetchBooks();
  }, [genreQuery]);

  return (
    <div className="booklist-container">
      <div className="booklist-header">
        <h1>{genreQuery ? `${genreQuery} Books` : "All Books"}</h1>
        <button onClick={() => navigate("/")} className="home-btn">
          ← Back to Home
        </button>
      </div>

      {books.length === 0 ? (
        <p className="no-books">No books found.</p>
      ) : (
        <div className="books-grid">
          {books.map((book) => (
            <div key={book.id} className="book-card">
              <Link to={`/books/${book.id}`} className="book-title-link">
                <h3>{book.title}</h3>
              </Link>
              <p className="book-meta">
                by {book.author} ({book.year})
              </p>
              <button
                className="details-btn"
                onClick={() => navigate(`/books/${book.id}`)}
              >
                Details
              </button>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default BookList;
