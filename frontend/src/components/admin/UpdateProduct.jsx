import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import {
  useGetProductDetailsQuery,
  useUpdateProductMutation,
} from "../../redux/api/productApi.js";
import toast from "react-hot-toast";
import MetaData from "../Layout/MetaData";
import { PRODUCT_CATEGORIES } from "../../data/productCategories.js";

const UpdateProduct = () => {
  const navigate = useNavigate();
  const params = useParams();

  const { id } = params;

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

  const [updateProduct, { isLoading, error, isSuccess }] =
    useUpdateProductMutation();

  const { data, error: detailsError } = useGetProductDetailsQuery(id);

  useEffect(() => {
    if (data?.product) {
      setProduct({
        name: data?.product?.name,
        shortDescription: data.product.shortDescription || "",
        description: data.product.description,
        price: data?.product?.price,
        stock: data?.product?.stock,
        weight: data?.product?.weight,
        category: data?.product?.category,
        isTrending: data?.product?.isTrending,
        isRecommended: data?.product?.isRecommended,
      });
    }

    if (detailsError) {
      toast.error(detailsError?.data?.message || "Failed to load product");
    }

    if (error) {
      toast.error(error?.data?.message);
    }

    if (isSuccess) {
      toast.success("Product updated");
      navigate("/admin/products");
    }
  }, [error, isSuccess, data, detailsError, navigate]);

  const onChange = (e) => {
    const { name, type, value, checked } = e.target;

    setProduct((prev) => ({
      ...prev,
      [name]: type === "checkbox" ? checked : value,
    }));
  };

  const submitHandler = (e) => {
    e.preventDefault();
    updateProduct({ id: id, body: product });
  };

  return (
    <>
      <MetaData title={`UpdateProduct`} />
      <section className="create-product-section main-grid">
        <div className="create-product-wrapper">
          <h2>Update Product</h2>
          <form className="create-product-new-form" onSubmit={submitHandler}>
            <label htmlFor="name">Name</label>
            <input
              id="name"
              name="name"
              type="text"
              placeholder="Name"
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

            <label htmlFor="description">Full Description</label>
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
              {isLoading ? "Updating..." : "Update"}
            </button>
          </form>
        </div>
      </section>
    </>
  );
};

export default UpdateProduct;
