import React, { useState } from "react";
import { IoSearch } from "react-icons/io5";
import { useNavigate } from "react-router-dom";

const Search = () => {
  const [keyword, setKeyword] = useState("");
  const navigate = useNavigate();

  const submitHandler = (e) => {
    e.preventDefault();
    const trimmedKeyword = keyword.trim();
    if (trimmedKeyword) {
      navigate(`/products?keyword=${encodeURIComponent(trimmedKeyword)}`);
    } else {
      navigate("/products");
    }
  };

  return (
    <form role="search" onSubmit={submitHandler} className="search">
      <label htmlFor="search" className="search-bar">
        Search products
      </label>
      <input
        id="search"
        type="search"
        placeholder="Search Products..."
        name="keyword"
        value={keyword}
        onChange={(e) => setKeyword(e.target.value)}
      />
      <button type="submit" className="searchBtn">
        <IoSearch className="search-icon" />
      </button>
    </form>
  );
};

export default Search;
