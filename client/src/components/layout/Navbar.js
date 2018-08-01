import React, { Component } from 'react';
import {NavLink} from 'react-router-dom';
import {connect} from 'react-redux';
import PropTypes from 'prop-types';
import {logoutUser} from '../../actions/authActions';
import {clearCurrentProfile} from '../../actions/profileActions';

class Navbar extends Component {
	
	logout = (event) => {
		event.preventDefault();
		this.props.clearProfile();
		this.props.onLogout();

	}
	render() {
		const {isAuthenticated,user} = this.props.auth;
		const authLinks = (
				<ul className="navbar-nav ml-auto">
	          		<li className="nav-item">
	            		<a href = "" className="nav-link" onClick = {this.logout}>
	            			<img className = 'rounded-circle'src={user.avatar} alt={user.name} style={{width: '25px',marginRight: '5px'}} title = 'you must have a gravatar connected to your email to display an image'/>
	            			Logout
	            		</a>
	          		</li>
			    </ul>
			);
		const guestLinks = (
				<ul className="navbar-nav ml-auto">
	          		<li className="nav-item">
	            		<NavLink className="nav-link" to="/register">Sign Up</NavLink>
	          		</li>
	          		<li className="nav-item">
	            		<NavLink className="nav-link" to="/login">Login</NavLink>
	          		</li>
			    </ul>
			);
		return (
			<nav className="navbar navbar-expand-sm navbar-dark bg-dark mb-4">
			    <div className="container">
			    	<NavLink className="navbar-brand" to="/">ConnectDev</NavLink>
			      		<button className="navbar-toggler" type="button" data-toggle="collapse" data-target="#mobile-nav">
			        		<span className="navbar-toggler-icon"></span>
			      		</button>

			      	<div className="collapse navbar-collapse" id="mobile-nav">
				        <ul className="navbar-nav mr-auto">
				        	<li className="nav-item">
				            	<NavLink className="nav-link" to="#"> Developers
				            	</NavLink>
				          	</li>
				        </ul>
						{isAuthenticated ? authLinks : guestLinks}
			       
			      	</div>
			    </div>
  			</nav>
		);
	}
}

Navbar.propTypes = {
	onLogout: PropTypes.func.isRequired,
	auth: PropTypes.object.isRequired
}

const mapDispatchToProps = dispatch => {
	return {
		onLogout: () => dispatch(logoutUser()),
		clearProfile: () => dispatch(clearCurrentProfile())
	}
}

const mapStatetoProps = state => {
	return {
		auth: state.auth
	}
}

export default connect(mapStatetoProps,mapDispatchToProps)(Navbar);
