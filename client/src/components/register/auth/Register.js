import React, { Component } from 'react';
import PropTypes from 'prop-types';
import {withRouter} from 'react-router-dom';
import {connect} from 'react-redux';
import * as actionTypes from '../../../actions/authActions';
import TextFieldGroup from '../../common/TextFieldGroup';

class Register extends Component {
	state = {
		name: '',
		email: '',
		password: '',
		password2: '',
		errors: {}
	}
	onChange = (event) => {
		this.setState({[event.target.name]: event.target.value})
	}
	onSubmit = (event) => {
		event.preventDefault();
		const newUser = {
			name: this.state.name,
			email: this.state.email,
			password: this.state.password,
			password2: this.state.password2
		}

		this.props.registerUser(newUser,this.props.history);
		
	}
	componentWillReceiveProps(nextProps) {
		if(nextProps.errors){
			this.setState({errors: nextProps.errors})
		}
	}
	componentDidMount(){
		if(this.props.auth.isAuthenticated)
			this.props.history.push('/dashboard')
	}
	render() {
		const {errors} = this.state;
		return (
			<div>
				<div className="register">
				    <div className="container">
		        		<div className="row">
				        	<div className="col-md-8 m-auto">
				          		<h1 className="display-4 text-center">Sign Up</h1>
				          		<p className="lead text-center">Create your ConnectDev account</p>
				          		<form noValidate onSubmit = {this.onSubmit}>
				            		<TextFieldGroup
          							placeholder = "Name"
          							name = "name"
          							type = "text"
          							value = {this.state.name}
          							onChange = {this.onChange}
          							error = {errors.name}/>
          							<TextFieldGroup
          							placeholder = "Email Address"
          							name = "email"
          							type = "email"
          							value = {this.state.email}
          							onChange = {this.onChange}
          							error = {errors.email}/>
          							<TextFieldGroup
          							placeholder = "Password"
          							name = "password"
          							type = "password"
          							value = {this.state.password}
          							onChange = {this.onChange}
          							error = {errors.password}/>
          							<TextFieldGroup
          							placeholder = "Confirm Password"
          							name = "password2"
          							type = "password"
          							value = {this.state.password2}
          							onChange = {this.onChange}
          							error = {errors.password2}/>
				            		<input 
				            		type="submit" 
				            		className="btn btn-info btn-block mt-4" />
				          		</form>
				        	</div>
				      	</div>
				    </div>
				</div>
			</div>
		);
	}
}

Register.propTypes = {
	registerUser: PropTypes.func.isRequired,
	auth: PropTypes.object.isRequired,
	errors: PropTypes.object.isRequired
}

const mapStateToProps = state => {
	return {
		auth: state.auth,
		errors: state.errors
	}
}

const mapDispatchToProps = dispatch => {
	return{
		registerUser: (newUser,history) => dispatch(actionTypes.registerUser(newUser,history))
	}
}

export default connect(mapStateToProps,mapDispatchToProps)(withRouter(Register));