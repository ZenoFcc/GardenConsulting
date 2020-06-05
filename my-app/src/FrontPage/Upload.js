/*import axios from 'axios';
import React,{Component} from 'react';

class Reader extends Component {

    state = {
        selectedFile: null
    };


    onFileChange = event => {
        this.setState({ selectedFile: event.target.files[0]});

    };

    // On file upload (click the upload button)
    onFileUpload = () => {

        // Create an object of formData
        const formData = new FormData();

        // Update the formData object
        formData.append(
            "myFile",
            this.state.selectedFile,
            this.state.selectedFile.name
        );

        // Details of the uploaded file
        console.log(this.state.selectedFile);

        // Request made to the backend api
        // Send formData object
        axios.post("api/uploadfile", formData);
    };

    // File content to be displayed after
    // file upload is complete
    fileData = () => {

        if (this.state.selectedFile) {

            return (
                <div>
                    <h2>File Details:</h2>
                    <p>File Name: {this.state.selectedFile.name}</p>
                    <p>File Type: {this.state.selectedFile.type}</p>
                </div>

            );
        } else {
            return (
                <div>
                    <br />
                    <h4>Choose before Pressing the Upload button</h4>
                </div>
            );
        }
    };

    render() {

        return (
            <div>
                <div>
                    <input type="file" onChange={this.onFileChange} />
                    <button onClick={this.onFileUpload}>
                        Upload!
                    </button>
                </div>
                {this.fileData()}
            </div>
        );
    }
}

export default Reader;*/


/*import React, { Component } from 'react'

import CsvToTable from 'mf-react-csv-to-table'

class Reader extends Component {

    constructor(props) {
        super(props);
        this.state = {
            csv: null
        }
    }

    selectCsv(e) {
        const csv = e.target.files[0];
        this.setState({csv: null});

        setTimeout(() => {
            this.setState({csv});
        }, 500)
    }

    render () {
        return (
            <div>
                <label htmlFor="csv">
                    Sélectionnez un CSV
                    <input onChange={e => this.selectCsv(e)} name="csv" type="file" accept=".csv" />
                </label>

                <br/>
                <br/>

                {this.state.csv &&
                <CsvToTable
                    csv={this.state.csv}                // Required
                    separator=';'                       // Optional
                />
                }
            </div>
        )
    }
}

export default Reader;*/

import React, { Component } from 'react';
import {CsvToHtmlTable} from "react-csv-to-table";

class Reader extends Component {

    state = {
        file: ""
    }

    showFile = async (e) => {
        e.preventDefault()
        const reader = new FileReader()
        reader.onload = async (e) => {
            const text = (e.target.result)
            console.log(text)
            alert(text)
            console.log(e)
            if (text)
                console.log("cool");
        };
        reader.readAsText(e.target.files[0])
    }

    render = () => {
        return (<div>
                <input type="file" value={this.state.value} onChange={(e) => this.showFile(e)} />
            </div>
        )
    }
}

export default Reader;