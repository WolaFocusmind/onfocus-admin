import React from 'react';

const ButtonOriginal = (props) => {
  return (
    <button className={"btn__primary btn__primary--admin "+ props.position}>
        { props.text ? props.text :'Ingresar' }
    </button>
)}
export default ButtonOriginal;