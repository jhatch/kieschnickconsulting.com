import React from 'react'

const ExtLink = props => (
  <a rel='noreferrer noopener' alt={props.label || props.to} href={props.to} target='_blank'>
    {props.label || props.to}
  </a>
);

export default ExtLink;
