import React, { Component } from 'react';
import {connect} from 'react-redux';
import PropTypes from 'prop-types';
import Moment from 'react-moment';
import {deleteExperience} from '../../actions/profileActions'

class Experience extends Component {
	render() {
		const experience = this.props.experience.map(exp => (
				<tr key = {exp._id}>
					<td>{exp.company}</td>
					<td>{exp.title}</td>
					<td><Moment format = "YYYY/MM/DD">{exp.from}</Moment> -
						{exp.to === null ? (' now') : (<Moment format = "YYYY/DD/MM">{exp.to}</Moment>)}
					</td>
					<td><button className="btn btn-danger" onClick = {this.props.onDelete.bind(exp._id)} >Delete</button></td>
				</tr>
			))
		return (
			<div>
				<h4 className = 'mb-4'>Experience credentials</h4>
				<table className = 'table'>
					<thead>
						<tr>
						<th>Company</th>
						<th>Title</th>
						<th>Years</th>
						<th></th>
						</tr>
					</thead>
					<tbody>
						{experience}
					</tbody>
				</table>
			</div>
		);
	}
}

Experience.propTypes = {
	onDelete: PropTypes.func.isRequired
}

const mapDispatchToProps = dispatch => {
	return {
		onDelete: (exp_id) => dispatch(deleteExperience(exp_id))
	}
}

export default connect(null,mapDispatchToProps)(Experience);