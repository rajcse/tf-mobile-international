import config from '../config.js';
import React, { Component } from 'react';
import ReactCSSTransitionGroup from 'react-addons-css-transition-group';

const Transition = (props) => {
	return (
		<ReactCSSTransitionGroup component={!props.component ? FirstChild : props.component} {...props} />
	);
}


const FirstChild = (props) => {
    let children = React.Children.toArray(props.children);
	
    return children[0] || null;
}

export default Transition;