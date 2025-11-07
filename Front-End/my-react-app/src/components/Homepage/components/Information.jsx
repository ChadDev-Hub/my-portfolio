import React from "react";
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';


function Info(props){
    return(
            <Container  className="bg-light rounded mt-4 shadow-lg">
            <Row>
                <Col sm={12} className="d-flex justify-content-center">
                <h1>hellow world</h1>
                
                </Col>
                <Col sm={12} className="ps-4 pe-4 sp-md-0">
                {props?.infodata && <p>{props.infodata.content}</p>}
                </Col>
            </Row>
        </Container>
    
    )  
}

export default Info;