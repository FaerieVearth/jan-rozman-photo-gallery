import React from "react";
import PropTypes from "prop-types";
import "./PortfolioAboutMe.css";
import fbLogo from "../../img/fblogo.png";
import gmailLogo from "../../img/gmaillogo.png";
import igLogo from "../../img/iglogo.png";

const openSite = (url) => {
  const newWindow = window.open(url, "_blank", "noopener,noreferrer");
  if (newWindow) newWindow.opener = null;
};

const PortfolioAboutMe = () => (
  <div className="PortfolioAboutMe">
    <h2 className="intro-text">Jan Rozman</h2>
    <h3 className="welcome-text">welcome to my personal web portfolio</h3>
    <div className="sm-cont">
      <div className="contact-container">
        <div className="contact-text">
          <span>
            <a className="" href="tel:+38641519414">
              Tel: +38641519414<br></br>
            </a>
          </span>
          <span>Mail: Rozman.jan00@gmail.com</span>
        </div>
      </div>
      <div className="logo-sm-cont">
        <img
          className="logo-sm"
          src={igLogo}
          onClick={() => openSite("https://www.instagram.com/janrozman_/")}
        />
        <img
          className="logo-sm"
          src={fbLogo}
          onClick={() =>
            openSite("https://www.facebook.com/Clarityst-111557937087687/")
          }
        />
        <img
          className="logo-sm"
          src={gmailLogo}
          onClick={() => openSite("https://mailto:Rozman.jan00@gmail.com")}
        />
      </div>
    </div>
  </div>
);

PortfolioAboutMe.propTypes = {};

PortfolioAboutMe.defaultProps = {};

export default PortfolioAboutMe;
