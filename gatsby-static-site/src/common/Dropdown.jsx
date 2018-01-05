import React from 'react';
import Link from 'gatsby-link';
import './Dropdown.scss';

const Dropdown = props => (
  <ul className={'dropdown'}>
  {props.items.map && props.items.map(item => { 
    return <li key={item.to}><Link to={item.to}>{item.label}</Link></li>
  })}
  </ul>
);

export default Dropdown;
