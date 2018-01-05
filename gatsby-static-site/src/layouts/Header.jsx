import React from 'react'
import Link from 'gatsby-link';
import './Header.scss';

const Header = props => (
  <header>
    <Link className={'main-title'} to='/'>Kieschinck Consulting Services</Link>
    <description>Skill, Experience, Integrity, Commitment</description>
  </header>
);

export default Header;
