import React, { useEffect, useState } from "react";
import { PRODUCT_CATEGORIES } from "../../data/productCategories.js";
import { useNavigate, useSearchParams } from "react-router-dom";
import { getPriceQueryParams } from "../../helpers/helper.js";

const Filters = () => {
  const [min, setMin] = useState("min");
  const [max, setMax] = useState("max");

  const navigate = useNavigate();
  let [searchParams, setSearchParams] = useSearchParams();

  useEffect(() => {
    const urlMin = searchParams.get("min");
    const urlMax = searchParams.get("max");
    setMin(urlMin ?? "");
    setMax(urlMax ?? "");
  }, [searchParams]);

  const selectedCategory = searchParams.get("category");
  console.log("this is the selected Category ", selectedCategory);

  const handleButtonClick = (e) => {
    e.preventDefault();

    let searchCopy = getPriceQueryParams(searchParams, "min", min);
    searchCopy = getPriceQueryParams(searchCopy, "max", max);

    setSearchParams(searchCopy, { replace: true });
  };
  // HANDLE CATEGORY FILTER

  const handleCategoryClick = (e) => {
    const { checked, value, name } = e.target;

    //make a copy of the current query string
    const updatedSearchParams = new URLSearchParams(searchParams);
    console.log("this is updatedSearcgParams", updatedSearchParams);

    if (checked) updatedSearchParams.set(name, value);
    else updatedSearchParams.delete(name);

    setSearchParams(updatedSearchParams, { replace: true });
  };
  return (
    <div className="filter-main-section">
      <div className="filter-header">
        <h2 className="filter-heading">Filter Products</h2>
      </div>
      {/* filter by price */}
      <div className="filter-price">
        <h3 className="price-title">Price</h3>
        <form
          id="price-form"
          className="price-form"
          onSubmit={handleButtonClick}
        >
          <input
            type="number"
            className="price-input"
            placeholder="Min ($)"
            name="min"
            value={min}
            onChange={(e) => setMin(e.target.value)}
          />
          <input
            type="number"
            className="price-input"
            placeholder="Max ($)"
            name="max"
            value={max}
            onChange={(e) => setMax(e.target.value)}
          />
          <button type="submit" className="price-btn">
            Go
          </button>
        </form>
      </div>

      <div className="filter-by-category">
        <h2 className="category-head">Category</h2>
        {PRODUCT_CATEGORIES.map((category) => (
          <div key={category} className="category-div">
            <input
              type="checkbox"
              name="category"
              className="category-input"
              value={category}
              checked={selectedCategory === category}
              onChange={handleCategoryClick}
            />
            <label className="category-label">{category}</label>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Filters;
