import React, { Component } from 'react';
import PropTypes from 'prop-types';
import {connect} from 'react-redux';
import * as actions from '../../../actions/authActions';
import TextFieldGroup from '../../common/TextFieldGroup';

class Login extends Component {
	
	state = {
		email: '',
		password: '',
		errors: {}
	}
	
	onChange = (event) => {
		this.setState({[event.target.name]: event.target.value})
	}

	onSubmit = (event) => {
		event.preventDefault();
		const user = {
			email: this.state.email,
			password: this.state.password,
		}
		this.props.loginUser(user)
	}
	componentWillReceiveProps(nextProps) {
		if(nextProps.auth.isAuthenticated) {
			this.props.history.push('/dashboard')
		}
		if(nextProps.errors) {
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
			<div className="login">
    			<div className="container">
      				<div className="row">
        				<div className="col-md-8 m-auto">
     		 				<h1 className="display-4 text-center">Log In</h1>
          					<p className="lead text-center">Sign in to your ConnectDev account</p>
          					<form onSubmit = {this.onSubmit}>
          						<TextFieldGroup
          							placeholder = "email address"
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
					            <input type="submit" className="btn btn-info btn-block mt-4" />
          					</form>
        				</div>
      				</div>
    			</div>
  			</div>
		);
	}
}

Login.propTypes = {
	loginUser: PropTypes.func.isRequired,
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
	return {
		loginUser: (user) => dispatch(actions.loginUser(user))
	}
}

export default connect(mapStateToProps,mapDispatchToProps)(Login);