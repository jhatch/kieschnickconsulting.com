import React from 'react';
import Link from 'gatsby-link';
import Dropdown from './Dropdown.jsx';
import './arrowDown.scss';

const MenuLink = props => (
  <div>
    <Link to={props.to}>{props.label}<div className={props.dropdown ? 'arrow-down' : ''}/></Link>
    {props.dropdown ? <Dropdown items={props.dropdown} /> : null }
  </div>
);

export default MenuLink;
