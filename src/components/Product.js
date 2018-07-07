import React from "react";

const Product = (props) => {
  const { image_thumb_url, id, name } = props.product;
  const { selector } = props;
  return (
    <li key={id} onClick={() => selector(props.product) }>
      <img src={image_thumb_url} alt={name}/>
    </li> 
  )
}

export default Product;