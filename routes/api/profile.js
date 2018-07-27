const express = require('express');
const router = express.Router();
const mongoose = require('mongoose');
const passport = require('passport');

const Profile = require('../../models/Profile');
const User = require('../../models/User');

const validateProfileInput = require('../../validation/profile')

//@route GET api/profile/test
//@desc  Test profile route
//@ccess Public
router.get('/test',(req,res) => {
	res.json({message: "profile works"})
})

//@route GET api/profile
//@desc  Get current user profile
//@ccess Private

router.get('/',passport.authenticate('jwt',{session: false}),(req,res) => {
	const errors = {};
	Profile.findOne({user: req.user.id})
		.populate('user',['name','avatar'])
		.then(profile => {
			if(!profile) {
				errors.noProfile = 'There is no profile of user';
				return res.status(404).json(errors)
			}
			res.json(profile);
		})
		.catch(err => {
			res.status(404).json(err)
		})
})

//@route POST api/profile
//@desc  create or edit user profile
//@ccess Private

router.post('/',passport.authenticate('jwt',{session: false}),(req,res) => {
	const {errors,isValid} = validateProfileInput(req.body);

	if(!isValid) {
		return res.status(400).json(errors);
	}
	 // get fields
	 const profileFields = {};
	 profileFields.user = req.user.id;
	 if(req.body.handle)  profileFields.handle = req.body.handle;
	 if(req.body.company)  profileFields.company = req.body.company;
	 if(req.body.website)  profileFields.website = req.body.website;
	 if(req.body.location)  profileFields.location = req.body.location;
	 if(req.body.bio)  profileFields.bio = req.body.bio;
	 if(req.body.status)  profileFields.status = req.body.status;
	 if(req.body.githubuser)  profileFields.githubuser = req.body.githubuser;
	 // skills - split it into array
	 if(typeof req.body.skills !== 'undefined'){
	 	profileFields.skills = req.body.skills.split(',')
	 }
	 //social
	 profileFields.social = {};
	  if(req.body.youtube)  profileFields.social.youtube = req.body.youtube;
	  if(req.body.facebook)  profileFields.social.facebook = req.body.facebook;
	  if(req.body.instagram)  profileFields.social.instagram = req.body.instagram;
	  if(req.body.linkedin)  profileFields.social.linkedin = req.body.linkedin;
	  if(req.body.twitter)  profileFields.social.twitter = req.body.twitter;

	  Profile.findOne({user: req.user.id})
	  	.then(profile => {
	  		if(profile){
	  			// update
	  			Profile.findOneAndUpdate({user: req.user.id}, {$set: profileFields},{new: true})
	  				.then(profile => res.json(profile))
	  		}else {
	  			// create

	  			// check if handle exist
	  			Profile.findOne({handle: profileFields.handle})
	  				.then(profile => {
	  					if(profile){
	  						errors.handle = 'handle alreay exist';
	  						return res.status(400).json(errors)
	  					}

	  					// save profile
	  					new Profile(profileFields).save()
	  						.then(profile => {
	  							res.json(profile)
	  						})
	  				})


	  		}
	  	})
})

module.exports = router;