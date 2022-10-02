import React from 'react';
import PropTypes from 'prop-types';
import './PortfolioPhoto.css';

const PortfolioPhoto = () => (
  <div className="PortfolioPhoto">
      <img className="mainPhoto" src="https://res.cloudinary.com/dqpemptui/image/upload/v1664723993/headshot/Naslovnica_jv6hqv.jpg" alt="portfolio"/>
  </div>
);

PortfolioPhoto.propTypes = {};

PortfolioPhoto.defaultProps = {};

export default PortfolioPhoto;
