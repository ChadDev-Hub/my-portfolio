import React from "react";

// Profile Picture
function Prof(props) {
  return (
    <div className={`${props.profileclass} position-relative rounded-circle card bg-dark`}>
      <img className="rounded-circle img-fluid" src={`data:image/png;base64,${props.prof.profile}`} alt="Profile Picture" />
    </div>
  );
}


export default Prof