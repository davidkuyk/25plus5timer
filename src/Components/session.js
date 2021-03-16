import React from 'react';
import './../index.css';

const Session = props => {

    return (
      <>
        <div id="session">
          <div id="session-label">session length</div>
          <div id="session-selector">
            <i id='session-decrement' className='fas fa-chevron-circle-down' onClick={props.sessionDecrement}></i>
            <div id="session-length">{props.sessionLength}</div>
            <i id='session-increment' className='fas fa-chevron-circle-up' onClick={props.sessionIncrement}></i>
          </div>
        </div>
      </>
    )}

export default Session;