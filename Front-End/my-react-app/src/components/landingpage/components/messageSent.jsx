import React from "react";

function SentSucess() {
    return (
        <div className="d-flex-row  bg-transparent justify-content-center align-item-center text-white  mb-4 w-50  rounded position-fixed top-50 start-50 translate-middle">
            <div className="d-flex text-success justify-content-center">
                Thanks for Messaging
            </div>
            <div className="success-checkmark bg-dark shadow position-relative">
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