const express = require("express");
const router = express.Router();
const resultsCtrl = require("../../controllers/quizResults");

router.get('/', resultsCtrl.index);
router.use(require('../../config/auth'));
router.post('/newResults', checkAuth, resultsCtrl.newResults);
router.get('/getmyresults', checkAuth, resultsCtrl.getMyResults);
router.delete('/:id', checkAuth, resultsCtrl.deleteOne);

function checkAuth(req, res, next) {
    if (req.user) return next();
    return res.status(401).json({ msg: 'Not Authorized' });
}


module.exports = router;