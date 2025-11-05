import React, { useState } from "react";
import DatePicker, { registerLocale } from "react-datepicker";

import "react-datepicker/dist/react-datepicker.css";

import enGB from "date-fns/locale/en-GB";
registerLocale("en-GB", enGB);

const Dashboard = () => {
  const [selectedDate, setStartDate] = useState(() => {
    const d = new Date();
    d.setDate(1);
    return d;
  });
  const [endDate, setEndDate] = useState(new Date());
  return (
    <>
      <section className="dashboard-section main-grid">
        <article className="dashboard-wrapper">
          <div className="date-picker-container">
            <div className="date-field">
              <label>Start Date</label>
              <DatePicker
                selected={selectedDate}
                onChange={(date) => setStartDate(date)}
                selectsStart
                startDate={selectedDate}
                endDate={endDate}
                dateFormat="dd/MM/yyyy"
                locale="en-GB"
                className="date-picker"
                placeholderText="dd/mm/yyyy"
              />
            </div>
            <div className="date-field">
              <label>End Date</label>
              <DatePicker
                selected={endDate}
                onChange={(date) => setEndDate(date)}
                selectsEnd
                startDate={selectedDate}
                endDate={endDate}
                minDate={selectedDate}
                dateFormat="dd/MM/yyyy"
                locale="en-GB"
                placeholderText="dd/mm/yyyy"
                className="date-picker"
              />
            </div>
            <button className="fetch-btn">Fetch</button>
          </div>

          <div className="order-container">
            <div className="sales-wrapper">
              <div className="sales">
                Sales
                <br />
                <b>$0.00</b>
              </div>
            </div>
            <div className="sales-wrapper">
              <div className="sales">
                Orders
                <br />
                <b>$0.00</b>
              </div>
            </div>
          </div>
        </article>
      </section>
    </>
  );
};

export default Dashboard;
