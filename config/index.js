const configs = {
    port: 7500,
    queryLimit: 1000,
    mysql: {
        "host":"127.0.0.1",
        "user":"root",
        "password":"root",
        "port":"3306",
        "database":"myoa",
        "multipleStatements":true,
        "insecureAuth":true,
        "dateStrings":true,
    },
    mapping: {
        11: 'nanjing'
    }
};

module.exports = configs;
