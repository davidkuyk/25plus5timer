import React from 'react';
import './../index.css';

const Break = props => {
  
  return (
    <>
      <div id="break">
        <div id="break-label">break length</div>
        <div id="break-selector">
          <i id="break-decrement" className="fas fa-chevron-circle-down" onClick={props.breakDecrement}></i>
          <div id="break-length">{props.breakLength}</div>
          <i id="break-increment" className="fas fa-chevron-circle-up" onClick={props.breakIncrement}></i>
        </div>
      </div>
    </>
  )}

export default Break;