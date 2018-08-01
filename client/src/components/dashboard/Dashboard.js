import React, { Component } from 'react';
import PropTypes from 'prop-types';
import {connect} from 'react-redux';
import {getCurrentProfile} from '../../actions/profileActions';
class Dashboard extends Component {
	componentDidMount() 
	{
		this.props.getProfile();
	}
	render() {
		return (
			<div>
				<h1>Dashboard</h1>
			</div>
		);
	}
}

const mapDispatchToProps = dispatch => {
	return{
		getProfile: () => dispatch(getCurrentProfile())
	}
}

export default connect(null,mapDispatchToProps)(Dashboard);
