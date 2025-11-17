import React, { useState } from "react";
import BottomNavigation from '@mui/material/BottomNavigation';
import BottomNavigationAction from '@mui/material/BottomNavigationAction';

function Navigations(props){
    const [value,setValue] = useState("ABOUT ME")
    const handleValueChange = (event, newvalue)=> setValue(newvalue)
    // const handleClick = () => {
    //     props.menubutonclick();}
    const  handleClick = (event) => props.menubutonclick(event)
    
    return(
        <BottomNavigation className="bg-transparent"   sx={{width:300}} onChange={handleValueChange} value={value}>
            {props.menus.map((m,index)=>(
                <BottomNavigationAction
                onClick={handleClick}
                key={index}
                data-name= {m.name}
                value={m.name}
                icon={ m.active_icon}/>
            ))}
        </BottomNavigation>
    )
}
export default Navigations;