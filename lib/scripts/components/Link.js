/** 
* Custom implementation of react-router's Link component to allow for touch events
*/

import React, { PropTypes, Component } from 'react';
import _ from 'lodash';

function createLocationDescriptor(to, { query, hash, state }) {
	if (query || hash || state) {
		return { pathname: to, query, hash, state }
	}
	
	return to;
}

export default class Link extends Component {
	constructor(props) {
		super(props);
		
		this.handleClick = this.handleClick.bind(this);
	}
	
	handleClick(event) {		
		let allowTransition = true;
		
		if (event.defaultPrevented === true) {
			allowTransition = false;
		}
		
		// If target prop is set (e.g. to "_blank") let browser handle link.
		if (this.props.target) {
			if (!allowTransition) event.preventDefault();
			
			return;
		}
		
		event.preventDefault();
		
		if (allowTransition) {
			const { to, query, hash, state } = this.props;
			const location = createLocationDescriptor(to, { query, hash, state });
			
			this.context.router.push(location);
		}
	}
		
	render() {
		const { to, query, hash, state, activeClassName, activeStyle, onlyActiveOnIndex, ...props } = this.props;
		
		// Ignore if rendered outside the context of router, simplifies unit testing.
		const { router } = this.context;
		
		if (router) {
			const location = createLocationDescriptor(to, { query, hash, state });
			props.href = router.createHref(location);
			
			if (activeClassName || (activeStyle != null && !_.isEmpty(activeStyle))) {
				if (router.isActive(location, onlyActiveOnIndex)) {
					if (activeClassName) {
						if (props.className) {
							props.className += ` ${activeClassName}`;
						} else {
							props.className = activeClassName;
						}
					}
					
					if (activeStyle) props.style = { ...props.style, ...activeStyle };
				}
			}
		}
		
		return <a {...props} onTouchTap={this.handleClick} />;
	}
	
}

Link.contextTypes = {
	router: PropTypes.shape({
		push: PropTypes.func.isRequired,
		replace: PropTypes.func.isRequired,
		go: PropTypes.func.isRequired,
		goBack: PropTypes.func.isRequired,
		goForward: PropTypes.func.isRequired,
		setRouteLeaveHook: PropTypes.func.isRequired,
		isActive: PropTypes.func.isRequired
	})
};

Link.propTypes = {
	to: PropTypes.oneOfType([ PropTypes.string, PropTypes.object ]).isRequired,
	query: PropTypes.object,
	hash: PropTypes.string,
	state: PropTypes.object,
	activeStyle: PropTypes.object,
	activeClassName: PropTypes.string,
	onlyActiveOnIndex: PropTypes.bool.isRequired,
	target: PropTypes.string
};

Link.defaultProps = {
	onlyActiveOnIndex: false,
	style: {}
};