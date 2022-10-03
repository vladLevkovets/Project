const express = require('express'),
      router  = express.Router(),
  controller  = require('../controllers/UsersC')



//   router.get('/',controller.findAll);


router.post('/add',controller.add);
router.post('/login',controller.login);
router.post('/verify_token',controller.verify_token);
router.post('/delete',controller.delete);
router.post('/update',controller.update);
router.post('/passwords',controller.passwords);
router.post('/mail',controller.mail);
router.get('/:nickname',controller.findOne);
  module.exports = router;