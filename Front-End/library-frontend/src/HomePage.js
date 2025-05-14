import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import "./HomePage.css";

const genres = [
  {
    name: "Horror",
    image:
      "https://st.depositphotos.com/1017817/1316/i/950/depositphotos_13168873-stock-photo-open-story-book-with-halloween.jpg",
  },
  {
    name: "Suspense",
    image:
      "https://thumbs.dreamstime.com/b/person-holding-book-hood-over-their-head-glowing-blue-light-creating-mysterious-eerie-atmosphere-s-face-obscured-352996914.jpg",
  },
  {
    name: "Action",
    image:
      "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRyxsWRlln0iM1POGVLgxpZmow8T4X-ord-Cw&s",
  },
  {
    name: "Science Fiction",
    image:
      "https://img.freepik.com/free-photo/open-book-with-fairytale-scene_52683-107845.jpg?ga=GA1.1.1472000947.1746856020&semt=ais_hybrid&w=740",
  },
  {
    name: "Childrens",
    image:
      "https://img.freepik.com/free-vector/children-are-reading-books-stack-books-garden-scene_1308-104501.jpg?ga=GA1.1.1472000947.1746856020&semt=ais_hybrid&w=740",
  },
  {
    name: "History",
    image:
      "https://media.istockphoto.com/id/1092170968/vector/open-book-with-history-doodles-and-lettering.jpg?s=612x612&w=0&k=20&c=SvXn0O25eHC8ARjwlcn83kahxjMGl2ti_DDFGozBKqg=",
  },
];

const HomePage = () => {
  const navigate = useNavigate();
  const [searchTerm, setSearchTerm] = useState("");
  const [searchResults, setSearchResults] = useState([]);

  const handleGenreClick = (genre) => {
    navigate(`/books?genre=${encodeURIComponent(genre)}`);
  };

  const handleSearch = async (e) => {
    const value = e.target.value;
    setSearchTerm(value);

    if (value.trim() === "") {
      setSearchResults([]);
      return;
    }

    try {
      const res = await axios.get("http://localhost:5000/api/books");
      const filtered = res.data.filter((book) =>
        book.title.toLowerCase().includes(value.toLowerCase())
      );
      setSearchResults(filtered);
    } catch (err) {
      console.error("Search failed:", err);
    }
  };

  const handleResultClick = (id) => {
    navigate(`/books/${id}`);
  };

  return (
    <div className="home-container">
      <h1>Library Management System</h1>

      {/* Search Section */}
      <div className="search-section">
        <div className="search-bar">
          <input
            type="text"
            placeholder="Search book by title..."
            value={searchTerm}
            onChange={handleSearch}
          />
          <span className="search-icon">🔍</span>
        </div>

        {/* Search Results */}
        {searchResults.length > 0 && (
          <div className="search-results">
            <ul className="results-list">
              {searchResults.map((book) => (
                <li
                  key={book.id}
                  className="result-item"
                  onClick={() => handleResultClick(book.id)}
                >
                  <strong>{book.title}</strong> by {book.author}
                </li>
              ))}
            </ul>
          </div>
        )}
      </div>

      {/* Genre Grid */}
      <div className="genres-grid">
        {genres.map((genre, index) => (
          <div
            key={index}
            className="genre-card"
            onClick={() => handleGenreClick(genre.name)}
          >
            <img src={genre.image} alt={genre.name} />
            <span>{genre.name}</span>
          </div>
        ))}
      </div>

      <button className="add-book-btn" onClick={() => navigate("/add")}>
        Add New Book
      </button>
    </div>
  );
};

export default HomePage;
