const express = require("express");
const router = express.Router();
const resultsCtrl = require("../../controllers/quizResults");

router.use(require('../../config/auth'));
// create config module and import it 
// adds req.user will be available to controller functions 
router.post('/newResults', resultsCtrl.newResults);
router.post('/newResults', checkAuth, resultsCtrl.newResults);
// checkAuth function 
function checkAuth(req, res, next) {
    if (req.user) return next();
    return res.status(401).json({ msg: 'Not Authorized' });
}
router.get('/', resultsCtrl.index);


module.exports = router;