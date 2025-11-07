import React from "react";

function SentSucess() {
    return (
        <div className="d-flex-row  bg-transparent justify-content-center align-item-center text-white  mb-4 w-50  rounded position-fixed top-50 start-50 translate-middle">
            <div className="d-flex text-success justify-content-center">
                Thanks for Messaging
            </div>
            <div class="success-checkmark bg-transparent shadow position-relative">
                <div class="check-icon">
                    <span class="icon-line line-tip"></span>
                    <span class="icon-line line-long"></span>
                    <div class="icon-circle"></div>
                    <div class="icon-fix"></div>
                </div>

            </div>

        </div>
    );
};

export default SentSucess