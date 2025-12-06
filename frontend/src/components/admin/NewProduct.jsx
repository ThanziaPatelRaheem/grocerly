import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useCreateProductMutation } from "../../redux/api/productApi.js";
import toast from "react-hot-toast";
import MetaData from "../Layout/MetaData";
import { PRODUCT_CATEGORIES } from "../../data/productCategories.js";

const NewProduct = () => {
  const navigate = useNavigate();

  const [product, setProduct] = useState({
    name: "",
    shortDescription: "",
    description: "",
    price: "",
    stock: "",
    category: "",
    weight: "",
    isTrending: false,
    isRecommended: false,
  });

  const {
    name,
    shortDescription,
    description,
    price,
    stock,
    weight,
    category,
    isTrending,
    isRecommended,
  } = product;

  const [createProduct, { isLoading, error, isSuccess }] =
    useCreateProductMutation();

  useEffect(() => {
    if (error) {
      toast.error(error?.data?.message);
    }

    if (isSuccess) {
      toast.success("Product created");
      navigate("/admin/products");
    }
  }, [error, isSuccess]);

  const onChange = (e) => {
    const { name, type, value, checked } = e.target;

    setProduct((prev) => ({
      ...prev,
      [name]: type === "checkbox" ? checked : value,
    }));
  };

  const submitHandler = (e) => {
    e.preventDefault();
    createProduct(product);
  };
  return (
    <>
      <MetaData title={`Create new Product`} />
      <section className="create-product-section main-grid">
        <div className="create-product-wrapper">
          <h2>Create new product</h2>
          <form className="create-product-new-form" onSubmit={submitHandler}>
            <label htmlFor="name">Name</label>
            <input
              id="name"
              name="name"
              type="text"
              value={name}
              onChange={onChange}
            />

            <label htmlFor="shortDescription">Short Description</label>
            <textarea
              id="shortDescription"
              name="shortDescription"
              value={shortDescription}
              onChange={onChange}
            ></textarea>

            <label htmlFor="description">Description </label>
            <textarea
              id="description"
              name="description"
              value={description}
              onChange={onChange}
            ></textarea>

            <label htmlFor="price">Price</label>
            <input
              type="text"
              id="price"
              name="price"
              value={price}
              onChange={onChange}
            />

            <label htmlFor="stock">Stock</label>
            <input
              type="number"
              id="stock"
              name="stock"
              value={stock}
              onChange={onChange}
            />

            <label htmlFor="weight">Weight</label>
            <input
              type="text"
              id="weight"
              name="weight"
              value={weight}
              onChange={onChange}
            />

            <label htmlFor="category">Category</label>
            <select
              id="category"
              name="category"
              value={category}
              onChange={onChange}
            >
              <option value="">Select category</option>
              {PRODUCT_CATEGORIES?.map((category) => (
                <option value={category} key={category}>
                  {category}
                </option>
              ))}
            </select>

            <div className="trending-products">
              <label htmlFor="isTrending">Show in Trending</label>
              <input
                type="checkbox"
                id="isTrending"
                name="isTrending"
                checked={isTrending}
                onChange={onChange}
              />
            </div>

            <div className="recommended-products">
              <label htmlFor="isRecommended">Show in Recommended</label>
              <input
                type="checkbox"
                id="isRecommended"
                name="isRecommended"
                checked={isRecommended}
                onChange={onChange}
              />
            </div>

            <button className="create-product-btn" disabled={isLoading}>
              {isLoading ? "Creating..." : "Create"}
            </button>
          </form>
        </div>
      </section>
    </>
  );
};

export default NewProduct;
