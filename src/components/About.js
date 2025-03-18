import React from "react";

const About = () => {
  return (
    <div className="about-container">
      <section className="about-section">
        <div className="anim-icons full-width">
          <span className="icon icon-dots wow fadeInleft"></span>
          <span className="icon icon-circle-1 wow zoomIn"></span>
        </div>
        <div className="auto-container">
          <div className="row">
            <div className="content-column col-lg-6 col-md-12 col-sm-12">
              <div className="inner-column">
                <div className="sec-title">
                  <span className="title">ABOUT US</span>
                  <h2 className="animate-charcter">
                    Welcome to the ameotech Informatics
                  </h2>
                  <div className="text">
                    Ready Matrimonial provides decent Matrimonial PHP Script in
                    various design templates at a reasonable price. It is also
                    available in Android & iOs versions.
                  </div>
                </div>
                <ul className="list-style-one">
                  <li>Profile with fully updated details</li>
                  <li>Multiple & easy way to contact</li>
                  <li>Automatic Matching System</li>
                  <li>Easy & flexible navigations</li>
                </ul>
                <div className="btn-box">
                  <a href="#" className="theme-btn btn btn-style-three">
                    <span className="btn-title">Register Now</span>
                  </a>
                </div>
              </div>
            </div>
            <div className="image-column col-lg-6 col-md-12 col-sm-12 d-none d-sm-block">
              <div className="image-box">
                <figure className="image wow fadeIn">
                  <img
                    className="d-none d-lg-block d-xl-block d-md-block"
                    alt=""
                    style={{ maxWidth: `100%` }}
                  />
                </figure>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default About;
