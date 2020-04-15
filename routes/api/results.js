const express = require("express");
const router = express.Router();
const resultsCtrl = require("../../controllers/quizResults");

router.post('/newResults', resultsCtrl.newResults);


module.exports = router;
