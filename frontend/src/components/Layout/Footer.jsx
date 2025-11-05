import React from "react";
import { NavLink } from "react-router";
import { FaFacebookSquare } from "react-icons/fa";
import { FaSquareInstagram } from "react-icons/fa6";
import { FaSquareXTwitter } from "react-icons/fa6";
import { IoLogoYoutube } from "react-icons/io5";
import "../../css/footer.css";
import footerLogo from "../../assets/images/Grologo.png";

const Footer = () => {
  return (
    <footer className="footer-section main-grid">
      <div className="footer-logo">
        <img
          src={footerLogo}
          alt="footer-brand-logo"
          className="footer-brand-logo"
        />
        <p className="brand-tagline">
          Freshness delivered daily to your door. We focus on quality organic
          produce sourced locally for the best taste and health.
        </p>
      </div>
      <div className="footer-quick-links">
        <h3 className="column-title">Quick Links</h3>
        <nav className="quick-links-nav">
          <ul className="quick-links-container">
            <li className="quick-links-list">
              <NavLink
                to="/about"
                className={({ isActive }) =>
                  isActive ? "active-quick-link-items" : "quick-links-items"
                }
              >
                About Us
              </NavLink>
            </li>
            <li>
              <NavLink
                to="/contact"
                className={({ isActive }) =>
                  isActive ? "active-quick-link-items" : "quick-links-items"
                }
              >
                Contact
              </NavLink>
            </li>
            <li>
              <NavLink
                to="/shipping"
                className={({ isActive }) =>
                  isActive ? "active-quick-link-items" : "quick-links-items"
                }
              >
                Shipping Info
              </NavLink>
            </li>
            <li>
              <NavLink
                to="/policy"
                className={({ isActive }) =>
                  isActive ? "active-quick-link-items" : "quick-links-items"
                }
              >
                Privacy Policy
              </NavLink>
            </li>
          </ul>
        </nav>
      </div>
      <div className="footer-social-icons">
        <h3 className="social-title">Follow Us</h3>
        <nav className="socials-nav">
          <ul className="socials-container">
            <li className="socials-list">
              <a href="">
                <FaFacebookSquare className="socials-icon" />
              </a>
            </li>
            <li className="socials-list">
              <a href="">
                <FaSquareInstagram className="socials-icon" />
              </a>
            </li>
            <li className="socials-list">
              <a href="">
                <FaSquareXTwitter className="socials-icon" />
              </a>
            </li>
            <li className="socials-list">
              <a href="">
                <IoLogoYoutube className="socials-icon-youtube" />
              </a>
            </li>
          </ul>
        </nav>
      </div>

      <div className="copyrights-container">
        <hr class="footer-divider" />
        <p className="copyrights-tagline">
          &copy; {new Date().getFullYear()} Grocerly. All rights reserved.
        </p>
      </div>
    </footer>
  );
};

export default Footer;
