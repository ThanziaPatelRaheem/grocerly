import React, { useEffect, useState } from "react";
import MetaData from "../Layout/MetaData";
import Loader from "../Layout/Loader";
import { DataGrid } from "@mui/x-data-grid";
import { Stack, IconButton } from "@mui/material";
import { Link } from "react-router-dom";
import {
  useDeleteReviewMutation,
  useLazyGetProductReviewsQuery,
} from "../../redux/api/productApi";
import DeleteOutlineOutlinedIcon from "@mui/icons-material/DeleteOutlineOutlined";

import toast from "react-hot-toast";

const ProductReviews = () => {
  const [productId, setProductId] = useState("");

  const [getProductReviews, { data, error, isLoading }] =
    useLazyGetProductReviewsQuery();

  const [
    deleteReview,
    { error: deleteError, isLoading: isDeleteLoading, isSuccess },
  ] = useDeleteReviewMutation();
  useEffect(() => {
    if (error) {
      toast.error(error?.data?.message);
    }
    if (deleteError) {
      toast.error(deleteError?.data?.message);
    }
    if (isSuccess) {
      toast.success("Review Deleted");
    }
  }, [error, deleteError, isSuccess]);

  const deleteReviewHandler = (id) => {
    deleteReview({ productId, id });
  };

  const submitHandler = (e) => {
    e.preventDefault();
    getProductReviews(productId);
  };
  if (isLoading) return <Loader />;

  const columns = [
    {
      field: "id",
      headerName: "Review ID",
      flex: 1.5,
      sortable: false,
    },
    {
      field: "rating",
      headerName: "Rating",
      flex: 1,
      sortable: true,
    },
    { field: "comment", headerName: "Comment", flex: 1, sortable: true },
    {
      field: "user",
      headerName: "User",
      flex: 1,
      sortable: true,
    },

    {
      field: "actions",
      headerName: "Actions",
      flex: 1,
      sortable: false,
      align: "center",
      headerAlign: "center",
      renderCell: (params) => (
        <Stack
          direction="row"
          spacing={2}
          sx={{
            width: "100%",
            justifyContent: "center",
            alignItems: "center",
            height: "100%",
          }}
        >
          <IconButton
            size="small"
            sx={{
              color: "#bc4749",
              border: "1px solid #bc4749",
              borderRadius: "2px",
              "&:hover": { color: "white", background: "#bc4749" },
            }}
            onClick={() => deleteReviewHandler(params.row.id)}
            disabled={isDeleteLoading}
          >
            <DeleteOutlineOutlinedIcon fontSize="inherit" />
          </IconButton>
        </Stack>
      ),
    },
  ];

  const rows =
    data?.reviews?.map((review) => ({
      id: review?._id,
      rating: review?.rating,
      comment: review?.comment,
      user: review?.user?.name,
    })) || [];

  return (
    <>
      <MetaData title={`Product Reviews`} />
      <div className="product-id-review-section main-grid">
        <div className="product-id-review-wrapper">
          <form onSubmit={submitHandler}>
            <label htmlFor="productId_field" className="form-label">
              Enter Product ID
            </label>
            <input
              type="text"
              id="productId_field"
              className="form-control"
              value={productId}
              onChange={(e) => setProductId(e.target.value)}
            />

            <button
              id="search_button"
              type="submit"
              className="btn btn-primary w-100 py-2"
            >
              Search
            </button>
          </form>
        </div>
      </div>

      <section className="my-orders-section admin-products-section main-grid">
        {data?.reviews.length > 0 ? (
          <div className="my-orders-wrapper">
            <h1 className="my-orders-title">{data?.reviews?.length} Reviews</h1>
            <div className="my-orders-grid">
              <DataGrid
                rows={rows}
                rowHeight={82}
                headerHeight={56}
                columns={columns.map((c) => ({ minWidth: 140, ...c }))}
                sx={{
                  fontFamily:
                    '"Outfit", "Inter", system-ui, -apple-system, "Segoe UI", Roboto, Arial, sans-serif',

                  overflowX: "auto",

                  "& .MuiDataGrid-columnHeaders": {
                    backgroundColor: "#f3f4f6",
                    fontWeight: 600,
                  },

                  "& .MuiDataGrid-cell, & .MuiDataGrid-columnHeaderTitle": {
                    color: "#495057",
                    fontFamily: "",
                  },

                  "& .MuiDataGrid-virtualScrollerRenderZone .MuiDataGrid-row:nth-of-type(2n)":
                    {
                      backgroundColor: "#f9fafb",
                    },

                  "& .MuiDataGrid-row:hover": {
                    backgroundColor: "#e5e7eb !important",
                  },
                }}
                getRowId={(row) => row.id}
                pageSizeOptions={[5, 10, 20, 100]}
                initialState={{
                  pagination: { paginationModel: { pageSize: 10 } },
                }}
                disableRowSelectionOnClick
                autoHeight
                density="compact"
              />
            </div>
          </div>
        ) : (
          <p className="no-reviews-message">No reviews</p>
        )}
      </section>
    </>
  );
};

export default ProductReviews;
