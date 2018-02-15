import React from 'react';

/**
 * Form to manually add fish to the menu
 */
class AddFishForm extends React.Component {
	/**
	 * Create a fish object with form data
	 * @param {*} event 
	 */
	createFish( event ) {
		event.preventDefault();

		const fish = {
			name: this.name.value,
			price: this.price.value,
			status: this.status.value,
			description: this.description.value,
			image: this.image.value
		};
		
		this.props.addFish( fish );
		this.fishForm.reset();
	}

	/**
	 * Render form
	 */
	render() {
		return (
			<form ref={ ( input ) => this.fishForm = input } className="fish-edit" onSubmit={ this.createFish.bind( this ) }>
				<input ref={ ( input ) => this.name = input } type="text" placeholder="Fish Name"/>
				<input ref={ ( input ) => this.price = input } type="text" placeholder="Fish Price"/>
				<select ref={ ( input ) => this.status = input }>
					<option value="available">Fresh!</option>
					<option value="unavailable">Sold Out!</option>
				</select>
				<textarea ref={ ( input ) => this.description = input } type="text" placeholder="Fish Desc"></textarea>
				<input ref={ ( input ) => this.image = input } type="text" placeholder="Fish Image"/>
				<button type="submit">+ Add Item</button>
			</form>
		)
	}

	static propTypes = {
		addFish: React.PropTypes.func.isRequired
	}
}

export default AddFishForm;
