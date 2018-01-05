import React from 'react'
import ExtLink from '../common/ExtLink.jsx';
import DisplayImage from '../common/DisplayImage.jsx';
import PeggyKieschnick1 from '../images/PeggyKieschnick1.jpg';

const ReadMore = () => (<span />);
const Quote = () => (<span />);

const HomePage = () => (
  <div>

    <h1>Home</h1>

    <DisplayImage 
      src={PeggyKieschnick1} 
      label='Peggy Kieschnick, MSW, ACSW'
      attrlabel='Photo by David J. Murray'
      attrlink='ClearEyePhoto.com'
    />

{/*    <Quote />
    
    <ul>
      <li><ReadMore /></li>
      <li><ReadMore /></li>
      <li><ReadMore /></li>
      <li><ReadMore /></li>
    </ul>

    <Quote />*/}
  </div>
)

export default HomePage
