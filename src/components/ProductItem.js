import React, { useState } from 'react';
import { FaEdit } from 'react-icons/fa';
import { MdDelete } from "react-icons/md";
import { IoIosArrowBack, IoIosArrowForward } from "react-icons/io";



const ProductItem = ({ item, ...props }) => {
  const { id, name, url } = item;
  const [isActionPannel, setIsActionsPannel] = useState(false);
  console.log('yeeeeeesssss');
  

  const handleActionPannel = (action) => {
    if (action === 'move') {
      setIsActionsPannel(prevState => !prevState);
    } else if (action === 'edit') {
      setIsActionsPannel(prevState => !prevState);
      props.edit(id);
    } else if (action === 'delete') {
      setIsActionsPannel(prevState => !prevState);
      props.delete(id);
    }
  }
  return (
    <>
      <div className="product-inform">
        <div className="product-inform-container">
          <p>{props.index}.</p>
          <img src={`${url}`} alt={name} />
        </div>
        <h4>{name}</h4>
      </div>
      {
        isActionPannel
          ? <div className={isActionPannel ? "actions-container show" : "actions-container"}>
            <div>
              <FaEdit className="edit" onClick={()=>handleActionPannel('edit')} />
              <MdDelete className="delete" onClick={()=>handleActionPannel('delete')} />
            </div>
            <IoIosArrowForward onClick={()=>handleActionPannel('move')} />
          </div>
          : <IoIosArrowBack onClick={()=>handleActionPannel('move')} />
      }
    </>
  )
}

export default React.memo(ProductItem)
