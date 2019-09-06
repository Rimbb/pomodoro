import React from "react";

function Bouton(props) {
    return (
        <button
            type={"button"}
            id={props.value}
            onClick={props.handleFunction}
        />
    );
}

export default Bouton;
