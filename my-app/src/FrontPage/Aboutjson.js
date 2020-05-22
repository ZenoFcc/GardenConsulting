import React, { Component } from "react"
import ReactJson from "react-json-view";
import jsontest from "./about.json"

class Aboutjson extends React.Component {
    render() {
        return (
            <div>
                <ReactJson src={jsontest}/>
            </div>
        );
    }
}

export default Aboutjson;