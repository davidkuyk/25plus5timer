import React, {useState, useEffect} from 'react';
import Break from './Components/break.js';
import Session from './Components/session.js';
import Timer from './Components/timer.js';
import './index.css';

const App = () => {

  var storedBreakLength = 5;
  var storedSessionLength = 25;

  const [sessionLength, setSessionLength] = useState(25);
  const [breakLength, setBreakLength] = useState(5);
  const [currentLength, setCurrentLength] = useState(25);
  const [secondsLeft, setSecondsLeft] = useState(0);
  const [secondsRight, setSecondsRight] = useState(0);
  const [playing, setPlaying] = useState('stop');
  const [timerLabel, setTimerLabel] = useState('Session');

  useEffect(() => {
    let myInterval = null;
    if (playing === 'start') {
      if (currentLength + secondsLeft + secondsRight > 0) {
        if (secondsRight > 0) {
            myInterval = setInterval(() => {
              setSecondsRight(secondsRight - 1);
            }, 1000);
        } else if (secondsLeft > 0) {
          myInterval = setInterval(() => {
            setSecondsRight(secondsRight + 9);
            setSecondsLeft(secondsLeft - 1);
          }, 1000);
        } else {
          myInterval = setInterval(() => {
            setSecondsRight(secondsRight + 9);
            setSecondsLeft(secondsLeft + 5);
            setCurrentLength(currentLength - 1);
          }, 1000);
        }
      } else {
          if (timerLabel === 'Session') {
              setTimerLabel('Break');
              setCurrentLength(breakLength);

          } else {
              setTimerLabel('Session');
              setCurrentLength(breakLength);
          }
          playSound();
      }
  } else {
    clearInterval(myInterval);
    setPlaying('stop');
  }
  return () => clearInterval(myInterval);

  }, [playing, secondsLeft, secondsRight, timerLabel, breakLength, sessionLength, currentLength]);

  

  const sessionDecrement = () => {
    if (sessionLength > 1) {
        setSessionLength(sessionLength - 1);
        setCurrentLength(sessionLength - 1);
        setSecondsLeft(0);
        setSecondsRight(0);
    }
    storedSessionLength = sessionLength;
  };

  const sessionIncrement = () => {
    if (sessionLength < 60) {
        setSessionLength(sessionLength + 1);
        setCurrentLength(sessionLength + 1);
        setSecondsLeft(0);
        setSecondsRight(0);
    }
    storedSessionLength = sessionLength;
  }

  const startStop = () => {
    if (playing === 'start') {
      setPlaying('stop');
    } else {
      setPlaying('start')
    }
  }

  const playSound = () => {
    const sound = document.getElementById("beep");
    sound.currentTime = 0;
    sound.play();
  }

  const reset = () => {
    const sound = document.getElementById("beep");
    sound.pause();
    sound.currentTime = 0;
    setPlaying('stop')
    setCurrentLength(sessionLength);
    setSecondsLeft(0);
    setSecondsRight(0);
    setTimerLabel('Session');
  }

  const breakDecrement = () => {
    if (breakLength > 1) {
      setBreakLength(breakLength - 1);
      storedBreakLength = breakLength;
    }
  }

  const breakIncrement = () => {
    if (breakLength < 60) {
      setBreakLength(breakLength + 1);
      storedBreakLength = breakLength;
    }
  }

  return (
    <div id="container">
      <div id="title">25 + 5 timer</div>
      <Break breakLength={breakLength} breakDecrement={breakDecrement} breakIncrement={breakIncrement} />
      <Session sessionLength={sessionLength} sessionDecrement={sessionDecrement} sessionIncrement={sessionIncrement} />
      <Timer timerLabel={timerLabel} playing={playing} setPlaying={setPlaying} currentLength={currentLength} secondsRight={secondsRight} secondsLeft={secondsLeft} startStop={startStop} reset={reset}/>
      <audio id="beep" src="https://raw.githubusercontent.com/freeCodeCamp/cdn/master/build/testable-projects-fcc/audio/BeepSound.wav"></audio>
    </div>
  );
}

export default App;
