import React from "react";
import pythonLogo from '../../../assets/python-svgrepo-com.svg'
import reactLogo from '../../../assets/react.svg'
import postgreLogo from '../../../assets/postgresql.png'
// IMAGES
function Images(){
  const icons = [pythonLogo, reactLogo, postgreLogo];
  const doubledIcons = [...icons, ...icons];
  return(
    <div className='carousel-container position-relative d-flex justify-self-center mt-3 profile-butt'>
      <div className='carousel-track'>
        {doubledIcons.map((icon, index)=>(
          <img className="icon-skills" key={index} src={icon} alt="" width='60'/>
        ))}
      </div>
    </div>
  )
}

export default Images;