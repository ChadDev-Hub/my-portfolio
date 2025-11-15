import React from "react";
import Cards from "./components/ProjectsCard";
import Container from "@mui/material/Container";
import Grid from "@mui/material/Grid";
import Box from '@mui/material/Box';
function AppandProjects(props) {
    const appData = props.projects_data.projects_data
    return (
        <Container maxWidth={1200} className="d-flex justify-content-end">
            <Cards projects={appData} />
        </Container>
    )
};

export default AppandProjects;