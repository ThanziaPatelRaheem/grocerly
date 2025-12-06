import React from "react";

const ProductDescription = ({ product }) => {
  return (
    <div className="product-description-section">
      <p className="product-des">{product.description}</p>
    </div>
  );
};

export default ProductDescription;
