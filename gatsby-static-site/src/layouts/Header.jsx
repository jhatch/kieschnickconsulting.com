import React from 'react'
import Link from 'gatsby-link';
import MenuBar from '../common/MenuBar.jsx';
import MenuLink from '../common/MenuLink.jsx';
import Dropdown from '../common/Dropdown.jsx';
import './Header.scss';

const Header = props => (
  <header>
    <div className={'title-section'}>
      <Link className={'main-title'} to='/'>Kieschinck Consulting Services</Link>
      <description>Skill, Experience, Integrity, Commitment</description>
    </div>
    <div className={'menu-section'}>
      <MenuBar 
      items={[{
        label: 'Home',
        to: '/'
      }, {
        label: 'Services',
        to: '/services',
        subitems: [{
          label: 'Strategic Planning',
          to: '/strategic-planning',
        }, {
          label: 'Facilitation',
          to: '/facilitation',
        }, {
          label: 'Grant Writing',
          to: '/grant-writing',
        }, {
          label: 'Assessment',
          to: '/assessment',
        }]
      }, {
        label: 'What Clients Say',
        to: '/'
      }, {
        label: 'Experience & Qualifications',
        to: '/'
      }, {
        label: 'About',
        to: '/About'
      }, {
        label: 'Contact',
        to: '/Contact'
      }]} />
    </div>
  </header>
);

export default Header;
