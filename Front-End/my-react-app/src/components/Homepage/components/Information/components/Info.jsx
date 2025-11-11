import React, {useState} from "react";
import { Stack } from "react-bootstrap";
import { Card } from "react-bootstrap";
import { Accordion } from "react-bootstrap";
import UpworkIcon from "../../../../../assets/upwork-svgrepo-com.svg"
import GitHubIcon from "../../../../../assets/GitHub.svg"
import PhoneIcon from '@mui/icons-material/Phone';
import EmailIcon from '@mui/icons-material/Email';
import HomeIcon from '@mui/icons-material/Home';
import LinkedIn from "../../../../../assets/LinkedIn.svg"
import IconButton from "@mui/material/IconButton";
import GmailIcon from "../../../../../assets/gmail-icon-logo-svgrepo-com.svg"
import MessageForm from "../../../../landingpage/components/form";

function ProfInfo(props) {
    const [showForm, setShowForm] = useState(false)
    function HandleShowForm(){
        setShowForm(!showForm)
    }
    return (
        <Stack>
            <div>
                <Card className="p-3 border border-0">
                    <Card.Img className="rounded-circle" variant="top" src={`data:image/png;base64,${props.profile_data}`} alt="Profile Picture" />
                </Card>
            </div>
            <div>
                <Accordion flush>
                    <Accordion.Item>
                        <Accordion.Header className="rubik-dirt-text-sub text-center p-1">
                            INFO
                        </Accordion.Header>
                        <Accordion.Body className="p-1 pt-2">
                            <div className="d-flex overflow-auto flex-nowrap gap-2">
                                <HomeIcon />
                                <p>Coron Palawan, Philippines 5316</p>
                            </div>
                            <div className="d-flex overflow-auto flex-nowrap gap-2">
                                <PhoneIcon />
                                <p >
                                    +639455411724
                                </p>

                            </div>
                            <div className="d-flex overflow-auto flex-nowrap gap-2">
                                <EmailIcon/>
                                <p onMouseOver={console.log("hellow world")} className="cursor-pointer">
                                    richardrojo61@gmail.com
                                </p>
                                        
                                
                                
                            </div>
                            <ul className="d-flex flex-sm-column justify-content-evenly gap-4">
                                <li>
                                    <IconButton href="https://www.upwork.com/freelancers/~01c94604f88f19d080?mp_source=share">
                                        <img className="links" src={UpworkIcon} alt="Upwork" />
                                    </IconButton>
                                </li>
                                <li>
                                    <IconButton href="https://github.com/ChadDev-Hub">
                                        <img className="links" src={GitHubIcon} alt="Github" />
                                    </IconButton>
                                </li>
                                <li>
                                    <IconButton href="https://www.linkedin.com/in/richard06/">
                                        <img className="links" src={LinkedIn} alt="linkedIn" />
                                    </IconButton>
                                </li>
                                <li>
                                    <IconButton onClick={HandleShowForm}>
                                        <img className="links" src={GmailIcon} alt="gmail"/>
                                    </IconButton>
                                </li>
                            </ul>
                        </Accordion.Body>
                    </Accordion.Item>
                </Accordion>
            </div>

            {showForm &&
             <div className="flex justify-content-center vw-100 position-fixed start-50 top-25 translate-middle" style={{zIndex: 9999}}>
                    <MessageForm show={showForm} showForm = {HandleShowForm}/>
                </div>}
        </Stack>
        
    )
}

export default ProfInfo