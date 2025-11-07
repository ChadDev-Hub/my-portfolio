import AppBar from "@mui/material/AppBar";
import React from "react";

function Foot() {
    const currentYear = new Date().getFullYear();
    return (
        <footer>
            <p className="text-light-emphasis">Copyright © {currentYear}</p>
        </footer>
    )
}

export default Foot;