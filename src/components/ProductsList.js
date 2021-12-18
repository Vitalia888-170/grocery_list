import React from 'react';
import ProductItem from './ProductItem';

 export const ProductsList = ({deleteProduct, editProduct, list}) => {
  return (
    <div className="list">
      {
        list.map((item, index) => {
          return <div className="item" key={item.id} >
            <ProductItem item={item}
              delete={deleteProduct} edit={editProduct} index={index + 1} />
          </div>
        })
      }
    </div>
  )
}


