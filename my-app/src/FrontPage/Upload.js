import React from "react";
import CSVReader from "react-csv-reader";
import "./styles.css";


const handleForce = (data, fileInfo) => console.log(data, fileInfo);

class Reader extends  React.Component {

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