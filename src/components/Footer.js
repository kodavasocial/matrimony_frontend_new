import React from "react";
// import AmeotechLogo from '../assets/images/ameotech-logo-11.png'
const Footer = () => {
  return (
    <div id="sticky-footer"className="footer-container">
      <footer className="main-footer style-two">
        <div className="auto-container">
          <div className="footer-content" style={{ padding: `25px 0 10px` }}>
            <div className="footer-logo ftr-dsk-lg">

            </div>
            {/* <ul className="footer-nav ftr-dsk-mn">
              <li>
                <a href="#">Home</a>
              </li>
              <li>|</li>
              <li>
                <a href="#">SignUp</a>
              </li>
              <li>|</li>

              <li>
                <a href="#">Happy Story</a>
              </li>
              <li>|</li>
              <li>
                <a href="#" target="_blank">
                  Wedding Services
                </a>
              </li>
              <li>|</li>
              <li>
                <a href="#">Blog</a>
              </li>
              <li>|</li>
              <li>
                <a href="#">About Us</a>
              </li>
              <li>
                <a href="#">Contact Us </a>
              </li>
            </ul> */}
            <div className="copyright-text">
              {" "}
              &copy; Copyright 2023 All Rights Reserved. BY:{" "}
              <a href="http://www.theworklabs.com">theworklabs</a>
            </div>
            <ul className="social-icon-one">
              <li>
                <a href="https://www.facebook.com/coorgimangala">
                  <span className="fab fa-facebook-f"></span>
                </a>
              </li>
              <li>
                <a href="#">
                  <span className="fab fa-twitter"></span>
                </a>
              </li>
              <li>
                <a href="#">
                  <span className="fab fa-youtube"></span>
                </a>
              </li>
              <li>
                <a href="https://www.instagram.com/kodavasocial/">
                  <span className="fab fa-instagram"></span>
                </a>
              </li>
            </ul>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default Footer;
