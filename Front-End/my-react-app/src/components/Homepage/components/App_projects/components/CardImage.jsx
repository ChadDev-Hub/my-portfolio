import React from "react";
import ImageList from '@mui/material/ImageList';
import ImageListItem from '@mui/material/ImageListItem';

function Image(props) {
    return (
        <ImageList sx={{ width: "100%", height: "100%" }} cols={1} rowHeight={60}>
            {props.images.map((im, index) => (
                <ImageListItem key={index}>
                    <img  src={`${im}`} alt=""/>
                </ImageListItem>
            ))}
        </ImageList>
    )
}

export default Image