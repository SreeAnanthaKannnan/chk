/**
 * @author: Vikram Viswanathan
 * @version: 1.0.0
 * @date: February 20, 2019
 * @description: This would be the routes file where all the API definitions and implementations are described.
 */

/**
 * Usage of strict mode
 * 1. It catches some common coding bloopers, throwing exceptions.
 * 2. It prevents, or throws errors, when relatively “unsafe” actions are taken (such as gaining access to the 
 *    global object).
 * 3. It disables features that are confusing or poorly thought out.
 */
'use strict';

var express = require('express'),
    router = express.Router();

/* GET home page. */
router.get('/', function (request, response, next) {
    response.render('index', {
        title: 'Express Page for Saneds SPSA application.'
    });
});

module.exports = router;