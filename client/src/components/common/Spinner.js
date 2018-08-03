import React from 'react';
import spinner from './spinner.gif'
const Spinner = (props) => {
return(
	<div>
		<img 
		src = {spinner} 
		alt = 'loading...'
		style = {{width: '200px',margin: 'auto',display: 'block'}}></img>
	</div>
)
}
export default Spinner; 