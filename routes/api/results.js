const express = require("express");
const router = express.Router();
const resultsCtrl = require("../../controllers/quizResults");

router.post('/newResults', resultsCtrl.newResults);
router.get('/:id', resultsCtrl.show);


module.exports = router;