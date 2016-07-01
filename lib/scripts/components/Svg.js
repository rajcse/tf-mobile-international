import React, { Component } from 'react';

/**
 * Don't use es6 - this two lines get evaluated on COMPILE and `includeFolder` becomes undefined,
 * `svgs` becomes populated with camelCase keys for filenames, and string values as the file contents
 */
var includeFolder = require('include-folder'),
	svgs = includeFolder(__dirname + '/svg');

const Svg = (props) => {
	return (
		<object className={props.className} style={props.style} dangerouslySetInnerHTML={{__html: svgs[props.svg]}} />
	);
};

export default Svg;

