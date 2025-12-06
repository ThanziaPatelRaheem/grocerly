import React, { useEffect, useRef, useState } from "react";
import MetaData from "../Layout/MetaData";
import { RiDeleteBack2Line } from "react-icons/ri";
import { RiDeleteBin7Fill } from "react-icons/ri";
import { useNavigate, useParams } from "react-router-dom";
import {
  useDeleteProductImagesMutation,
  useGetProductDetailsQuery,
  useUploadProductImagesMutation,
} from "../../redux/api/productApi";
import toast from "react-hot-toast";

const UploadImages = () => {
  const fileInputRef = useRef(null);
  const params = useParams();
  const { id } = params;
  const navigate = useNavigate();
  const [images, setImages] = useState([]);
  const [imagesPreview, setImagesPreview] = useState([]);
  const [uploadedImages, setUploadedImages] = useState([]);

  const [uploadProductImages, { isLoading, error, isSuccess }] =
    useUploadProductImagesMutation();

  const [
    deleteProductImage,
    { isLoading: isDeleteLoading, error: deleteError },
  ] = useDeleteProductImagesMutation();

  const { data } = useGetProductDetailsQuery(id);

  useEffect(() => {
    if (data?.product) {
      setUploadedImages(data?.product?.images);
    }

    if (error) {
      toast.error(error?.data?.message);
    }
    if (deleteError) {
      toast.error(deleteError?.data?.message);
    }
    if (isSuccess) {
      setImagesPreview([]);
      toast.success("Images Uploaded");
      navigate("/admin/products");
    }
  }, [data, error, isSuccess, deleteError]);

  const onChange = (e) => {
    const files = Array.from(e.target.files);

    files.forEach((file) => {
      const reader = new FileReader();

      reader.onload = () => {
        if (reader.readyState === 2) {
          setImagesPreview((oldArray) => [...oldArray, reader.result]);
          setImages((oldArray) => [...oldArray, reader.result]);
        }
      };
      reader.readAsDataURL(file);
    });
  };

  const handleResetFileInput = () => {
    if (fileInputRef.current) {
      fileInputRef.current.value = "";
    }
  };

  const handleImagePreviewDelete = (image) => {
    const filteredImagesPreview = imagesPreview.filter((img) => img != image);

    setImages(filteredImagesPreview);
    setImagesPreview(filteredImagesPreview);
  };

  const submitHandler = (e) => {
    e.preventDefault();

    uploadProductImages({ id: params?.id, body: { images } });
  };

  const deleteImage = (imgId) => {
    deleteProductImage({ id: params?.id, body: { imgId } });
  };
  return (
    <>
      <MetaData title={`Upload Images`} />
      <section className="upload-images-section main-grid">
        <div className="upload-image-wrapper">
          <h2 className="mb-4">Upload Product Images</h2>
          <form
            className="upload-images-dashboard-form"
            encType="multipart/form-data"
            onSubmit={submitHandler}
          >
            <label htmlFor="customFile" className="">
              Choose Images
            </label>
            <input
              ref={fileInputRef}
              type="file"
              name="customFile"
              id="customFile"
              className="upload-product-image-input"
              multiple
              onChange={onChange}
              onClick={handleResetFileInput}
            />

            {imagesPreview.length > 0 && (
              <>
                {" "}
                <div className="new-images">
                  <p className="new-images-text">New Images:</p>
                </div>
                <div className="uploaded-images">
                  {imagesPreview?.map((img) => (
                    <div className="upload-product-image-card" key={img}>
                      <img
                        src={img}
                        alt="newImages"
                        className="card-img-top p-2"
                        style={{ width: "150px", height: "80px" }}
                      />
                      <button
                        type="button"
                        className="upload-product-image-btn"
                        onClick={() => handleImagePreviewDelete(img)}
                      >
                        <RiDeleteBack2Line className="upload-product-del-btn" />
                      </button>
                    </div>
                  ))}
                </div>
              </>
            )}

            {uploadedImages.length > 0 && (
              <>
                <div className="new-images">
                  <p className="new-images-text">Product Uploaded Images:</p>
                </div>
                <div className="uploaded-images">
                  {uploadedImages?.map((img) => (
                    <div className="upload-product-image-card" key={img?.url}>
                      <img
                        src={img?.url}
                        alt="uploadedImages"
                        className="uploadImages"
                        style={{ width: "150px", height: "80px" }}
                      />
                      <button
                        type="button"
                        className="upload-product-image-btn"
                        disabled={isLoading || isDeleteLoading}
                        onClick={() => deleteImage(img?.public_id)}
                      >
                        <RiDeleteBin7Fill className="upload-product-del-btn" />
                      </button>
                    </div>
                  ))}
                </div>
              </>
            )}

            <button
              id="register_button"
              type="submit"
              className="upload-image-btn"
              disabled={isLoading || isDeleteLoading}
            >
              {isLoading ? "Uploading..." : "  Upload"}
            </button>
          </form>
        </div>
      </section>
    </>
  );
};

export default UploadImages;
