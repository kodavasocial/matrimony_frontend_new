import React from "react";

const Features = () => {
  return (
    <div className="features-container">
      <section className="features-section-two">
        <div className="auto-container">
          <div className="anim-icons">
            <span className="icon twist-line-1 wow zoomIn"></span>
            <span
              className="icon twist-line-2 wow zoomIn"
              data-wow-delay="1s"
            ></span>
            <span
              className="icon twist-line-3 wow zoomIn"
              data-wow-delay="2s"
            ></span>
          </div>
          <div className="row">
            <div className="title-block col-lg-4 col-md-12 col-sm-12 wow fadeInUp">
              <div className="inner-box">
                <div className="sec-title">
                  <span className="title">Features</span>
                  <h2>Our Feature</h2>
                </div>
              </div>
            </div>
            <div className="feature-block-two col-lg-4 col-md-6 col-sm-12 wow fadeInUp">
              <div className="inner-box">
                <div className="icon-box">
                  <span className="icon flaticon-lecture"></span>
                </div>
                <h4>
                  <a href="#">
                    Free SMS & Chat
                  </a>
                </h4>
                <div className="text">
                  An important facility such as chat is available in our site,
                  so that people can interact with each other.
                </div>
              </div>
            </div>
            <div className="feature-block-two col-lg-4 col-md-6 col-sm-12 wow fadeInUp">
              <div className="inner-box">
                <div className="icon-box">
                  <span className="icon flaticon-search"></span>
                </div>
                <h4>
                  <a href="#">
                    Auto Match Maker
                  </a>
                </h4>
                <div className="text">
                  Some new members get registered daily. This matrimony system
                  updates and shows.
                </div>
              </div>
            </div>
            <div
              className="feature-block-two col-lg-4 col-md-6 col-sm-12 wow fadeInUp"
              data-wow-delay="400ms"
            >
              <div className="inner-box">
                <div className="icon-box">
                  <span className="icon flaticon-diamond-1"></span>
                </div>
                <h4>
                  <a href="#">
                    Recommend Profile
                  </a>
                </h4>
                <div className="text">
                  when you follow some-one, you can see the updates of people
                  whom you follow.
                </div>
              </div>
            </div>
            <div
              className="feature-block-two col-lg-4 col-md-6 col-sm-12 wow fadeInUp"
              data-wow-delay="800ms"
            >
              <div className="inner-box">
                <div className="icon-box">
                  <span className="icon flaticon-success"></span>
                </div>
                <h4>
                  <a href="#">
                    Notification Alerts
                  </a>
                </h4>
                <div className="text">
                  The activities such as changing the display picture, birthday
                  notification, photo requests.
                </div>
              </div>
            </div>
            <div
              className="feature-block-two col-lg-4 col-md-6 col-sm-12 wow fadeInUp"
              data-wow-delay="1200ms"
            >
              <div className="inner-box">
                <div className="icon-box">
                  <span className="icon flaticon-employee"></span>
                </div>
                <h4>
                  <a href="#">
                    Restrictions Setting
                  </a>
                </h4>
                <div className="text">
                  Restrictions Enable Copying Photos & Video Disable Anti Spam
                  System Provided.
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Features;
