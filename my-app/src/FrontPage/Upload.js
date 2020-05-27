import React from "react";
//import { CsvToHtmlTable } from 'react-csv-to-table';
import CSVReader from "react-csv-reader";
import "./styles.css";


const handleForce = (data, fileInfo) => console.log(data, fileInfo);

class Reader extends  React.Component {

/*    constructor(props) {
        super(props);
        this.state = { items: [], text: ''};
        this.handleChange = this.handleChange.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);

        this.handleChange(e) {
            this.setState({data: e.target.value})
        }
    }*/
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

export default Reader;