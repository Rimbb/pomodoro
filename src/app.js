const React = require("react");
const ms = require("millisec");

class Timer extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            time: 0,
            isOn: false,
            noMin: false,
            start: 0,
            base: 1500000,
        };
        this.startTimer = this.startTimer.bind(this);
        this.stopTimer = this.stopTimer.bind(this);
        this.resetTimer = this.resetTimer.bind(this);
        this.addTime = this.addTime.bind(this);
        this.minusTime = this.minusTime.bind(this);
    }
    startTimer() {
        this.setState({
            time: this.state.time,
            isOn: true,
            noMin: true,
            start: Date.now() - this.state.time,
        });
        this.timer = setInterval(
            () =>
                this.setState({
                    time: Date.now() - this.state.start,
                }),
            1,
        );
    }
    stopTimer() {
        this.setState({isOn: false, noMin: true});
        clearInterval(this.timer);
    }
    resetTimer() {
        const yorn = confirm("Reset the timer?");
        if (yorn === true) {
            this.setState({time: 0, base: 1500000, noMin: false, isOn: false});
        }
    }
    addTime() {
        this.setState({
            noMin: false,
            base: this.state.base + 60000,
        });
    }
    minusTime() {
        this.setState({
            base: this.state.base - 60000,
        });
    }
    render() {
        const start =
            this.state.time === 0 ? (
                <button id={"start"} onClick={this.startTimer}>
                    <img src={"play.png"} />
                </button>
            ) : null;
        const stop =
            this.state.time === 0 || !this.state.isOn ? null : (
                <button id={"stop"} onClick={this.stopTimer}>
                    <img src={"stop.png"} />
                </button>
            );
        const resume =
            this.state.time === 0 || this.state.isOn ? null : (
                <button id={"resume"} onClick={this.startTimer}>
                    <img src={"play.png"} />
                </button>
            );
        const reset =
            this.state.time === 0 || this.state.isOn ? null : (
                <button id={"reset"} onClick={this.resetTimer}>
                    <img src={"reset.png"} />
                </button>
            );
        const add =
            this.state.time === 0 ? (
                <button id={"add"} onClick={this.addTime}>
                    <img src={"add.png"} />
                </button>
            ) : null;
        const minus =
            this.state.time === 0 ? (
                <button id={"minus"} onClick={this.minusTime}>
                    <img src={"minus.png"} />
                </button>
            ) : null;
        const result = this.state.base - this.state.time;
        if (result < 0) {
            this.setState({
                noMin: true,
                time: this.state.time,
                base: 0,
            });
        }
        let m = ms(result).format("mm");
        let s = ms(result).format("ss");
        if (m < 10) {
            m = `0${String(m)}`;
        } else {
            m = String(m);
        }

        if (s < 10) {
            s = `0${String(s)}`;
        } else {
            s = String(s);
        }
        return (
            <div id={"wrapper"}>
                <h3 id={"timer"}>
                    {m} : {s}
                </h3>
                <div id={"wrapBtn"}>
                    {start}
                    {resume}
                    {stop}
                    {reset}
                    {add}
                    {minus}
                </div>
            </div>
        );
    }
}
module.exports = Timer;
