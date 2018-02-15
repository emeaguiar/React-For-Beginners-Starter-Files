import React from 'react';
import { formatPrice } from '../helpers';
import CSSTransitionGroup from 'react-addons-css-transition-group';

class Order extends React.Component {
	constructor() {
		super();

		this.renderOrder = this.renderOrder.bind( this );
	}

	renderOrder( key ) {
		const fish = this.props.fishes[ key ],
			  count = this.props.order[ key ],
			  removeButton = <button onClick={ () => this.props.removeFromOrder( key ) }>&times;</button>;

		if ( ! fish || 'unavailable' === fish.status ) {
			return <li key={ key }>Sorry, { fish ? fish.name : 'fish' } is no longer available { removeButton }</li>;
		}

		return (
			<li key={ key }>
				<span>{ count }lbs { fish.name } { removeButton }</span>
				<span className="price">{ formatPrice( count * fish.price ) }</span>
			</li>
		);
	}

	render() {
		const orderIds = Object.keys( this.props.order ),
			  total = orderIds.reduce( ( prevTotal, key ) => {
					const fish = this.props.fishes[ key ],
						  count = this.props.order[ key ],
						  isAvailable = fish && 'available' === fish.status;

					if ( isAvailable ) {
						return prevTotal + ( count * fish.price || 0 );
					}

					return prevTotal;
					
			  }, 0 );

		return (
			<div className="order-wrap">
				<h2>Your Order</h2>

				<CSSTransitionGroup
					className="order"
					component="ul"
					transitionName="order"
					transitionEnterTimeout={5000}
					transitionLeaveTimeout={5000}
				>
					{ orderIds.map( this.renderOrder ) }
					<li className="total">
						<strong>Total:</strong>
						{ formatPrice( total ) }
					</li>
				</CSSTransitionGroup>
			</div>
		)
	}
}

Order.propTypes = {
	fishes: React.PropTypes.object.isRequired,
	order: React.PropTypes.object.isRequired,
	removeFromOrder: React.PropTypes.func.isRequired
}

export default Order;
