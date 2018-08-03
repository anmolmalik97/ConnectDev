import React, { Component } from 'react';
import PropTypes from 'prop-types';
import {connect} from 'react-redux';
import {getCurrentProfile} from '../../actions/profileActions';
import Spinner from '../common/Spinner';
import {Link} from 'react-router-dom';
class Dashboard extends Component {
	componentDidMount() 
	{
		this.props.getProfile();
	}
	render() {
		const {user} = this.props.auth;
		const {profile,loading} = this.props.profile;

		let dashboardContent;

		if(profile === null || loading){
			dashboardContent = <Spinner/>
		}else{
			// check if login user has profile data
			if(Object.keys(profile).length > 0){
				dashboardContent = <h4>Todo Display profile</h4>
			}else{
				// user is logged in but has no profile
				dashboardContent = (<div>
					<p className="lead text-muted">
						Welcome {user.name}
					</p>
					<p>You have not yet setup a profile please Add some info</p>
					<Link to = '/create-profile' className = 'btn btn-lg btn-info'>
						create profile
					</Link>

				</div>)
			}
		}

		return (
			<div className = 'dashboard'>
				<div className="container">
					<div className="row">
						<div className="col-md-12">
							<h1 className="display-4">Dashboard</h1>
							{dashboardContent}
						</div>
					</div>
				</div>
			</div>
		);
	}
}

Dashboard.propTypes = {
	getProfile: PropTypes.func.isRequired,
	auth: PropTypes.object.isRequired,
	profile: PropTypes.object.isRequired
}

const mapStateToProps = state => {
	return {
		profile: state.profile,
		auth: state.auth
	}
}

const mapDispatchToProps = dispatch => {
	return{
		getProfile: () => dispatch(getCurrentProfile())
	}
}

export default connect(mapStateToProps,mapDispatchToProps)(Dashboard);
