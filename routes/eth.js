var express = require('express');
var router = express.Router();

// var compensation;

router.get('/', function(req, res, next) {
  console.log('eth');
  // compensation = req.query.compensation;
  res.render('eth', {comp : '5000'});
});

module.exports = router;
