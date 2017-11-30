var express = require('express');
var router = express.Router();

router.get('/', function(req, res){
  res.render('index', {
    title: 'Home'
  });
});

router.get('/sender', function(req, res){
  res.render('sender', {
    title: 'Sender'
  });
});

router.get('/receiver', function(req, res){
  res.render('receiver', {
    title: 'Receiver'
  });
});

module.exports = router;