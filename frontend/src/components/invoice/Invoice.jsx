import React, { useEffect } from "react";
import MetaData from "../Layout/MetaData";
import { Link, useParams } from "react-router-dom";
import Loader from "../Layout/Loader";
import toast from "react-hot-toast";
import { useOrderDetailsQuery } from "../../redux/api/orderApi";
import html2canvas from "html2canvas";
import { jsPDF } from "jspdf";
import GroLogo from "../../assets/images/Grocerly.png";
import { MdKeyboardDoubleArrowLeft } from "react-icons/md";

const Invoice = () => {
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

  useEffect(() => {
    if (error) {
      toast.error(error?.data?.message);
    }
  }, [error]);

  const handleDownload = () => {
    const input = document.getElementById("order_invoice");
    html2canvas(input).then((canvas) => {
      const imgData = canvas.toDataURL("image/png");
      const pdf = new jsPDF();
      const pdfWidth = pdf.internal.pageSize.getWidth();
      pdf.addImage(imgData, "PNG", 0, 0, pdfWidth, 0);
      pdf.save(`invoice_${order?._id}.pdf`);
    });
  };

  if (isLoading) return <Loader />;
  return (
    <>
      <MetaData title={"Order Invoice"} />
      <section className="invoice-section main-grid">
        <Link to="/me/orders" relative="path" className="orders-back-btn">
          <MdKeyboardDoubleArrowLeft className="back-arrow-btn" />
          <span className="back-text">Back to My Orders</span>
        </Link>
        <div className="btn-download-container">
          <button
            type="button"
            className="btn-download"
            onClick={handleDownload}
          >
            Download PDF
          </button>
        </div>

        <div id="order_invoice" className="invoice-wrapper">
          <article className="invoice-header">
            <div className="invoice-brand">
              <div className="invoice-image-container">
                <img
                  src={GroLogo}
                  alt="Company Logo"
                  className="invoice-logo"
                />
              </div>

              <div className="invoice-detail-id">
                <h3 className="invoice-title">Invoice</h3>
                <p className="invoice-section-id">#{order?._id}</p>
              </div>
            </div>
          </article>

          <article className="invoice-meta">
            <div className="invoice-user-details">
              <div>
                <span>Name :</span>
                <p>{user?.name}</p>
              </div>
              <div>
                <span>Email :</span>
                <p>{user?.email}</p>
              </div>
              <div>
                <span>Phone :</span>
                <p>{shippingInfo?.phoneNo}</p>
              </div>
              <div className="meta-address">
                <span>Address :</span>
                <p>
                  {shippingInfo?.address}, {shippingInfo?.city},
                  {shippingInfo?.zipCode}, {shippingInfo?.country}
                </p>
              </div>
              <div>
                <span>Date :</span>
                <p>{new Date(order?.createdAt).toLocaleString("en-SG")}</p>
              </div>
              <div>
                <span>Status :</span>
                <p>{paymentInfo?.status}</p>
              </div>
            </div>
            <div className="invoice-company">
              <div className="company-name">Grocerly</div>
              <div>30 Raffles Place,</div>
              <div>Singapore 048622</div>
              <div>Tel: +65 6909 5500</div>
              <div>
                <a href="mailto:info@grocerly.com">info@grocerly.com</a>
              </div>
            </div>
          </article>

          <article className="invoice-body">
            <table className="invoice-table">
              <colgroup>
                <col className="colw-id" />
                <col className="colw-name" />
                <col className="colw-price" />
                <col className="colw-qty" />
                <col className="colw-total" />
              </colgroup>
              <thead className="invoice-head">
                <tr>
                  <th>ID</th>
                  <th>Name</th>
                  <th>Price</th>
                  <th>Qty</th>
                  <th>Total</th>
                </tr>
              </thead>
              <tbody className="invoice-table-body">
                {orderItems?.map((item) => {
                  const price = Number(item?.price) || 0;
                  const qty = Number(item?.quantity) || 0;
                  const lineTotal = price * qty;
                  return (
                    <tr key={item?.product}>
                      <td className="col-id">{item?.product}</td>
                      <td className="col-name">{item?.name}</td>
                      <td className="col-price">${price}</td>
                      <td className="col-qty">{qty}</td>
                      <td className="col-total">${lineTotal}</td>
                    </tr>
                  );
                })}
                <tr className="sum-row">
                  <td colSpan={4} className="sum-label">
                    Subtotal
                  </td>
                  <td className="sum-value">${order?.itemsPrice ?? 0}</td>
                </tr>
                <tr className="sum-row">
                  <td colSpan={4} className="sum-label">
                    Tax
                  </td>
                  <td className="sum-value">${order?.taxAmount ?? 0}</td>
                </tr>
                <tr className="sum-row">
                  <td colSpan={4} className="sum-label">
                    Shipping
                  </td>
                  <td className="sum-value">${order?.shippingAmount ?? 0}</td>
                </tr>
                <tr className="sum-row grand-row">
                  <td colSpan={4} className="grand-label">
                    Grand Total
                  </td>
                  <td className="sum-value grand-value">
                    ${order?.totalAmount ?? 0}
                  </td>
                </tr>
              </tbody>
            </table>

            <div className="invoice-notice">
              <strong>Notice:</strong> A finance charge of 1.5% will be made on
              unpaid balances after 30 days.
            </div>
          </article>

          <footer className="invoice-footer">
            Invoice was created electronically and is valid without a signature.
          </footer>
        </div>
      </section>
    </>
  );
};

export default Invoice;
