const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const path = require('path');


const users = require('./routes/api/users');
const profile = require('./routes/api/profile');
const posts = require('./routes/api/posts');
const passport = require('passport');

const app = express();

//body parser
app.use(bodyParser.urlencoded({extended: false}));
app.use(bodyParser.json())

//db config

const db = require('./config/keys').mongoURI;

// connect to mongo

mongoose.connect(db,{ useNewUrlParser: true })
	.then(() => console.log("mongodb connected"))
	.catch((err) => console.log(err))

// passport config

app.use(passport.initialize());
require('./config/passport')(passport);

// use routes

app.use('/api/users',users);
app.use('/api/profile',profile);
app.use('/api/posts',posts);

// serve static assests if in production
if(process.env.NODE_ENV === 'production'){
	// set static folder
	app.use(express.static('client/build'));
	app.get('*',(req,res) => {
		res.sendFile(path.resolve(__dirname,'client','build','index.html'))
	})
}

const port = 8080;

app.listen(port,() => {
	console.log("server started at " + port);
})