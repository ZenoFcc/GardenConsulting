# mf-react-paginator

> Pagination with react JS

[![NPM](https://img.shields.io/npm/v/mf-react-paginator.svg)](https://www.npmjs.com/package/mf-react-paginator) [![JavaScript Style Guide](https://img.shields.io/badge/code_style-standard-brightgreen.svg)](https://standardjs.com)

## Install

```bash
npm install --save mf-react-paginator
```

## Usage

```jsx
import React, { Component } from 'react'

import Pagination from 'mf-react-paginator'

class Example extends Component {
  toPage(page) {
    console.log(page);
  }

  render () {
    const options = {
      perPage: 10,
      current: 1,
      prev: false,
      next: true,
      last: 10,
      total: 100,
    };

    return (
      <div>
        <Pagination 
          options={options}                   // Required
          onClick={this.toPage.bind(this)}    // Required
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
      </div>
    )
  }
}
```

## License

MIT © [mgonzalez1](https://github.com/mgonzalez1)
