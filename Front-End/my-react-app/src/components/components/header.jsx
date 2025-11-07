import React from "react";
import Stack from '@mui/material/Stack';
import { flex, style } from "@mui/system";
import TerminalIcon from '@mui/icons-material/Terminal';
import AppBar from '@mui/material/AppBar';
import Container from '@mui/material/Container';
import Toolbar from '@mui/material/Toolbar';
function Header() {
    return (
        <AppBar position="static"  style={{backgroundColor:"darkblue"}}>
            <Container maxWidth="xl">
                <Toolbar>
                    <TerminalIcon sx={{ display: { xs: 'flex', md: 'flex' }, mr: 1 }}/>
                <header>
                    <h1>Chad-Dev-Hub</h1>
                </header>
                </Toolbar>
            </Container>
        </AppBar>
    )
}

export default Header;