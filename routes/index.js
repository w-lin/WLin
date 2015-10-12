/*
var express = require('express');
var index = express.Router();


index.get('/', function(req, res, next) {
  console.log('get home page');
  res.render('views/index');
});

module.exports = index;
*/

var express = require('express');
var router = express.Router();

/* GET home page. */
router.get('/', function(req, res) {  console.log('get home page');
  res.render('index', { title: 'Express' });
});

module.exports = router;

