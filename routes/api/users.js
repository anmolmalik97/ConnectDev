const express = require('express');
const router = express.Router();
const gravatar = require('gravatar');
const User = require('../../models/User');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const keys = require('../../config/keys');
const passport = require('passport');


//load input validation
const validateRegisterInput = require('../../validation/register');
const validateLoginInput = require('../../validation/login')


//@route GET api/users/test
//@desc  Test users route
//@ccess Public
router.get('/test',(req,res) => {
	res.json({message: "user works"})
})

//@route POST api/users/resister
//@desc  register a user
//@ccess Public
router.post('/register',(req,res) => {
	const {errors,isValid} = validateRegisterInput(req.body);

	if(!isValid) {
		return res.status(400).json(errors);
	}
	
	User.findOne({email: req.body.email})
		.then(user => {
			if(user) {
				errors.email = 'email already exists'
				return res.status(400).json(errors);
			}else{
				const avatar = gravatar.url(req.body.email,{
					s: '200', //size
					r: 'pg', //rating
					d: 'mm', //default
				})
				const newUser = new User({
					name: req.body.name,
					email: req.body.email,
					avatar,
					password: req.body.password
				});
				bcrypt.genSalt(10,function(err,salt){
					bcrypt.hash(newUser.password,salt,function(err,hash){
						if(err) throw err;
						newUser.password = hash;
						newUser.save()
							.then(user => {
								res.json(user)
							})
							.catch(err => {
								console.log(err)
							})
					})
				})

			}
		})
})

//@route POST api/users/login
//@desc  login a user
//@ccess Public

router.post('/login',(req,res) => {
	const {errors,isValid} = validateLoginInput(req.body);

	if(!isValid) {
		return res.status(400).json(errors);
	}
	
	const password = req.body.password;
	const email = req.body.email;

	//finduser 
	User.findOne({email})
		.then(user => {
			if(!user) {
				errors.email = 'user not found'
				return res.status(404).json(errors)
			}

			//check password
			bcrypt.compare(password,user.password)
				.then(isMatch => {
					if(isMatch) {
						 // user matched
						 const payload = {id: user.id,name: user.name,avatar: user.avatar}
						 // signtoken
						 jwt.sign(payload, 
						 		keys.secret , 
						 		{expiresIn: 3600} , 
						 		(err,token) => {
						 			res.json({
						 				success: true,
						 				token: 'Bearer ' + token
						 			})
						 });
					}else{
						erros.password = 'incorrect password';
						return res.status(400).json(errors)
					}
				})
		})
});

//@route GET api/users/current
//@desc  return current  user
//@ccess Private

router.get('/current',passport.authenticate('jwt',{session: false}),(req,res) => {
	res.json({
		id: req.user.id,
		name: req.user.name
	})
})


module.exports = router;