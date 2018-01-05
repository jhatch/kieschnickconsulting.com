import React from 'react'
import ExtLink from './ExtLink';
import './DisplayImage.scss';

const DisplayImage = props => (
  <figure className={'display-image'}>
    <img src={props.src} alt={props.label} />
    <figcaption>
      <label>{props.label}</label>
      <label>{props.attrlabel}</label>
      <ExtLink to={props.attrlink} />
    </figcaption>
  </figure>
);

export default DisplayImage;
