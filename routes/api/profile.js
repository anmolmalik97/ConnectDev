const express = require('express');
const router = express.Router();


//@route GET api/profile/test
//@desc  Test profile route
//@ccess Public
router.get('/test',(req,res) => {
	res.json({message: "profile works"})
})

module.exports = router;