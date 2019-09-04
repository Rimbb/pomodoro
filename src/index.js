import React from "react";
import ReactDOM from "react-dom";
import App from "./app.js";

const url =
    "https://api.unsplash.com/photos/?client_id=08a68d322cad8da002185e1851a874a790785754c9c2a86ce573e595dfb481f6";

fetch(url, {
    headers: {
        Authorization: `Bearer 3de2e7d8a894f275e92ce2643ad53bf72acd9b092473c96785297397f1a6b443`,
    },
})
    .then(response => response.json())
    .then(data => {
        const urlArray = new Array();
        data.forEach(photos => {
            urlArray.push(photos.urls.raw);
        });
        console.log(urlArray);
        return urlArray;
    });

ReactDOM.render(<App />, document.querySelector("#root"));
