import React from 'react';
import _ from 'lodash';

class Svg extends React.Component {
	render() {
		let svgs = require.context('./svgs', false, /^\.\/.*\.svg$/);
		let image;

		_.map(svgs.keys(), (svg) => {
			let temp = _.trimStart(svg, './');
			temp = _.trimEnd(temp, '.svg');

			if (_.camelCase(temp) === this.props.svg) {
				image = require(`./svgs/${temp}.svg`);
			}
		});

		return (
			<object className={this.props.className} style={this.props.style} dangerouslySetInnerHTML={{__html: image}} />
		);
	}
}

Svg.propTypes = {
	className: React.PropTypes.string,
	style: React.PropTypes.object,
	svg: React.PropTypes.string
};

export default Svg;
