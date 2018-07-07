import React from "react";

const Loading = ({message = "PARTY HAT ON?"}) => {
  return (
    <div className="loadingThing centerText">
        <h2> {message} </h2>
    </div>
  )
}

export default Loading;