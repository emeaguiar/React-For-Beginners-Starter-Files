import React from 'react';

import Header from './Header';
import Order from './Order';
import Inventory from './Inventory';
import Fish from './Fish';
import sampleFishes from '../sample-fishes';

import base from '../base';

class App extends React.Component {
	constructor() {
		super();

		// Initial State.
		this.state = {
			fishes: {},
			order: {}
		};
	}

	componentWillMount() {
		// This runs right before the app is rendered
		this.ref = base.syncState( `${ this.props.params.storeId }/fishes`, {
			context: this,
			state: 'fishes'
		} );

		// check if there's any order in localStorage
		const localStorageRef = localStorage.getItem( `order-${ this.props.params.storeId }` );

		if ( localStorageRef ) {
			// update our App component's order state.
			this.setState( {
				order: JSON.parse( localStorageRef )
			} );
		}
	}

	componentWillUnmount() {
		base.removeBinding( this.ref );
	}

	componentWillUpdate( nextProps, nextState ) {
		localStorage.setItem( `order-${ this.props.params.storeId}`, JSON.stringify( nextState.order ) );
	}

	addFish = ( fish ) => {
		// Update state
		const fishes = {...this.state.fishes};
		// Add in our new fish
		const timestamp = Date.now();
		fishes[ `fish-${ timestamp }` ] = fish;
		// Set state
		this.setState( { fishes } );
	};

	updateFish = ( key, updatedFish ) => {
		const fishes = { ...this.state.fishes };
		fishes[ key ] = updatedFish;
		this.setState( { fishes } );
	};

	removeFish = ( key ) => {
		const fishes = { ...this.state.fishes };
		// Doesn't work with firebase, needs a workaround.
		// delete fishes[ key ]

		fishes[ key ] = null;
		this.setState( { fishes } );
	};

	removeFromOrder = ( key ) => {
		const order = { ...this.state.order };
		delete order[ key ];
		this.setState( { order } );
	};

	loadSamples = () => {
		this.setState( {
			fishes: sampleFishes
		} );
	};

	addToOrder = ( key ) => {
		// Take a copy of our state
		const order = { ...this.state.order };
		// Update or add new number of fish ordered
		order[ key ] = order[ key ] + 1 || 1;
		// Update our state.
		this.setState( { order } );
	};

	render() {
		return (
			<div className="catch-of-the-day">
				<div className="menu">
					<Header tagline="Fresh Seafood Market" />
					<ul>
						{
							Object.keys( this.state.fishes )
							.map( key => <Fish key={ key } index={ key } details={ this.state.fishes[ key ] } addToOrder={ this.addToOrder } /> )
						}
					</ul>
				</div>
				<Order
					fishes={ this.state.fishes }
					order={ this.state.order }
					params={ this.props.params }
					removeFromOrder={ this.removeFromOrder }
				/>
				<Inventory
					addFish={ this.addFish }
					loadSamples={ this.loadSamples }
					fishes={ this.state.fishes }
					updateFish={ this.updateFish }
					removeFish={ this.removeFish }
					storeId={ this.props.params.storeId }
				/>
			</div>
		);
	}

	static propTypes = {
		params: React.PropTypes.object.isRequired
	}
}

export default App;