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
    <div className="left">
      <h2 className="intro-text">Jan Rozman</h2>
    </div>
    <div className="right">
      <div className="fuel-text">
        <h3 className="welcome-text">WELCOME TO MY PERSONAL WEB PORTFOLIO</h3>
        What fuels me is capturing interesting moments that happen around us.
        Weather it is a one in a lifetime occasion or just common day to day
        stuff every moment can be made great and is in a way, worth keeping.
        Feel free to browse my personal web gallery.
      </div>
      <div className="li-container">
        <h3 className="equipment-header">EQUIPMENT:</h3>
        <span>Camera - Canon eos r5</span>
        <span>Strobes - Quadralite ad600 pro, Quadralite stroboss 60 basic</span>
        <span>
          Lenses - Canon ef 16-35mm f/2.8l usm ii, Sigma art 50mm f/1.4, igma
          70-200mm f/2.8
        </span>
        <span>Gimbal - DJI RSC 2 gimbal</span>
        <span>Tripod - 2x Godox 260T 260cm Air, Manfrotto MK290</span>
        <span>
          Softbox - Quadralite hexadecagon 90cm, Aputure ligh dome mini II
        </span>
      </div>
      <div className="sm-cont">
        <div className="contact-container">
          <h3 className="contact-header">CONTACT:</h3>
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
            onClick={() => openSite("https://www.instagram.com/clarityst/")}
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
      <div className="mobile-divider"></div>
    </div>
  </div>
);

PortfolioAboutMe.propTypes = {};

PortfolioAboutMe.defaultProps = {};

export default PortfolioAboutMe;
