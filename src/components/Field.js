import React from 'react'

export const Field = ({value, setValue, handleSubmit, isEditing}) => {
  return (
    <div className="content">
        <input type="text" placeholder="eg. yoghurt" value={value} onChange={(e) => setValue(e.target.value)} />
        <button className="btn" onClick={() => handleSubmit()}>{isEditing ? 'Edit' : 'Submit'}</button>
      </div>
  )
}


