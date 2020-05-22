# API Github
get data of user from the API of Github

## How to use
Follow the next instructions:

### Instalation

```
npm install test-api-github
```

### Use

```
const api = require('test-api-github');

api.getUserData('mavarona)
    .then(data=>console.log(data))
    .catch(err=>console.log(err));
```