import React from "react";
import Skeleton from '@mui/material/Skeleton';
import { Card, Container, Row, Col, Stack } from "react-bootstrap";
function Loader() {
    return (
        <div className="d-flex justify-content-center align-items-center vh-100 wh-100 bg-dark">
            <div className="loader" />
        </div>

    )
}

function TextLoading() {
    return (
        <Skeleton animation="wave" width={120} height={30} />
    );
};

function ResumeDataLoading() {
    return (
        <>
            <div className="d-md-flex mt-4 justify-content-md-between">
                <Skeleton animation="wave" width={300} height={40} />
                <Skeleton animation="wave" width={200} height={30} />
            </div>
            <div className="d-md-flex  justify-content-md-between">
                <Skeleton animation="wave" width={300} height={40} />
                <Skeleton animation="wave" width={200} height={30} />
            </div>
            <div className="p-3">
                <Skeleton className="w-sm-2" variant="rounded" width={300} height={150} />
            </div>
        </>);
};

function InfoData() {
    return (
        <Container >
            <Row>
                <Col>
                <Skeleton width={300} height={50}/>
                </Col>
            </Row>
            <Row>
                <Col >
                    <div className="d-flex justify-content-center">
                        <Skeleton className="justify-self-center" variant="circular" width={50} height={50} animation={"wave"} />

                    </div>
                    <div>
                        {Array.from({ length: 4 }).map((_, i) => (
                            <div key={i} className="d-flex justify-content-center">
                                <Skeleton width={400 - i * 100} height={20} />
                            </div>
                        ))}
                    </div>

                </Col>
            </Row>
        </Container>
    );
};

function AboutLoading() {
    return (
        <Container>
            <Row>
                <Col>
                <Skeleton width={300} height={50}/>
                </Col>
            </Row>
            <Row>
                <Col>
                    {Array.from({ length: 5 }).map((_, index) => (
                        <div key={index} className="d-flex overflow-hidden justify-content-center">
                            <Skeleton animation={"wave"} width={600 - index * 100} height={20} />
                        </div>
                    ))}
                </Col>
            </Row>
        </Container>
    );
};

function ProfileInfoLoading(){
    return(
        <Container>
        <Row>
            <Col className="d-flex pt-2 justify-content-center">
                <Skeleton variant="circular" animation={"wave"} width={120} height={120}/>
            </Col>
        </Row>
        <Row>
            <Col>
            {Array.from({length:9}).map((_, index)=>(
                <div key={index} className="overflow-hidden">
                    <Skeleton  width={50 + (20 * index)}/>
                </div>
            ))}
            </Col>
        </Row>
    </Container>
    );
    
};
export { TextLoading, ResumeDataLoading, Loader, InfoData, AboutLoading, ProfileInfoLoading };
