var storedBreakLength = 5;
var storedSessionLength = 25;

class Timer extends React.Component {
  constructor(props) {
    super(props);
    this.state = {};

  }

  render() {
    return /*#__PURE__*/(
      React.createElement("div", { id: "session-timer" }, /*#__PURE__*/
      React.createElement("div", { id: "timer" }, /*#__PURE__*/
      React.createElement("div", { id: "timer-label" }, this.props.timerLabel), /*#__PURE__*/
      React.createElement("div", { id: "time-left" }, /*#__PURE__*/React.createElement("span", { id: "hanging zero", style: { display: this.props.currentLength < 10 ? "inline" : "none" } }, "0"), this.props.currentLength, ":", this.props.secondsLeft, this.props.secondsRight), /*#__PURE__*/
      React.createElement("div", { id: "timer-selector" }, /*#__PURE__*/
      React.createElement("i", { id: "start_stop", class: this.props.playing ? 'fas fa-play-circle' : 'fas fa-pause-circle', onClick: this.props.startStop }), /*#__PURE__*/
      React.createElement("i", { id: "reset", class: "fas fa-redo", onClick: this.props.reset }), /*#__PURE__*/
      React.createElement("audio", { id: "beep", src: "https://raw.githubusercontent.com/freeCodeCamp/cdn/master/build/testable-projects-fcc/audio/BeepSound.wav" })))));




  }}


class Session extends React.Component {
  constructor(props) {
    super(props);
    this.state = {};

  }

  render() {
    return /*#__PURE__*/(
      React.createElement("div", { id: "session" }, /*#__PURE__*/
      React.createElement("div", { id: "session-label" }, "session length"), /*#__PURE__*/
      React.createElement("div", { id: "session-selector" }, /*#__PURE__*/
      React.createElement("i", { id: "session-decrement", class: "fas fa-chevron-circle-down", onClick: this.props.sessionDecrement }), /*#__PURE__*/
      React.createElement("div", { id: "session-length" }, this.props.sessionLength), /*#__PURE__*/
      React.createElement("i", { id: "session-increment", class: "fas fa-chevron-circle-up", onClick: this.props.sessionIncrement }))));



  }}

class Break extends React.Component {
  constructor(props) {
    super(props);
    this.state = {};


  }

  render() {
    return /*#__PURE__*/(
      React.createElement("div", { id: "break" }, /*#__PURE__*/
      React.createElement("div", { id: "break-label" }, "break length"), /*#__PURE__*/
      React.createElement("div", { id: "break-selector" }, /*#__PURE__*/
      React.createElement("i", { id: "break-decrement", class: "fas fa-chevron-circle-down", onClick: this.props.breakDecrement }), /*#__PURE__*/
      React.createElement("div", { id: "break-length" }, this.props.breakLength), /*#__PURE__*/
      React.createElement("i", { id: "break-increment", class: "fas fa-chevron-circle-up", onClick: this.props.breakIncrement }))));



  }}


class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      breakLength: 5,
      sessionLength: 25,
      secondsLeft: 0,
      playing: true,
      timerLabel: 'Session',
      secondsRight: 0,
      currentLength: 25 };


    this.sessionDecrement = this.sessionDecrement.bind(this);
    this.sessionIncrement = this.sessionIncrement.bind(this);
    this.breakDecrement = this.breakDecrement.bind(this);
    this.breakIncrement = this.breakIncrement.bind(this);
    this.startStopTime = this.startStopTime.bind(this);
    this.startStop = this.startStop.bind(this);
    this.reset = this.reset.bind(this);
    this.playSound = this.playSound.bind(this);
  }

  sessionDecrement() {
    if (this.state.sessionLength > 1) {
      this.setState(state => ({
        sessionLength: this.state.sessionLength - 1,
        currentLength: this.state.sessionLength - 1,
        secondsLeft: 0,
        secondsRight: 0 }));

    }
    storedSessionLength = this.state.sessionLength;
  }
  sessionIncrement() {
    if (this.state.sessionLength < 60) {
      this.setState(state => ({
        sessionLength: this.state.sessionLength + 1,
        currentLength: this.state.sessionLength + 1,
        secondsLeft: 0,
        secondsRight: 0 }));

    }
    storedSessionLength = this.state.sessionLength;
  }

  startStop() {
    if (document.getElementById("start_stop").className === "fas fa-play-circle") {
      this.setState(state => ({ playing: !this.state.playing }));
      this.startStopTime();
    } else {
      this.setState(state => ({ playing: !this.state.playing }));
    }
  }

  startStopTime() {
    var myInterval = setInterval(() => {
      if (document.getElementById("start_stop").className === "fas fa-play-circle") {clearInterval(myInterval);return;}
      if (this.state.currentLength + this.state.secondsLeft + this.state.secondsRight > 0) {
        if (this.state.secondsRight > 0) {
          this.setState(state => ({
            secondsRight: state.secondsRight - 1 }));

        } else if (this.state.secondsLeft > 0) {
          this.setState(state => ({
            secondsRight: state.secondsRight + 9,
            secondsLeft: state.secondsLeft - 1 }));

        } else {
          this.setState(state => ({
            secondsRight: state.secondsRight + 9,
            secondsLeft: state.secondsLeft + 5,
            currentLength: state.currentLength - 1 }));

        }
      } else if (this.state.currentLength + this.state.secondsRight + this.state.secondsLeft === 1) {

      } else {
        if (this.state.timerLabel === 'Session') {
          this.setState(state => ({
            timerLabel: 'Break',
            currentLength: this.state.breakLength }));

        } else {
          this.setState(state => ({
            timerLabel: 'Session',
            currentLength: this.state.breakLength }));

        }
        this.playSound();
      }
    }, 1000);
  }

  playSound() {
    const sound = document.getElementById("beep");
    sound.currentTime = 0;
    sound.play();
  }

  reset() {
    document.getElementById("beep").pause();
    document.getElementById("beep").currentTime = 0;
    document.getElementById("start_stop").className = "fas fa-play-circle";
    this.setState(state => ({
      breakLength: 5,
      sessionLength: 25,
      secondsLeft: 0,
      playing: true,
      timerLabel: 'Session',
      secondsRight: 0,
      currentLength: 25 }));

  }

  breakDecrement() {
    if (this.state.breakLength > 1) {
      this.setState(state => ({
        breakLength: this.state.breakLength - 1 }));

      storedBreakLength = this.state.breakLength;
    }

  }
  breakIncrement() {
    if (this.state.breakLength < 60) {
      this.setState(state => ({
        breakLength: this.state.breakLength + 1 }));

      storedBreakLength = this.state.breakLength;
    }

  }

  render() {
    return /*#__PURE__*/(
      React.createElement("div", { id: "container" }, /*#__PURE__*/
      React.createElement("div", { id: "title" }, "25 + 5 timer"), /*#__PURE__*/
      React.createElement(Break, { breakLength: this.state.breakLength, breakDecrement: this.breakDecrement, breakIncrement: this.breakIncrement }), /*#__PURE__*/
      React.createElement(Session, { sessionLength: this.state.sessionLength, sessionDecrement: this.sessionDecrement, sessionIncrement: this.sessionIncrement }), /*#__PURE__*/
      React.createElement(Timer, { timerLabel: this.state.timerLabel, playing: this.state.playing, currentLength: this.state.currentLength, secondsRight: this.state.secondsRight, secondsLeft: this.state.secondsLeft, startStop: this.startStop, reset: this.reset })));


  }}

ReactDOM.render( /*#__PURE__*/React.createElement(App, { class: "App" }), document.getElementById('root'));