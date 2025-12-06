import React, { useEffect, useState } from "react";
import MetaData from "../Layout/MetaData";
import Loader from "../Layout/Loader";
import { Link, useParams } from "react-router-dom";
import toast from "react-hot-toast";
import {
  useOrderDetailsQuery,
  useUpdateOrderMutation,
} from "../../redux/api/orderApi";
import { MdKeyboardDoubleArrowLeft } from "react-icons/md";

const ProcessOrder = () => {
  const { id } = useParams();
  const { data, isLoading, error } = useOrderDetailsQuery(id);

  const [updateOrder, { error: updateError, isSuccess }] =
    useUpdateOrderMutation();

  const order = data?.order || {};
  const {
    shippingInfo,
    orderItems,
    paymentInfo,
    user,
    totalAmount,
    orderStatus,
  } = order;

  const isPaid = paymentInfo?.status?.toLowerCase() === "paid" ? true : false;

  const [status, setStatus] = useState(orderStatus || "Processing");

  useEffect(() => {
    if (error) {
      toast.error(error?.data?.message);
    }
    if (updateError) {
      toast.error(updateError?.data?.message);
    }
    if (isSuccess) {
      toast.success("Order Updated");
    }
  }, [error, updateError, isSuccess]);

  useEffect(() => {
    if (orderStatus) setStatus(orderStatus);
  }, [orderStatus]);

  const updateOrderHandler = (orderId) => {
    const data = { status };
    updateOrder({ id: orderId, body: data });
  };

  if (isLoading) return <Loader />;

  return (
    <>
      <MetaData title={`Process Order #${order?._id || ""}`} />

      <section className="order-details-section process-order-section main-grid">
        <Link to="/admin/orders" className="orders-back-btn">
          <MdKeyboardDoubleArrowLeft className="back-arrow-btn" />
          <span className="back-text">Back to Orders</span>
        </Link>

        <div className="order-details-wrapper process-order-wrapper">
          <aside className="order-details-invoice process-order-details">
            <h4>Order Invoice</h4>
            <Link
              to={`/invoice/order/${order?._id}`}
              className="order-admin-btn-invoice"
            >
              Generate Invoice
            </Link>
          </aside>
          <aside className="order-details-invoice process-order-details admin">
            <h4 className="order-admin-title">Update Order Status</h4>

            <div className="order-admin-field">
              <div>
                <label htmlFor="order-status-select">Status : </label>
                <select
                  id="order-status-select"
                  className="order-status-select"
                  name="status"
                  value={status}
                  onChange={(e) => setStatus(e.target.value)}
                >
                  <option value="Processing">Processing</option>
                  <option value="Shipped">Shipped</option>
                  <option value="Delivered">Delivered</option>
                </select>
              </div>
              <div>
                <button
                  className="order-admin-btn"
                  onClick={() => updateOrderHandler(order?._id)}
                >
                  Update Status
                </button>
              </div>
            </div>
          </aside>

          <aside className="order-details-invoice">
            <h1>Order Details</h1>
          </aside>

          <aside className="info order-status-wrapper">
            <div>
              <h4>ID :</h4>
              <p>{order?._id}</p>
            </div>
            <div>
              <h4>Status :</h4>
              <p
                className={
                  String(orderStatus).includes("Delivered")
                    ? "greenColor"
                    : "purpleColor"
                }
              >
                {orderStatus}
              </p>
            </div>
            <div>
              <h4>Date :</h4>
              <p>
                {order?.createdAt
                  ? new Date(order?.createdAt).toLocaleString("en-SG")
                  : "-"}
              </p>
            </div>
          </aside>

          <aside className="info shipping-info-wrapper">
            <h3>Shipping Info</h3>
            <div>
              <h4>Name :</h4>
              <p>{user?.name}</p>
            </div>
            <div>
              <h4>Phone No :</h4>
              <p>{shippingInfo?.phoneNo}</p>
            </div>
            <div>
              <h4>Address :</h4>
              <p>
                {shippingInfo?.address}, {shippingInfo?.city},
                {shippingInfo?.zipCode}, {shippingInfo?.country}
              </p>
            </div>
          </aside>

          <aside className="info payment-info-wrapper">
            <h3>Payment Info</h3>
            <div>
              <h4>Status :</h4>
              <p className={isPaid ? "greenColor" : "redColor"}>
                {paymentInfo?.status}
              </p>
            </div>
            <div>
              <h4>Method :</h4>
              <p>{order?.paymentMethod}</p>
            </div>
            <div>
              <h4>Stripe ID :</h4>
              <p className="stripe-id">{paymentInfo?.id || "Nil"}</p>
            </div>
            <div>
              <h4>Amount Paid :</h4>
              <p>${totalAmount}</p>
            </div>
          </aside>

          <aside className="order-items-wrapper">
            <div className="order-items-header">
              <p className="order-items">Order Items</p>
              <p className="order-items-name">Name</p>
              <p className="order-items-qty">Quantity</p>
              <p className="order-items-price">Price</p>
              <p className="order-items-total">Total</p>
            </div>

            {orderItems?.map((item) => {
              const price = Number(item?.price) || 0;
              const qty = Number(item?.quantity) || 0;
              const lineTotal = price * qty;
              return (
                <React.Fragment key={item?.product}>
                  <div className="order-row">
                    <Link className="order-item-image">
                      <img
                        src={item?.image}
                        alt={item?.name}
                        height="45"
                        width="65"
                        className="order-item-image-img"
                      />
                    </Link>

                    <Link
                      to={`/products/${item?.product}`}
                      className="order-item-name-link"
                    >
                      {item?.name}
                    </Link>
                    <p className="orderItem-qty">{qty} Piece(s)</p>
                    <p className="orderItem-price">${price}</p>
                    <p className="line-total">${lineTotal}</p>
                  </div>
                </React.Fragment>
              );
            })}
          </aside>
        </div>
      </section>
    </>
  );
};

export default ProcessOrder;
