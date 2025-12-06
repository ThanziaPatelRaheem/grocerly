import React, { useEffect } from "react";
import MetaData from "../Layout/MetaData";
import Loader from "../Layout/Loader";
import { DataGrid } from "@mui/x-data-grid";
import { Stack, IconButton } from "@mui/material";
import VisibilityIcon from "@mui/icons-material/Visibility";
import PrintIcon from "@mui/icons-material/Print";
import { Link, useNavigate, useSearchParams } from "react-router-dom";
import { useMyOrdersQuery } from "../../redux/api/orderApi";
import toast from "react-hot-toast";
import { useDispatch } from "react-redux";
import { clearCart } from "../../redux/features/cartSlice";

const MyOrders = () => {
  const { data, isLoading, error } = useMyOrdersQuery();

  const [searchParams, setSearchParams] = useSearchParams();
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const orderSuccess = searchParams.get("order_success");

  useEffect(() => {
    if (error) {
      toast.error(error?.data?.message);
    }
    if (orderSuccess) {
      dispatch(clearCart());
      searchParams.delete("order_success");
      setSearchParams(searchParams, { replace: true });
      navigate("/me/orders", { replace: true });
    }
  }, [error, orderSuccess]);

  if (isLoading) return <Loader />;

  const columns = [
    {
      field: "id",
      headerName: "Order ID",
      flex: 1.5,
      sortable: false,
    },
    {
      field: "amount",
      headerName: "Amount Paid",
      flex: 1,
    },
    { field: "status", headerName: "Payment Status", flex: 1 },
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
            justifyContent: "center",
            alignItems: "center",
            height: "100%",
          }}
        >
          <IconButton
            size="small"
            sx={{
              color: "#59b828",
              "&:hover": { color: "#438e1c" },
            }}
            component={Link}
            to={`/me/order/${params.row.id}`}
          >
            <VisibilityIcon fontSize="inherit" />
          </IconButton>
          <IconButton
            size="small"
            sx={{
              color: "#FAC401",
              "&:hover": { color: "#FAD634" },
            }}
            color="success"
            component={Link}
            to={`/invoice/order/${params.row.id}`}
          >
            <PrintIcon fontSize="inherit" />
          </IconButton>
        </Stack>
      ),
    },
  ];

  const rows =
    data?.orders?.map((order) => ({
      id: order._id,
      amount: `$${order.totalAmount}`,
      status: order.paymentInfo?.status?.toUpperCase(),
      orderStatus: order.orderStatus,
    })) || [];

  return (
    <>
      <MetaData title={`My Orders`} />
      <section className="my-orders-section main-grid">
        <div className="my-orders-wrapper">
          <h1 className="my-orders-title">
            {data?.orders?.length}{" "}
            {data?.orders?.length > 1 ? "Orders" : "Order"}
          </h1>
          <div className="my-orders-grid">
            <DataGrid
              rows={rows}
              rowHeight={82}
              headerHeight={56}
              columns={columns.map((c) => ({ minWidth: 140, ...c }))}
              sx={{
                overflowX: "auto",
                "& .MuiDataGrid-cell, & .MuiDataGrid-columnHeaderTitle": {
                  color: "#1f2937",
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

export default MyOrders;
