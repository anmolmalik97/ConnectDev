const express = require('express');
const router = express.Router();


//@route GET api/users/test
//@desc  Test users route
//@ccess Public
router.get('/test',(req,res) => {
	res.json({message: "user works"})
})

module.exports = router;