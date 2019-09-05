import React from "react";

function Bouton(props) {
    return (
        <button type={"button"} onClick={props.handleFunction}>
            <img src={props.value} />
        </button>
    );
}

export default Bouton;
