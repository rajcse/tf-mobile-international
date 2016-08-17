import React, { Component, PropTypes } from 'react';
import classnames from 'classnames';
import _ from 'lodash';

class SimpleList extends Component {
	render() {
		let { label, values, classes } = this.props;

		return (
			<div className="simple-column row">
				<div className="label label-full">
					<h4>{label}</h4>
				</div>

				<div className="content content-full">
					<ul className={classnames('default', classes)}>
						{ values.map((content, i) => (
							<li key={i}>{_.truncate(content, {
								'length': 34,
								'separator': /,? +/
							})}</li>
						)) }
					</ul>
				</div>
			</div>
		);
	}
}

SimpleList.propTypes = {
	label: PropTypes.string.isRequired,
	values: PropTypes.array.isRequired,
	classes: PropTypes.string
};

export default SimpleList;
