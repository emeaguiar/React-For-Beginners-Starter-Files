import React from 'react';

class StorePicker extends React.Component {
	render() {
		return (
			<form className="store-selector">
				{/* hello */}
				<h2>Please Enter a Store</h2>
				<input type="text" placeholder="Store Name" />
				<button type="submit">Visit Store</button>
			</form>
		);
	}
}

export default StorePicker;
