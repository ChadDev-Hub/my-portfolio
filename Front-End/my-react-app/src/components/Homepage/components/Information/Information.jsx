import React, { useEffect, useState } from "react";
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import Card from 'react-bootstrap/Card';
import Accordion from 'react-bootstrap/Accordion';
import { TextLoading, InfoData, AboutLoading, ProfileInfoLoading } from "../../../Loading";
import ToolsInterests from "./components/ToolsInterests";
import ProfInfo from "./components/Info";
import AboutMe from "./components/About";

function Info(props) {
    const [profile, setProfile] = useState("")
    const [content, setContent] = useState("")
    

    useEffect(() => {
        async function data() {
            if (props?.infodata) {
                setProfile(props.infodata.profile)
                setContent(props.infodata.content)
            }
        }
        data();
    }, [props.infodata])

    
    return (
        <Container fluid className="bg-body-tartiary ms-md-2 me-md-2 p-md-2 rounded mt-3 mb-sm-3">
            <Row md={12} sm={12} xs={12} className="border flex justify-content-center border-0">
                <Col md={2} sm={12} xs={12} className="vh-lg-100 shadow-sm border">
                    {!profile ? <ProfileInfoLoading/> : <ProfInfo profile_data={profile} />}
                </Col>
                <Col md={9} sm={12}>
                    <Row className="border border-0 pe-md-2">
                        <Col md={12} sm={12} xs={12} className="rounded border shadow-sm ms-md-2 p-0">
                            {!content ? <AboutLoading /> : <AboutMe aboutcontent={content} />}
                        </Col>
                    </Row>
                    <Col>
                        <ToolsInterests interests={props.resumedata.interests_data} tools={props.resumedata.tools_data} />
                    </Col>
                </Col>
            </Row>
        </Container>
    )
}
export default Info;