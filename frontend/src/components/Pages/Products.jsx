import React, { useEffect, useState, useRef } from "react";
import ProductCard from "../ProductCard";
import { Link } from "react-router-dom";
import { FiFilter } from "react-icons/fi";
import { CgShapeCircle } from "react-icons/cg";
import Loader from "../Layout/Loader";
import { MdKeyboardDoubleArrowLeft } from "react-icons/md";
import { IoClose } from "react-icons/io5";
import MetaData from "../Layout/MetaData";
import { useLazyGetProductsQuery } from "../../redux/api/productApi";
import toast from "react-hot-toast";
import { useSearchParams } from "react-router-dom";
import Filters from "../Layout/Filters";
import { useDispatch } from "react-redux";
import { setCartItem } from "../../redux/features/cartSlice";

const Products = () => {
  const dispatch = useDispatch();
  const [searchParams] = useSearchParams();

  // getting the keyword from the url
  const keyword = searchParams.get("keyword") || "";
  const min = searchParams.get("min");
  const max = searchParams.get("max");
  const category = searchParams.get("category");

  const [trigger, { data, isLoading, isFetching, error, isError }] =
    useLazyGetProductsQuery();

  const [currentPage, setCurrentPage] = useState(1);
  const [products, setProducts] = useState([]);
  const [totalPages, setTotalPages] = useState(1);

  const fetchProducts = (page) => {
    trigger({
      page,
      limit: 12,
      keyword: keyword?.trim() || undefined,
      min: min ?? undefined,
      max: max ?? undefined,
      category: category ?? undefined,
    });
  };

  useEffect(() => {
    setCurrentPage(1);
    setProducts([]);
    fetchProducts(1);
  }, [keyword, min, max, category]);

  useEffect(() => {
    if (data?.products) {
      setProducts((prevProducts) => {
        if (currentPage === 1) {
          return data.products;
        }
        return [...prevProducts, ...data.products];
      });

      const perPage = data.resPerPage ?? 12;
      const count = data.filteredProductsCount ?? data.totalProducts ?? 0;
      const total = Math.ceil(count / perPage) || 1;

      setTotalPages(total);
    }
  }, [data]);

  const [isFilterOpen, setIsFilterOpen] = useState(false);

  const filterRef = useRef(null);

  const filterToggleMenu = () => {
    setIsFilterOpen((prev) => !prev);
  };

  useEffect(() => {
    if (isFilterOpen) {
      document.body.classList.add("no-scroll");
    } else {
      document.body.classList.remove("no-scroll");
    }
    return () => {
      document.body.classList.remove("no-scroll");
    };
  }, [isFilterOpen]);

  const filterNav = isFilterOpen ? "filter-section open" : "filter-section";

  useEffect(() => {
    if (!isFilterOpen) return;

    const handleClickOutside = (event) => {
      if (filterRef.current && !filterRef.current.contains(event.target)) {
        setIsFilterOpen(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);

    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  });

  const handleLoadMore = () => {
    const nextPage = currentPage + 1;
    setCurrentPage(nextPage);
    fetchProducts(nextPage);
  };

  const hasMore = currentPage < totalPages;
  useEffect(() => {
    if (isError) {
      toast.error(error?.data?.message || "Failed to load products");
    }
  }, [isError]);

  const addToCart = (product) => {
    dispatch(
      setCartItem({
        product: product._id,
        name: product.name,
        price: product.price,
        image: product.images?.[0].url,
        stock: product.stock,
        quantity: 1,
      })
    );
    toast.success("Added to cart");
  };

  if (isLoading && currentPage === 1) return <Loader />;

  return (
    <>
      <MetaData title={"All Products"} />
      <section className="products-page-grid main-grid">
        {isFilterOpen ? (
          <button
            className="filter-btn filter-close"
            onClick={filterToggleMenu}
          >
            <IoClose className="filter-close-icon" />
            Close
          </button>
        ) : (
          <button className="filter-btn filter-open" onClick={filterToggleMenu}>
            <FiFilter className="filter-open-icon" />
            Filter
          </button>
        )}

        <aside className={filterNav} ref={filterRef}>
          <Filters />
        </aside>
        <div className="product-content-area">
          {keyword && (
            <Link to="." relative="path" className="back-btn">
              <MdKeyboardDoubleArrowLeft className="back-arrow-btn" />
              <span className="back-text">Back to all Products</span>
            </Link>
          )}
          <div className="product-header">
            <h1 className="all-products-heading">
              {keyword
                ? `${data?.products?.length} Search Results for ${keyword}`
                : "All Products"}
            </h1>
          </div>
          <div className="product-list-grid">
            {products?.map((product) => (
              <ProductCard
                key={product._id}
                product={product}
                addToCart={addToCart}
              />
            ))}
          </div>
        </div>
        <div className="load-more-wrapper">
          {hasMore && !isFetching && (
            <button
              className="product-load-more load-product"
              onClick={handleLoadMore}
              disabled={isFetching}
            >
              {isFetching || isLoading ? "Loading..." : "Load More"}
            </button>
          )}

          {!hasMore && currentPage > 1 && products.length > 0 && (
            <p className="no-more-products-message">
              You've reached the end of the catalog.
            </p>
          )}
        </div>
      </section>
    </>
  );
};

export default Products;
