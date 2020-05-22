const axios = require('axios');

module.exports = {
    /**
     * Insert the user of github to get data from the API.
     * @example
     * user = 'mavarona'
     * @param {string} user to fetch data from de API. 
     */
    getUserData: function(user) {
        const url = `https://api.github.com/users/${user}`;
        return axios.get(url)
            .then(data => data.data)
            .catch(err => console.log(err));
    }
}