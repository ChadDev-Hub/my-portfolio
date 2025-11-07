import React from "react";
import Skeleton from '@mui/material/Skeleton';

function Loader(){
    return(
        <div className="d-flex justify-content-center align-items-center vh-100 wh-100 bg-dark">
            <div className="loader"/>
        </div>
        
    )
}

function TextLoading(){
    return(
        <Skeleton animation="wave" width={120} height={30}/>
    );
};

function ResumeDataLoading(){
    return (
    <>
    <div className="d-md-flex mt-4 justify-content-md-between">
        <Skeleton animation="wave" width={300} height={40}/>
        <Skeleton animation="wave" width={200} height={30}/>
    </div>
    <div className="d-md-flex  justify-content-md-between">
        <Skeleton  animation="wave" width={300} height={40}/>
        <Skeleton animation="wave" width={200} height={30}/>
    </div>
    <div className="p-3">
        <Skeleton className="w-sm-2" variant="rounded" width={300} height={150} />
    </div>
    </>)
}

export {TextLoading, ResumeDataLoading, Loader};