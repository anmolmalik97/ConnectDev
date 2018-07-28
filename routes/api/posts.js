const express = require('express');
const router = express.Router();
const mongoose = require('mongoose');
const passport = require('passport');

const Post = require('../../models/Post');

const Profile = require('../../models/Profile');

const validatePostInput = require('../../validation/post');

//@route GET api/posts/test
//@desc  Test posts route
//@access Public
router.get('/test',(req,res) => {
	res.json({message: "posts works"})
})

//@route GET api/posts
//@desc  get posts
//@access Public

router.get('/',(req,res) => {
	Post.find({})
		.sort({date: -1})
			.then(posts => res.json(posts))
			.catch(err => res.status(404).json({noPostAvailable: 'no post available'}));

})

//@route GET api/posts/:id
//@desc  get post by id
//@access Public

router.get('/:id',(req,res) => {
	Post.findById(req.params.id)
		.then(post => res.json(post))
		.catch(err => res.status(404).json({noPostFound: 'no post found with that id'}));

})


//@route POST api/posts
//@desc  create posts
//@access Private

router.post('/',passport.authenticate('jwt',{session: false}),(req,res) => {
	const {errors,isValid} = validatePostInput(req.body)
	
	if(!isValid) {
		return res.status(400).json(errors)
	}

	const newPost = new Post({
		text: req.body.text,
		name: req.body.name,
		avatar: req.body.avatar,
		user: req.user.id
	});

	newPost.save()
		.then(post => {
			res.json(post)
		})
});

//@route DELETE api/posts
//@desc  delete posts
//@access Private

router.delete('/:id',passport.authenticate('jwt',{session: false}),(req,res) => {
	
	Profile.findOne({user: req.user.id})
		.then(profile => {
			Post.findById(req.params.id)
				.then(post => {
					// check post owner
					if(post.user.toString() !== req.user.id)
						return res.status('401').json({notauthorised: 'user not authorised'})

					//delete
					post.remove().then(() => res.json({success: true}))

				})
				.catch(err => res.status(404).json({noPostFound: 'no post found'}))
		})
})

//@route POST api/posts/like/:id
//@desc  like posts
//@access Private

router.post('/like/:id',passport.authenticate('jwt',{session: false}),(req,res) => {
	
	Profile.findOne({user: req.user.id})
		.then(profile => {
			Post.findById(req.params.id)
				.then(post => {
					if(post.likes.filter(like => like.user.toString() === req.user.id ).length > 0) {
						return res.status(400).json({alreadyliked: 'user already liked that post'});
					}
					post.likes.unshift({user: req.user.id});
					post.save().then(post => res.json(post))

				})
				.catch(err => res.status(404).json({noPostFound: 'no post found'}))
		})
})

//@route POST api/posts/unlike/:id
//@desc  unlike posts
//@access Private

router.post('/unlike/:id',passport.authenticate('jwt',{session: false}),(req,res) => {
	
	Profile.findOne({user: req.user.id})
		.then(profile => {
			Post.findById(req.params.id)
				.then(post => {
					if(post.likes.filter(like => like.user.toString() === req.user.id ).length === 0) {
						return res.status(400).json({notliked: 'you have not liked this post'});
					}
					// remove like
					const removeIndex = post.likes
						.map( item => item.user.toString())
						.indexOf(req.user.id);

					post.likes.splice(removeIndex,1);
					post.save().then(post => res.json(post))

				})
				.catch(err => res.status(404).json({noPostFound: 'no post found'}))
		})
})

//@route POST api/posts/comment/:id
//@desc  comment posts
//@access Private

router.post('/comment/:id',passport.authenticate('jwt',{session: false}),(req,res) => {
	const {errors,isValid} = validatePostInput(req.body)
	
	if(!isValid) {
		return res.status(400).json(errors)
	}
	Post.findById(req.params.id)
		.then(post => {
			const newComment = {
				text: req.body.text,
				name: req.body.name,
				avatar: req.body.avatar,
				user: req.user.id
			}

			post.comments.unshift(newComment);
			post.save().then(post => res.json(post))
		})
		.catch(err => res.status(404).json({postNotFound: 'no post found'}))
})

//@route DELETE api/posts/comment/:id/:comment_id
//@desc  remove comment from posts
//@access Private

router.delete('/comment/:id/:comment_id',passport.authenticate('jwt',{session: false}),(req,res) => {
	Post.findById(req.params.id)
		.then(post => {
			if(post.comments.filter(comment => comment._id.toString() === req.params.comment_id).length === 0){
				return res.status(404).json({commentNotFound: 'No such comment Found'})
			}

			const removeIndex = post.comments
				.map(item => item._id.toString())
					.indexOf(req.params.comment_id);
			post.comments.splice(removeIndex,1);
			post.save().then(post => res.json(post))
		})
		.catch(err => res.status(404).json({postNotFound: 'no post found'}))
})


module.exports = router;