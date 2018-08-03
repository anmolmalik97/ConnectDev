import React from 'react';
import classnames from 'classnames';
import PropTypes from 'prop-types';
const TextAreaFieldGroup = (props) => {
	return(
		<div className="form-group">
	    	<textarea  
	    	className={classnames('form-control from-control -lg',{
	  				'is-invalid': props.error
	  			})} 
	    	placeholder={props.placeholder} 
	    	name={props.name}
	    	value = {props.value}
	    	onChange = {props.onChange} />
	    	{props.info && (<small className = 'form-text text-muted'>{props.info}</small>)}
	    	{props.error && (<div className = 'invalid-feedback'>{props.error
				}</div>)}
	    </div>
	)
};

TextAreaFieldGroup.propTypes = {
	name: PropTypes.string.isRequired,
	placeholder: PropTypes.string,
	value: PropTypes.string.isRequired,
	info: PropTypes.string,
	error: PropTypes.string,
	onChange: PropTypes.func.isRequired,
}

export default TextAreaFieldGroup;