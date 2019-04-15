var express = require('express');
var router = express.Router();

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('home', { title: 'Home' });
});

router.get('/cyphers', function(req ,res ,next) {
	res.render('cyphers', {title:'Cyphers'});
});

router.get('/contact', function(req ,res ,next) {
	res.render('index', {title:'Contact'});
});

router.get('/about', function(req ,res ,next) {
	res.render('index', {title:'About'});
});

module.exports = router;
