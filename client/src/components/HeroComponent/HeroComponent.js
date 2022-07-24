import React from 'react';
import PropTypes from 'prop-types';
import './HeroComponent.css';
import PortfolioPhoto from '../PortfolioPhoto/PortfolioPhoto';
import PortfolioAboutMe from '../PortfolioAboutMe/PortfolioAboutMe';

const HeroComponent = () => (
  <div className="HeroComponent">
    <PortfolioPhoto></PortfolioPhoto>
    <PortfolioAboutMe></PortfolioAboutMe>
  </div>
);

HeroComponent.propTypes = {};

HeroComponent.defaultProps = {};

export default HeroComponent;
