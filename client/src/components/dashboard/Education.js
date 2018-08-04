import React, { Component } from 'react';
import {connect} from 'react-redux';
import PropTypes from 'prop-types';
import Moment from 'react-moment';
import {deleteEducation} from '../../actions/profileActions'

class Education extends Component {
	render() {
		const education= this.props.education.map(edu => (
				<tr key = {edu._id}>
					<td>{edu.school}</td>
					<td>{edu.degree}</td>
					<td><Moment format = "YYYY/MM/DD">{edu.from}</Moment> -
						{edu.to === null ? (' now') : (<Moment format = "YYYY/DD/MM">{deleteEducation.to}</Moment>)}
					</td>
					<td><button className="btn btn-danger" onClick = {this.props.onDelete.bind(edu._id)} >Delete</button></td>
				</tr>
			))
		return (
			<div>
				<h4 className = 'mb-4'>Education credentials</h4>
				<table className = 'table'>
					<thead>
						<tr>
						<th>School</th>
						<th>Degree</th>
						<th>Years</th>
						<th></th>
						</tr>
					</thead>
					<tbody>
						{education}
					</tbody>
				</table>
			</div>
		);
	}
}

Education.propTypes = {
	onDelete: PropTypes.func.isRequired
}

const mapDispatchToProps = dispatch => {
	return {
		onDelete: (edu_id) => dispatch(deleteEducation(edu_id))
	}
}

export default connect(null,mapDispatchToProps)(Education);