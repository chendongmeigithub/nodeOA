var express = require('express');
var router = express.Router();
var query = require('../config/database');


/* GET users listing. */
router.get('/', function (req, res, next) {
    query('select * from book left join user on book.parentId=user.id where `user`.id=1', function (error, results, fields) {
        if(error){
            console.log('[SELECT ERROR] - ',error.message);
            return;
        }else {
            // res.json(results);
            res.json(results);
        }
    });
});

module.exports = router;
