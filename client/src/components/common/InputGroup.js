import React from 'react';
import classnames from 'classnames';
import PropTypes from 'prop-types';
const InputGroup = (props) => {
	return(
		<div className="input-group mb-3">
			<div className="input-group-prepend">
				<span className="input-group-text">
					<i className = {props.icon}/>
				</span>
			</div>
	    	<textarea  
	    	className={classnames('form-control from-control -lg',{
	  				'is-invalid': props.error
	  			})} 
	    	placeholder={props.placeholder} 
	    	name={props.name}
	    	value = {props.value}
	    	onChange = {props.onChange} />
	    	{props.error && (<div className = 'invalid-feedback'>{props.error
				}</div>)}
	    </div>
	)
};

InputGroup.propTypes = {
	type: PropTypes.string.isRequired,
	name: PropTypes.string.isRequired,
	placeholder: PropTypes.string,
	value: PropTypes.string.isRequired,
	icon: PropTypes.string,
	error: PropTypes.string,
	onChange: PropTypes.func.isRequired,
}

InputGroup.defaultProps = {
	type: 'text'
}

export default InputGroup;