var express = require('express');
var router = express.Router();

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('signup', { title: 'Sign Up' });
});

router.get('/cyphers', function(req ,res ,next) {
	res.render('cyphers', {title:'Cyphers'});
});

router.get('/messages', function(req ,res ,next) {
	res.render('messages', {title:'Message Friends'});
});

router.get('/about', function(req ,res ,next) {
	res.render('index', {title:'About'});
});

module.exports = router;
