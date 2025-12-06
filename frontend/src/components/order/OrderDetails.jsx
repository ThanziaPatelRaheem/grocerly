import React, { useEffect } from "react";
import { Link, useParams } from "react-router-dom";
import Loader from "../Layout/Loader";
import MetaData from "../Layout/MetaData";
import { useOrderDetailsQuery } from "../../redux/api/orderApi";
import toast from "react-hot-toast";
import { MdKeyboardDoubleArrowLeft } from "react-icons/md";

const OrderDetails = () => {
  const params = useParams();
  const { id } = params;
  const { data, isLoading, error } = useOrderDetailsQuery(id);

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

  useEffect(() => {
    if (error) {
      toast.error(error?.data?.message);
    }
  }, [error]);

  if (isLoading) return <Loader />;

  return (
    <>
      <MetaData title={`Order Details`} />
      <section className="order-details-section main-grid">
        <Link to="/me/orders" relative="path" className="orders-back-btn">
          <MdKeyboardDoubleArrowLeft className="back-arrow-btn" />
          <span className="back-text">Back to My Orders</span>
        </Link>
        <div className="order-details-wrapper">
          <aside className="order-details-invoice">
            <h1>Your Order Details</h1>
            <Link to={`/invoice/order/${order?._id}`}>Invoice</Link>
          </aside>

          <aside className="info order-status-wrapper">
            <div>
              <h4>ID :</h4>
              <p>{order?._id}</p>
            </div>
            <div>
              <h4>Status :</h4>
              <p>{orderStatus}</p>
            </div>
            <div>
              <h4>Date :</h4>
              <p>{new Date(order?.createdAt).toLocaleString("en-SG")}</p>
            </div>
          </aside>

          <aside className=" info shipping-info-wrapper">
            <h3>Shipping Info</h3>
            <div>
              <h4>Name :</h4>
              <p>{user.name}</p>
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
              <p>{paymentInfo?.id || "Nil"}</p>
            </div>
            <div>
              <h4>Amount Paid :</h4>
              <p>{totalAmount}</p>
            </div>
          </aside>

          <aside className="order-items-wrapper">
            <div className="order-items-header">
              <p className="order-items">Order Items</p>
              <p className="order-items-name">Name</p>
              <p className="order-items-qty">Quanity</p>
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

export default OrderDetails;
