import React from 'react';
import { getFunName } from '../helpers';

class StorePicker extends React.Component {
	goToStore = ( event ) => {
		event.preventDefault();
		console.log( 'URL changed' );
		// First grab the text from the box
		const storeId = this.storeInput.value;
		console.log(`Going to ${ storeId }`);
		// Transition  from / to /store/:storeId
		this.context.router.transitionTo( `/store/${ storeId }` );
	};
	
	render() {
		return (
			<form className="store-selector" onSubmit={ this.goToStore }>
				{/* hello */}
				<h2>Please Enter a Store</h2>
				<input type="text" placeholder="Store Name" defaultValue={ getFunName() } ref={ ( input ) => { this.storeInput = input } } />
				<button type="submit">Visit Store</button>
			</form>
		);
	}
}

StorePicker.contextTypes = {
	router: React.PropTypes.object
}

export default StorePicker;
