/*import React from "react";
//import { CsvToHtmlTable } from 'react-csv-to-table';
import CSVReader from "react-csv-reader";
import "./styles.css";


const handleForce = (data, fileInfo) => console.log(data, fileInfo);

class Reader extends  React.Component {

    constructor(props) {
        super(props);
        this.state = { items: [], text: ''};
        this.handleChange = this.handleChange.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);

        this.handleChange(e) {
            this.setState({data: e.target.value})
        }
    }
    render() {
        return (
            <div className="container">
                <CSVReader
                    cssClass="react-csv-input"
                    label="Select CSV with secret Death Star statistics"
                    onFileLoaded={handleForce}
                />
                <p>and then open the console</p>
            </div>
        );
    }
}

export default Reader;*/

import axios from 'axios';

import React,{Component} from 'react';

class Reader extends Component {

    state = {

        // Initially, no file is selected
        selectedFile: null
    };

    // On file select (from the pop up)
    onFileChange = event => {

        // Update the state
        this.setState({ selectedFile: event.target.files[0] });

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

export default Reader;