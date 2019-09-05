//react imports
import React from "react";
import ReactDOM from "react-dom";
import Timer from "./components/timer";
import Bouton from "./components/bouton";
const ms = require("millisec");
const url = "https://picsum.photos/v2/list?limit=100";
let imgArray;
fetch(url)
    .then(response => response.json())
    .then(data => {
        imgArray = new Array();
        imgArray.push(data);
        const rand = imgArray[Math.floor(Math.random() * imgArray.length)];
        const rand2 = rand[Math.floor(Math.random() * rand.length)];
        const rand2url = rand2.download_url;
        const rand2urldisp = rand2.url;
        const rand2auth = rand2.author;

        return (
            (document.body.style.backgroundImage = `url("${rand2url}")`),
            (document.querySelector("#author").innerHTML = `Photo by :&nbsp;&nbsp;<a href='${rand2urldisp}' target='blank'>${rand2auth}</a>`)
        );
    });

class App extends React.Component {
    constructor(props) {
        super(props);
        //state
        this.state = {
            seconds: 1500 * 1000,
            isOn: false,
        };
        //binding
        this.plus = this.plusFunction.bind(this);
        this.moins = this.moinsFunction.bind(this);
        this.reset = this.resetFunction.bind(this);
        this.start = this.startFunction.bind(this);
        this.stop = this.stopFunction.bind(this);
        //variable
        this.defaultTimer = 1500 * 1000;
        this.intervalID = null;
    }

    plusFunction() {
        this.setState(prevState => ({
            isOn: false,
            seconds: prevState.seconds + 60000,
        }));
    }

    moinsFunction() {
        this.setState(prevState => ({
            isOn: false,
            seconds: prevState.seconds - 60000,
        }));
    }

    decrementFunction() {
        this.setState(prevState => ({
            isOn: true,
            seconds: prevState.seconds - 1000,
        }));
        if (this.state.seconds <= 0) {
            clearInterval(this.intervalID);
            this.intervalID = null;
        }
    }

    startFunction() {
        this.setState(prevState => ({
            isOn: true,
        }));
        if (this.intervalID === null) {
            this.intervalID = setInterval(() => {
                this.decrementFunction();
            }, 1000);
        }
    }

    stopFunction() {
        this.setState(prevState => ({
            isOn: false,
        }));
        clearInterval(this.intervalID);
        this.intervalID = null;
    }

    resetFunction() {
        clearInterval(this.intervalID);
        this.intervalID = null;
        this.setState(() => ({
            isOn: false,
            seconds: this.defaultTimer,
        }));
    }

    render() {
        let m = ms(this.state.seconds).format("mm");
        let s = ms(this.state.seconds).format("ss");
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
        const finaltimer = `${m} : ${s}`;
        const start = this.state.isOn ? null : (
            <Bouton
                id={"start"}
                value={"../src/assets/play.png"}
                handleFunction={this.start}
            />
        );
        const stop = !this.state.isOn ? null : (
            <Bouton
                id={"stop"}
                value={"../src/assets/stop.png"}
                handleFunction={this.stop}
            />
        );
        const add =
            s !== "00" || this.state.isOn ? null : (
                <Bouton
                    value={"../src/assets/add.png"}
                    handleFunction={this.plus}
                />
            );
        const minus =
            s !== "00" || this.state.isOn ? null : (
                <Bouton
                    value={"../src/assets/minus.png"}
                    handleFunction={this.moins}
                />
            );
        const reset =
            s === "00" ||
            this.state.seconds === 1500000 ||
            this.state.isOn ? null : (
                <Bouton
                    value={"../src/assets/reset.png"}
                    handleFunction={this.reset}
                />
            );
        return (
            <div id={"wrapper"}>
                <div id={"one"}>
                    <h5>{"What's your focus for this run?"}</h5>
                    <div id={"focus"}>
                        <input className={"checkbox"} type={"checkbox"} />
                        <input className={"text"} type={"text"} />
                    </div>
                    <div id={"focus"}>
                        <input className={"checkbox"} type={"checkbox"} />
                        <input className={"text"} type={"text"} />
                    </div>
                    <div id={"focus"}>
                        <input className={"checkbox"} type={"checkbox"} />
                        <input className={"text"} type={"text"} />
                    </div>
                    <div id={"focus"}>
                        <input className={"checkbox"} type={"checkbox"} />
                        <input className={"text"} type={"text"} />
                    </div>
                </div>
                <div id={"onetwo"}>
                    <h5>{"This is what you've already done"}</h5>
                </div>
                <div id={"two"}>
                    <h5>{"Your Pomodoro"}</h5>
                </div>
                <div id={"three"}>
                    <Timer seconds={finaltimer} />
                    <div id={"wrapBtn"}>
                        {add}
                        {start}
                        {stop}
                        {reset}
                        {minus}
                    </div>
                </div>
                <div id={"threetwo"}>
                    <p id={"author"} />
                </div>
            </div>
        );
    }
}

ReactDOM.render(<App />, document.querySelector("#root"));
