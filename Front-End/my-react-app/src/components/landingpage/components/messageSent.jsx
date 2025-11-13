import React from "react";

function SentSucess() {
    return (
        <div className=" glass d-flex-row  justify-content-center align-item-center text-white  mb-4 w-50  rounded position-fixed top-50 start-50 translate-middle" style={{maxWidth:"200px"}}>
            <div className="text-dark">
                <strong className="d-flex justify-content-center">Thanks for Messaging</strong>
                <p className="d-flex justify-content-center">Please Check your Spam</p>
            </div>
            <div className="success-checkmark position-relative">
                <div className="check-icon">
                    <span className="icon-line line-tip"></span>
                    <span className="icon-line line-long"></span>
                    <div className="icon-circle"></div>
                    <div className="icon-fix"></div>
                </div>

            </div>

        </div>
    );
};

export default SentSucess