import React, { useEffect, useState } from "react";
import DatePicker, { registerLocale } from "react-datepicker";
import MetaData from "../Layout/MetaData";
import toast from "react-hot-toast";
import Loader from "../Layout/Loader";
import "react-datepicker/dist/react-datepicker.css";
import enGB from "date-fns/locale/en-GB";
import { useLazyGetDashboardSalesQuery } from "../../redux/api/orderApi";
registerLocale("en-GB", enGB);

const Dashboard = () => {
  const [startDate, setStartDate] = useState(() => {
    const d = new Date();
    d.setDate(1);
    return d;
  });
  const [endDate, setEndDate] = useState(new Date());

  const [getDashboardSales, { error, isLoading, data }] =
    useLazyGetDashboardSalesQuery();

  useEffect(() => {
    if (error) {
      toast.error(error?.data?.message);
    }
    if (startDate && endDate && !data) {
      getDashboardSales({
        startDate: new Date(startDate).toISOString(),
        endDate: endDate.toISOString(),
      });
    }
  }, [error]);

  const submitHandler = () => {
    getDashboardSales({
      startDate: new Date(startDate).toISOString(),
      endDate: endDate.toISOString(),
    });
  };

  if (isLoading) return <Loader />;

  return (
    <>
      <MetaData title={`Admin Dashboard`} />
      <section className="dashboard-section main-grid">
        <article className="dashboard-wrapper">
          <div className="date-picker-container">
            <div className="date-field">
              <label>Start Date</label>
              <DatePicker
                selected={startDate}
                onChange={(date) => setStartDate(date)}
                selectsStart
                startDate={startDate}
                endDate={endDate}
                dateFormat="dd/MM/yyyy"
                locale="en-GB"
                className="date-picker"
                placeholderText="dd/mm/yyyy"
                maxDate={new Date()}
              />
            </div>
            <div className="date-field">
              <label>End Date</label>
              <DatePicker
                selected={endDate}
                onChange={(date) => setEndDate(date)}
                selectsEnd
                startDate={startDate}
                endDate={endDate}
                minDate={startDate}
                maxDate={new Date()}
                dateFormat="dd/MM/yyyy"
                locale="en-GB"
                placeholderText="dd/mm/yyyy"
                className="date-picker"
              />
            </div>
            <button className="fetch-btn" onClick={submitHandler}>
              Fetch
            </button>
          </div>

          <div className="order-container">
            <div className="sales-wrapper">
              <div className="sales">
                Sales
                <br />
                <b>${data?.totalSales.toFixed(2)}</b>
              </div>
            </div>
            <div className="sales-wrapper">
              <div className="sales">
                Orders
                <br />
                <b>{data?.totalNumOrders}</b>
              </div>
            </div>
          </div>
        </article>
      </section>
    </>
  );
};

export default Dashboard;
