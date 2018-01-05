import React from 'react'
import MenuLink from './MenuLink.jsx';
import './MenuBar.scss';

const MenuBar = props => (
  <ul className='menu-bar'>
  {props.items.map && props.items.map((item, i) => { 
    return <li key={i} ><MenuLink to={item.to} label={item.label} dropdown={item.subitems}/></li>
  })}
  </ul>
);

export default MenuBar;