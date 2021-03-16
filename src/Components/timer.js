import React from 'react';
import './../index.css';

const Timer = props => {

  return (
    <>
      <div id="session-timer"></div>
      <div id="timer">
        <div id="timer-label">{props.timerLabel}</div>
        <div id="time-left">
          <span id="hanging zero" style={{ display: props.currentLength < 10 ? "inline" : "none" }}>0</span>{props.currentLength}:{props.secondsLeft}{props.secondsRight}
        </div>
        <div id="timer-selector">
          <i id="start_stop" className={props.playing === 'start' ? 'fas fa-pause-circle' : 'fas fa-play-circle'} onClick={props.startStop}></i>
          <i id="reset" className='fas fa-redo' onClick={props.reset}></i>
        </div>
      </div>
    </>
      
  )}

export default Timer;