import React from "react";
import { Accordion } from "react-bootstrap";

function AboutMe(props) {
    return (
        <Accordion flush defaultActiveKey={['0']} alwaysOpen>
            <Accordion.Item eventKey="0">
                <Accordion.Header className="bg-lightblu">
                    <h5 className="rubik-dirt-text-sub">About me</h5>
                </Accordion.Header>
                <Accordion.Body>
                    <p style={{ textIndent: '30px' }}>{props.aboutcontent}</p>
                </Accordion.Body>
            </Accordion.Item>
        </Accordion>
    );
}
export default AboutMe