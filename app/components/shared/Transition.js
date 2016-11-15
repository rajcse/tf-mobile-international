import React from 'react';
import ReactCSSTransitionGroup from 'react-addons-css-transition-group';

const FirstChild = (props) => {
	let children = React.Children.toArray(props.children);

	return children[0] || null;
};

const Transition = (props) => {
	return (
		<ReactCSSTransitionGroup component={!props.component ? FirstChild : props.component} {...props} />
	);
};

Transition.propTypes = {
	component: React.PropTypes.node
};

export default Transition;
