var express = require('express');
var router = express.Router();

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', { title: 'Express' });
});

router.get('/cyphers', function(req ,res ,next) {
	res.render('cyphers', {title:'Cyphers'});
});

module.exports = router;
