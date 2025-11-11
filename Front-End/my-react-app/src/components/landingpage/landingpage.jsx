import React, { useEffect } from 'react'
import Info from './components/information'
import Prof from './components/profile'
import Buttons from './components/buttons'
import Images from './components/icons'
import Foot from '../components/footer'
import { Container, Row, Col } from 'react-bootstrap'
import Header from '../components/header'
import MessageForm from './components/form'
import { useState } from 'react'
import SentSucess from './components/messageSent'
import { Loader } from '../Loading'
import axios from 'axios'
// API BASE URL
const baseUrl = import.meta.env.VITE_BASE_URL


function Landing() {
  const [data, setData] = useState("");
  const [isFormShow, setFormShow] = useState(false)
  const [isSent, setIsSent] = useState(false)

  

  
  function handleMessageClick(){
    setFormShow(
      !isFormShow
    )
  }

  function handleMessageSent(){
    setIsSent(true)
  }
  
  useEffect(()=>{
    if (isSent){
     setTimeout(() => {
      setIsSent(false)
    }, 5000)}
  },[isSent])

  useEffect(() => {
    async function fetchData() {
      try {
        const baseUrl = import.meta.env.VITE_BASE_URL
        const result = await axios.get(`${baseUrl}/`);
        setTimeout(()=>setData(result.data),5000);
      } catch (err) {
        console.log(err.message);
      } 
    };
    fetchData();
  }, []);




  return (
    <>
    {data === "" ? <Loader/> : <div className='landing-page vw-100'>
      <Header />
      <Container fluid="md" className='cont d-flex flex-column pt-0 pt-md-3 mt-sm-0 min-vh-100'>
        <Row className='mt-5 pt-5'>
          {/* Information Section */}
          <Col xs md={7} className='order-2 order-md-1 ps-4 pe-4'>
            <Info data = {data}/>
          </Col>
          {/* Profile Section */}
          <Col md={5} className='order-1 order-md-2 d-flex pb-3 pb-md-0 mt-md-1 justify-content-center align-items-center'>
            <Prof profileclass = "profpic profile-butt" prof={data}/>
          </Col>
        </Row>
        <Row>
          <Col xs md={7} sm={12}  className='d-flex p-4 justify-content-center justify-content-sm-center justify-content-lg-end'>
            <Buttons showForm = {handleMessageClick}/>
          </Col>
          <Col xs md={5} sm={12} className='d-flex justify-content-center align-items-start'>
            <Images />
          </Col>
        </Row>
        <Row>
        {isFormShow && <MessageForm emailSent = {handleMessageSent} baseurl = {baseUrl} show= {isFormShow} showForm = {handleMessageClick}/>}
        {isSent && <SentSucess/>}
        </Row>
      </Container>
      <Foot />
    </div>}
    </>
  )
}

export default Landing