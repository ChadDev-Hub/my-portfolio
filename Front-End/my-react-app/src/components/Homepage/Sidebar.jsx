import React, { useState } from "react";
import MenuIcon from '@mui/icons-material/Menu';
import Button from '@mui/material/Button';
import Container from 'react-bootstrap/Container';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import WidgetsIcon from '@mui/icons-material/Widgets';
import Stack from 'react-bootstrap/Stack';
function Sidebar(props) {
    return (
        <div onMouseEnter={props.inside} onMouseLeave={props.outside} className={`sidepanel bg-dark ${props.show ? "show" : ""} shadow-lg rounded-end-2 d-flex justify-content-center vh-100 text-white`}>
            <Stack gap={3}>
                <div className={`d-flex justify-content-center ${props.show ? "gap-2": "gap-4"} align-items-center ms-3 ms-md-3 me-md-2 mt-2`}>
                    <WidgetsIcon className={`${props.show ? "mb-1": "mb-1"}`}/>
                    <h4>{props.show? "MENU" : ""}</h4>
                </div>
                <div className={`justify-content-start align-items-center mt-2`}>
                {props.menus.map((m,index)=>(
                    <div key={index} className="gap-5">
                        <Button  name={m.name} onClick={props.menubutonclick} color={`${m.isActive ? "primary" : ""}`}  className={`justify-content-${props.show ? "start" : "center"} side-bar-button ps-2 ms-0`} startIcon={m.isActive ? m.active_icon : m.inactive_icon}>{props.show ? m.name: ""}</Button>
                    </div>
                ))}
            </div>
            </Stack>
        </div>
    )
}
export default Sidebar;