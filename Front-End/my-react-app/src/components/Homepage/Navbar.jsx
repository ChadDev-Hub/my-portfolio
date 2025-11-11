import React from "react";
import MenuIcon from '@mui/icons-material/Menu';
import Button from '@mui/material/Button';
import Container from 'react-bootstrap/Container';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import Prof from "../landingpage/components/profile";
import ViewSidebarOutlinedIcon from '@mui/icons-material/ViewSidebarOutlined';
import ViewSidebarIcon from '@mui/icons-material/ViewSidebar';
function Navigation(props) {
    return (
        <Navbar className="bg-body-secondary w-md-0 justify-content-between" >
            <Container fluid>
                <Button onClick={props.click} startIcon={props.show? <ViewSidebarIcon/> : <ViewSidebarOutlinedIcon/>}></Button>
                <div className="d-flex align-items-center">
                    <Navbar.Brand href="/">Chad-Dev-Hub</Navbar.Brand>
                    {props?.navdata && <Prof profileclass="small-prof" prof = {props.navdata}/> }   
                </div>
            </Container>
        </Navbar>
    )
}

export default Navigation;