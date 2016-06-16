import config from '../config.js';
import constants from '../constants/pubRecConstants';
import React, { Component } from 'react';

const Loader = (props) => {
	return (
	  <svg className="loader" style={props.style} viewBox="0 0 24 30">
	    <rect x="0" y="0" width="4" height="10" fill="#fff">
	      <animateTransform attributeType="xml"
	        attributeName="transform" type="translate"
	        values="0 0; 0 20; 0 0"
	        begin="0" dur="0.6s" repeatCount="indefinite" />
	    </rect>
	    <rect x="6" y="0" width="4" height="10" fill="#fff">
	      <animateTransform attributeType="xml"
	        attributeName="transform" type="translate"
	        values="0 0; 0 20; 0 0"
	        begin="0.2s" dur="0.6s" repeatCount="indefinite" />
	    </rect>
	    <rect x="12" y="0" width="4" height="10" fill="#fff">
	      <animateTransform attributeType="xml"
	        attributeName="transform" type="translate"
	        values="0 0; 0 20; 0 0"
	        begin="0.4s" dur="0.6s" repeatCount="indefinite" />
	    </rect>
	  </svg>
	);
}

export default Loader;