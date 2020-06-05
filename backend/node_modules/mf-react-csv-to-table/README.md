# mf-react-csv-to-table

> MF React csv to html table is a simple reactjs library that takes CSV file content as input and renders a simple HTML table with pagination.

[![NPM](https://img.shields.io/npm/v/mf-react-csv-to-table.svg)](https://www.npmjs.com/package/mf-react-csv-to-table) [![JavaScript Style Guide](https://img.shields.io/badge/code_style-standard-brightgreen.svg)](https://standardjs.com)

## Install

```bash
npm install --save mf-react-csv-to-table
```

## Usage

```jsx
import React, { Component } from 'react'

import CsvToTable from 'mf-react-csv-to-table'

class Example extends Component {

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
          Seleccionar un CSV
          <input onChange={e => this.selectCsv(e)} name="csv" type="file" accept=".csv" />
        </label>

        <br/>
        <br/>

        {this.state.csv && 
          <CsvToTable 
            csv={this.state.csv}                // Required
            separator=';'                       // Optional
            perPage={15}                        // Optional
            hasHead={true}                      // Optional
            pageRangeDisplayed={3}              // Optional
            prevPageText={'Anterior'}           // Optional
            firstPageText={'Primera página'}    // Optional
            nextPageText={'Siguiente'}          // Optional
            lastPageText={'Última página'}      // Optional
            innerClass={undefined}              // Optional
            itemClass={undefined}               // Optional
            linkClass={undefined}               // Optional
            activeClass={'active'}              // Optional
            disabledClass={'disabled'}          // Optional
          />
        }
      </div>
    )
  }
}
```

## License

MIT © [mgonzalez1](https://github.com/mgonzalez1)
