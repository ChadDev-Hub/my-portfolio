import React from "react";
import { Row, Col, Container } from "react-bootstrap";
import Carousel from 'react-bootstrap/Carousel';
import { TextLoading, InfoData } from "../../../../Loading";
function ToolsInterests(props) {
    const tools = props.tools
    const interests = props.interests
    console.log(interests)
    return (
        <Container className="p-0">
            <Row className="flex-md-nowrap">

                <Col md={6} className="ms-md-2 mt-3 bg-light shadow-sm border rounded p-0">
                   {!Array.isArray(tools) ? <InfoData /> : <div>
                        <h5 className="p-3 rubik-dirt-text-sub bg-lightblue">Tools Used</h5>
                         <Carousel slide >
                            {tools.map((tool, index) =>
                                <Carousel.Item
                                    className="overflow-auto"
                                    style={{
                                        minHeight: "300px",
                                        maxHeight: "300px"

                                    }}
                                    key={index} interval={1000}>
                                    <Container>
                                        <Row className="gap-2">
                                            <Col md={12} sm={12} className="d-flex justify-content-center">

                                                <img className="interests-icon"
                                                    src={`data:image/svg+xml;base64,${tool.image}`}
                                                    alt={`${tool.name}`} />
                                            </Col>
                                            <Col md={12} sm={12} className="d-flex justify-content-center text-center pe-5 ps-5">
                                                <div>
                                                    <h6 className="about-titles">{tool.name}</h6>
                                                    <p >{tool.content}</p>
                                                </div>

                                            </Col>
                                        </Row>
                                    </Container>
                                </Carousel.Item>)}
                        </Carousel>
                    </div>}

                </Col>

                <Col md={6} className="ms-md-2 mt-3 shadow-sm border rounded p-0 flex-shrink-1">
                    {!Array.isArray(interests) ? <InfoData /> : <div>
                        <h5 className="p-3 rubik-dirt-text-sub bg-lightblue">Interests</h5>
                        <Carousel slide >
                            {interests.map((interest, index) =>
                                <Carousel.Item
                                    style={{
                                        minHeight: "300px",
                                        maxHeight: "300px",
                                    }}
                                    key={index} interval={1000}>
                                    <Container>
                                        <Row className="gap-2">
                                            <Col sm={12} className="d-flex justify-content-center">

                                                <img className="interests-icon"
                                                    src={`data:image/png;base64,${interest.image}`}
                                                    alt={`${interest.interest}`} />
                                            </Col>
                                            <Col sm={12} md={12} className="d-flex justify-content-center pe-5 text-center ps-5">
                                                <div>
                                                    <h6 className="about-titles">{interest.interest}</h6>
                                                    <p>{interest.content}</p>

                                                </div>
                                            </Col>
                                        </Row>
                                    </Container>
                                </Carousel.Item>)}
                        </Carousel>
                    </div>}
                </Col>
            </Row>
        </Container>

    )
}

export default ToolsInterests