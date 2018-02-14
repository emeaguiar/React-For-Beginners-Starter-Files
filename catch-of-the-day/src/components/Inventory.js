import React from 'react';
import AddFishForm from './AddFishForm';

class Inventory extends React.Component {
	constructor() {
		super();

		this.renderInventory = this.renderInventory.bind( this );
		this.handleChange = this.handleChange.bind( this );
	}

	handleChange( event, key ) {
		const fish = this.props.fishes[ key ];
		// take a copy of that fish and update with the new data
		const updatedFish = {
			...fish,
			[ event.target.name ]: event.target.value
		};

		this.props.updateFish( key, updatedFish );
	}

	renderInventory( key ) {
		const fish = this.props.fishes[ key ]
		return (
			<div className="fish-edit" key={ key }>
				<input value={ fish.name } type="text" name="name" placeholder="Fish name" onChange={ ( e ) => this.handleChange( e, key ) } />
				<input value={ fish.price } type="text" name="price" placeholder="Fish price"onChange={ ( e ) => this.handleChange( e, key ) } />
				<select value={ fish.status } name="status" onChange={ ( e ) => this.handleChange( e, key ) }>
					<option value="available">Fresh!</option>
					<option value="unavailable">Sold Out!</option>
				</select>
				<textarea value={ fish.desc } type="text" name="desc" placeholder="Fish desc" onChange={ ( e ) => this.handleChange( e, key ) }></textarea>
				<input value={ fish.image } type="text" name="image" placeholder="Fish image" onChange={ ( e ) => this.handleChange( e, key ) } />
				<button onClick={ () => this.props.removeFish( key ) }>Remove Fish</button>
			</div>
		)
	}

	render() {
		return (
			<div className="inventory">
				<h2>Inventory</h2>
				{ Object.keys( this.props.fishes ).map( this.renderInventory ) }
				<AddFishForm addFish={ this.props.addFish } />
				<button onClick={ this.props.loadSamples }>Load Sample Fishes</button>
			</div>
		)
	}
}

export default Inventory;
