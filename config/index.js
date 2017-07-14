const configs = {
    port: 7500,
    queryLimit: 1000,
    mysql: {
        "host":"localhost",
        "user":"root",
        "password":"root",
        "port":"3306",
        "database":"myoa",
        "insecureAuth":true,
        "dateStrings":true,
    },
    mapping: {
        11: 'nanjing'
    }
};

module.exports = configs;
