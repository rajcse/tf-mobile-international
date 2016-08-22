import React, { Component } from 'react';
import config from 'config';
import _ from 'lodash';

class ReportHeader extends Component {
	render() {
		let {
			name,
			age,
			location,
			photo
		} = this.props;

		return (
			<div className="report-header">
				<div className="report-container">
					<div className="report-thumbnail">
					{ _.has(photo,'thumbnail_token') ?
						<img src={ config.API_ROOT + '/data/image/' + photo.thumbnail_token} />
						: <img src="//placehold.it/70x70" />
					}
					</div>
					<div className="report-brief">
						<h1>{name}</h1>
						<p>{ age ? <span>{age} -</span> : null } { location }</p>
					</div>
				</div>
			</div>
		);
	}
}

ReportHeader.propTypes = {
	name: React.PropTypes.string.isRequired,
	age: React.PropTypes.number,
	location: React.PropTypes.string,
	photo: React.PropTypes.object
};

export default ReportHeader;
