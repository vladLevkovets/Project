const express = require('express'),
      router  = express.Router(),
  controller  = require('../controllers/UsersC')



//   router.get('/',controller.findAll);

//   router.get('/:prod',controller.findOne);

  router.post('/add',controller.add);

//   router.post('/delete',controller.delete);

//   router.post('/update',controller.update);

  module.exports = router;