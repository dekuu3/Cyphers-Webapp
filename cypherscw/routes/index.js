var express = require('express');
var router = express.Router();
if (typeof localStorage === "undefined" || localStorage === null) {
  var LocalStorage = require('node-localstorage').LocalStorage;
  localStorage = new LocalStorage('./localStorage');}

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('signup', { title: 'Sign Up' });
});

router.get('/cyphers', function(req ,res ,next) {
	res.render('cyphers', {title:'Cyphers'});
});

router.get('/about', function(req ,res ,next) {
	res.render('index', {title:'About'});
});

router.get('/inbox', function(req, res, next) {
  var storagekey = req.query.username + "_messages";
  var msg = JSON.parse(localStorage.getItem(storagekey)) || [];
  console.log(msg);
    res.json(msg);
});

router.post('/sendmsgs', function(req, res, next) {
try{
  var storagekey = req.body.username + "_messages";
  var usermessages = JSON.parse(localStorage.getItem(storagekey)) || [];
  usermessages.push(req.body.message);
  localStorage.setItem(storagekey, JSON.stringify(usermessages));
  console.log("Message received. Message: " + localStorage.getItem(storagekey));
  res.send();
}
catch(error)
{console.error(error)}
});

module.exports = router;
