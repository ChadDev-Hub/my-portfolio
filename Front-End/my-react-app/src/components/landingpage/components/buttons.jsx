import React from "react"
import { Button } from 'react-bootstrap'
import mailGift from "../../../assets/mail.gif"
import Fab from '@mui/material/Fab';
import InfoOutlineIcon from "@mui/icons-material/InfoOutline";

// Buttons
function Buttons(props) {
  function handleshowForm(){
    props.showForm()
  }

  return (
    <div className='d-flex gap-3 justify-content-lg-end align-content-sm-center'>
      <Fab variant="extended" color="inhirit" className='profile-butt' href="/profile/aboutme">Know More <InfoOutlineIcon/> </Fab>
      <Fab variant="extended" className='profile-butt' color="primary" onClick={handleshowForm}>Message Me!<img src={mailGift} className="iconEmoji" alt="Email" /></Fab>
    </div>
  )
}

export default Buttons