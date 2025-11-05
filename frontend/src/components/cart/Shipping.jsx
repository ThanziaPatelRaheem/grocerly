import React, { useEffect, useState } from "react";
import { countries } from "countries-list";
import { useDispatch, useSelector } from "react-redux";
import { saveShippingInfo } from "../../redux/features/cartSlice";
import { useNavigate } from "react-router-dom";
import MetaData from "../../components/Layout/MetaData";

const Shipping = () => {
  const countriesList = Object.values(countries);

  const dispatch = useDispatch();
  const navigate = useNavigate();

  const [address, setAddress] = useState("");
  const [city, setCity] = useState("");
  const [zipCode, setZipCode] = useState("");
  const [phoneNo, setPhoneNo] = useState("");
  const [country, setCountry] = useState("");

  const { shippingInfo } = useSelector((state) => state.cart);

  useEffect(() => {
    if (shippingInfo) setAddress();
    setAddress(shippingInfo?.address);
    setCity(shippingInfo?.city);
    setZipCode(shippingInfo?.zipCode);
    setPhoneNo(shippingInfo?.phoneNo);
    setCountry(shippingInfo?.country);
  }, [shippingInfo]);

  const submitHandler = (e) => {
    e.preventDefault();

    dispatch(saveShippingInfo({ address, city, zipCode, phoneNo, country }));
    navigate("/confirm-order");
  };
  return (
    <>
      <MetaData title={"Shipping Info"} />
      <section className="shipping-section main-grid">
        <h2 className="shipping-heading">Shipping Info</h2>
        <div className="login-wrapper shipping-wrapper">
          <div className="login-container shipping-container">
            <form className="login-form shipping-form" onSubmit={submitHandler}>
              <label htmlFor="address" className="address-label">
                Address
              </label>
              <input
                id="email"
                name="email"
                type="text"
                value={address}
                onChange={(e) => setAddress(e.target.value)}
                placeholder="e.g. house no, building name"
              />

              <label htmlFor="city" className="address-label">
                City
              </label>
              <input
                name="city"
                id="city"
                type="text"
                placeholder="Singapore"
                value={city}
                onChange={(e) => setCity(e.target.value)}
              />

              <label htmlFor="contact" className="address-label">
                Phone No
              </label>
              <input
                id="contact"
                name="contact"
                type="text"
                placeholder="9642312"
                value={phoneNo}
                onChange={(e) => setPhoneNo(e.target.value)}
              />

              <label htmlFor="zipcode" className="address-label">
                Zip Code
              </label>
              <input
                id="zipcode"
                name="zipcode"
                type="text"
                placeholder="54321"
                value={zipCode}
                onChange={(e) => setZipCode(e.target.value)}
              />

              <label htmlFor="country" className="address-label">
                Country
              </label>
              <select
                id="country"
                name="country"
                placeholder="Singapore"
                required
                className="country-select"
                value={country}
                onChange={(e) => setCountry(e.target.value)}
              >
                {countriesList.map((country) => (
                  <option
                    key={country?.name}
                    value={country?.name}
                    className="country-option"
                  >
                    {country?.name}
                  </option>
                ))}
              </select>

              <button type="submit" className="shipping-btn">
                Continue
              </button>
            </form>
          </div>
        </div>
      </section>
    </>
  );
};

export default Shipping;
