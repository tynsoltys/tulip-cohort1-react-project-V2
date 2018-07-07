import React from "react";

const Product = ({selector, product }) => {
  const { image_thumb_url, id, name } = product;
  return (
    <li key={id} onClick={() => selector(product) }>
      <img src={image_thumb_url} alt={name}/>
    </li> 
  )
}

export default Product;