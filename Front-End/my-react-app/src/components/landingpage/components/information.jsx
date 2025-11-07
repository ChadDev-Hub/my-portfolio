import { useState, useEffect, useRef} from 'react'
function Info(props) {
return (
  <div className="text-start ">
    <h1 className="portfolio-title info fw-bolder rubik-dirt-text">{props.data.title}</h1>
    <p className='info text-light'>{props.data.time}</  p>
    <h2 className="info fw-bold text-light mb-3">Hi I'm {props.data.name}</h2>
    <h3 className="info text-light mt-5 mb-3">{props.data.about}</h3>
    <p className="info text-light mt-3">{props.data.summary}</p>
  </div>
);
}

export default Info;