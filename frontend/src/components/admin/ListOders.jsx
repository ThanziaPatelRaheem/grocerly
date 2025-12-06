import React, { useEffect } from "react";
import MetaData from "../Layout/MetaData";
import Loader from "../Layout/Loader";
import { DataGrid } from "@mui/x-data-grid";
import { Stack, IconButton } from "@mui/material";
import EditOutlinedIcon from "@mui/icons-material/EditOutlined";
import { Link } from "react-router-dom";
import DeleteOutlineOutlinedIcon from "@mui/icons-material/DeleteOutlineOutlined";
import toast from "react-hot-toast";
import {
  useDeleteOrderMutation,
  useGetAdminOrdersQuery,
} from "../../redux/api/orderApi.js";

const ListOrders = () => {
  const { data, isLoading, error } = useGetAdminOrdersQuery();

  const [
    deleteOrder,
    { error: deleteError, isLoading: isDeleteLoading, isSuccess },
  ] = useDeleteOrderMutation();

  useEffect(() => {
    if (error) {
      toast.error(error?.data?.message);
    }
    if (deleteError) {
      toast.error(deleteError?.data?.message);
    }
    if (isSuccess) {
      toast.success("Order Deleted");
    }
  }, [error, deleteError, isSuccess]);

  const deleteOrderHandler = (id) => {
    deleteOrder(id);
  };

  if (isLoading) return <Loader />;

  const columns = [
    {
      field: "id",
      headerName: "Product ID",
      flex: 1.5,
      sortable: false,
    },
    {
      field: "paymentStatus",
      headerName: "Payment Status",
      flex: 1,
    },
    { field: "orderStatus", headerName: "Order Status", flex: 1 },

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
            justifyContent: "center", // ⬅️ center inside the cell
            alignItems: "center", // ⬅️ vertical centering
            height: "100%",
          }}
        >
          <IconButton
            size="small"
            sx={{
              color: "#59b828",
              border: "1px solid #59b828",
              borderRadius: "2px",
              "&:hover": {
                color: "white",
                background: "#438e1c",
                border: "1px solid #438e1c",
              },
            }}
            component={Link}
            to={`/admin/orders/${params.row.id}`}
          >
            <EditOutlinedIcon fontSize="inherit" />
          </IconButton>

          <IconButton
            size="small"
            sx={{
              color: "#EF3634",
              border: "1px solid #EF3634",
              borderRadius: "2px",
              "&:hover": {
                color: "white",
                background: "#D3251E",
                border: "1px solid #D3251E",
              },
            }}
            onClick={() => deleteOrderHandler(params.row.id)}
            disabled={isDeleteLoading}
          >
            <DeleteOutlineOutlinedIcon fontSize="inherit" />
          </IconButton>
        </Stack>
      ),
    },
  ];

  const rows =
    data?.orders?.map((order) => ({
      id: order?._id,
      paymentStatus: order?.paymentInfo?.status?.toUpperCase(),
      orderStatus: order?.orderStatus,
    })) || [];

  return (
    <>
      <MetaData title={`All Orders`} />
      <section className="my-orders-section admin-products-section main-grid">
        <div className="my-orders-wrapper">
          <h1 className="my-orders-title">{data?.orders?.length} Orders</h1>
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
      </section>
    </>
  );
};

export default ListOrders;
