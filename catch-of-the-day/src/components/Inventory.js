import React from 'react';
import AddFishForm from './AddFishForm';
import base from '../base';

class Inventory extends React.Component {
	constructor() {
		super();

		this.state = {
			uid: null,
			owner: null
		};
	}

	componentDidMount() {
		base.onAuth( ( user ) => {
			if ( user ) {
				this.authHandler( null, { user } );
			}
		} );
	}

	handleChange = ( event, key ) => {
		const fish = this.props.fishes[ key ];
		// take a copy of that fish and update with the new data
		const updatedFish = {
			...fish,
			[ event.target.name ]: event.target.value
		};

		this.props.updateFish( key, updatedFish );
	};

	authenticate = ( provider ) => {
		console.log( `Trying to authenticate with ${ provider }` );
		base.authWithOAuthPopup( provider, this.authHandler );
	};

	logout = () => {
		base.unauth();
		this.setState( { uid: null } );
	}

	authHandler = ( err, authData ) => {
		console.log(authData);
		if ( err ) {
			console.error( err );
			return;
		}

		// grab the store info
		const storeRef = base.database().ref( this.props.storeId );

		// query the firebase once for the store data
		storeRef.once( 'value', ( snapshot ) => {
			const data = snapshot.val() || {};

			// claim it as our own if there is no owner already.
			if ( ! data.owner ) {
				storeRef.set( {
					owner: authData.user.uid
				} );
			}

			this.setState( {
				uid: authData.user.uid,
				owner: data.owner || authData.user.uid
			} );
		} );
	};

	renderLogin = () => {
		return (
			<nav className="login">
				<h2>Inventory</h2>
				<p>Sign in to manage your store's inventory</p>
				<button className="github" onClick={ () => this.authenticate( 'github' ) }>Login with Github</button>
				<button className="twitter" onClick={ () => this.authenticate( 'twitter' ) }>Login with Twitter</button>
				<button className="facebook" onClick={ () => this.authenticate( 'facebook' ) }>Login with Facebook</button>
			</nav>
		)
	};

	renderInventory = ( key ) => {
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
	};

	render() {
		const logOut = <button onClick={ this.logout }>Log Out</button>;

		// check if they are not logged in at all
		if ( ! this.state.uid ) {
			return <div>{ this.renderLogin() }</div>
		}

		// Check if they are owner of the store
		if ( this.state.owner !== this.state.uid ) {
			return (
				<div>
					<p>Sorry you aren't the owner of this store!</p>
					{ logOut }
				</div>
			)
		}

		return (
			<div className="inventory">
				<h2>Inventory</h2>
				{ logOut }
				{ Object.keys( this.props.fishes ).map( this.renderInventory ) }
				<AddFishForm addFish={ this.props.addFish } />
				<button onClick={ this.props.loadSamples }>Load Sample Fishes</button>
			</div>
		)
	}

	static propTypes = {
		fishes: React.PropTypes.object.isRequired,
		updateFish: React.PropTypes.func.isRequired,
		removeFish: React.PropTypes.func.isRequired,
		addFish: React.PropTypes.func.isRequired,
		loadSamples: React.PropTypes.func.isRequired,
		storeId: React.PropTypes.string.isRequired
	}
}

export default Inventory;
