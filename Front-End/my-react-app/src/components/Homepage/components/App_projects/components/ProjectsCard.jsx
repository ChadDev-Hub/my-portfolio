import React from "react";
import Card from "@mui/material/Card";
import CardHeader from "@mui/material/CardHeader";
import CardContent from "@mui/material/CardContent";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import Grid from "@mui/material/Grid";
import Stack from "@mui/material/Stack";
import CardActions from "@mui/material/CardActions";
import IconButton from '@mui/material/IconButton';
import CardMedia from "@mui/material/CardMedia";
import LinkIcon from '@mui/icons-material/Link';
import HoverSound from '../../../../../assets/ui-pop.mp3'
import Image from "./CardImage";
function Cards(props) {
    const projects_data = props.projects
    const hoverSound = new Audio(HoverSound)

    function handlePlay() {
        hoverSound.currentTime = 0
        hoverSound.play()
    }
    return (
        <Grid container
            gap={{xs:2, md: 2 }}
            marginTop={{ xs: 2, md: 3 }}
            spacing={{ xs: 2, sm: 2, md: 2 }}
            maxWidth={1200}>
            {!Array.isArray(projects_data) ?
                <Grid></Grid>
                :
                projects_data.map((proj) => (
                        <Card key={proj.id}  sx={{ maxWidth: 300, display: "flex", flexDirection: "column" }}>
                            <CardHeader title={proj.title} />
                          
                            <CardMedia className="bg-transparent">
                                <Image images = {proj.image}/>
                            </CardMedia>
                            
                            <CardContent sx={{ flexGrow: 1, alignItems: "center" }}>
                                <Typography variant="body2"
                                    sx={{ color: 'text.secondary' }}>
                                    {proj.content}
                                </Typography>
                            </CardContent>
                            <CardActions className="bg-body-secondary" disableSpacing sx={{ justifyContent: "flex-end", alignContent: "flex-end" }}>
                                <IconButton onClick={handlePlay} className="shadow border border-light" href={proj.url}>
                                    <LinkIcon />
                                </IconButton>
                            </CardActions>
                        </Card>



                        
                )

                )}
        </Grid>
    )
}

export default Cards