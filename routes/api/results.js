const express = require("express");
const router = express.Router();
const resultsCtrl = require("../../controllers/quizResults");

router.use(require('../../config/auth'));
// create config module and import it 
// adds req.user will be available to controller functions 
router.post('/newResults', resultsCtrl.newResults);
router.get('/:id', resultsCtrl.show);


module.exports = router;